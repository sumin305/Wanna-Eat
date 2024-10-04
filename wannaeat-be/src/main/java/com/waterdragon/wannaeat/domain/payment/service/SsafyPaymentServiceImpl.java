package com.waterdragon.wannaeat.domain.payment.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotFoundException;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;
import com.waterdragon.wannaeat.domain.order.exception.error.OrderNotFoundException;
import com.waterdragon.wannaeat.domain.order.repository.OrderRepository;
import com.waterdragon.wannaeat.domain.order.service.OrderService;
import com.waterdragon.wannaeat.domain.payment.dto.request.PaymentMenuRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.SsafyPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.SsafyPaymentOrderRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.SsafyPaymentResponseDto;
import com.waterdragon.wannaeat.domain.payment.exception.error.InvalidPriceException;
import com.waterdragon.wannaeat.domain.payment.exception.error.MenuCountRequestMoreThanUnpaidException;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.auth.oauth2.service.EncryptService;
import com.waterdragon.wannaeat.global.exception.error.NotAuthenticatedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SsafyPaymentServiceImpl implements SsafyPaymentService {

	@Value("${ssafypay.api-key}")
	private String API_KEY;

	private final AuthUtil authUtil;
	private final MenuRepository menuRepository;
	private final RestaurantRepository restaurantRepository;
	private final ReservationRepository reservationRepository;

	private final OrderRepository orderRepository;
	private final OrderService orderService;
	private final EncryptService encryptService;

	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * 주문 싸피페이 메소드
	 *
	 * @param ssafyPaymentOrderRequestDto 주문 결제요청 정보
	 * @return SsafyPaymentResponseDto 결제 완료 정보
	 */
	@Override
	@Transactional
	public SsafyPaymentResponseDto ssafyPay(SsafyPaymentOrderRequestDto ssafyPaymentOrderRequestDto) {

		// 예약 url 검증
		Reservation reservation = reservationRepository.findByReservationUrl(
				ssafyPaymentOrderRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 url의 예약은 존재하지 않습니다. 예약 url : " + ssafyPaymentOrderRequestDto.getReservationUrl()));

		// 결제 비밀번호 검증
		User user = authUtil.getAuthenticatedUser();
		if (!encryptService.encryptData(ssafyPaymentOrderRequestDto.getUserPassword()).equals(
			user.getPaymentPassword())) {
			throw new NotAuthenticatedException("결제 비밀번호가 틀립니다.");
		}

		// 우선 결제 요청에 대한 모든 orderIds 추출
		List<Long> orderIds = ssafyPaymentOrderRequestDto.getPaymentMenuRequestDtos().stream()
			.map(PaymentMenuRequestDto::getOrderId)
			.collect(Collectors.toList());

		// 여러 주문에 대해 PESSIMISTIC_WRITE 락을 동시에 걸기
		// 동시 직전에 들어온 트랜잭션이 해당 주문 id에 접근하고 있다면 여기서 Lock이 걸린다.
		// 직전 트랜잭션이 모두 수행되고 락이 풀리고, 밑에 내려가면 결제 수량 미스매칭이 나서 예외를 던지게 된다.
		List<Order> orders = orderRepository.findByOrderIdsWithLock(orderIds);
		// 조회한 order들을 map에다가 저장해서 추후 빠르게 조회
		Map<Long, Order> orderMap = orders.stream().collect(Collectors.toMap(Order::getOrderId, order -> order));

		// 결제 금액 계산
		int totalPrice = 0;

		// 다시 결제 요청을 보면서 수량 차감
		for (PaymentMenuRequestDto menuRequestDto : ssafyPaymentOrderRequestDto.getPaymentMenuRequestDtos()) {
			Order order = orderMap.get(menuRequestDto.getOrderId());
			if (order == null) {
				throw new OrderNotFoundException("임시 Map에 해당 order가 존재하지 않습니다.");
			}

			// 메뉴 유효성 검증
			Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuRequestDto.getMenuId())
				.orElseThrow(
					() -> new MenuNotFoundException("해당 메뉴가 존재하지 않습니다. menuId : " + menuRequestDto.getMenuId()));

			// 결제 요청 수량 유효성 검증
			int remainingCount = order.getTotalCnt() - order.getPaidCnt();
			if (remainingCount < menuRequestDto.getMenuCount()) {
				throw new MenuCountRequestMoreThanUnpaidException(
					order.getMenu().getName() + "의 남은 미결제 수량보다 결제 요청 수량이 많습니다.");
			}

			// 결제 요청 수량만큼 paidCnt 수량 차감
			OrderPaidCntEditRequestDto orderPaidCntEditRequestDto = OrderPaidCntEditRequestDto.builder()
				.orderId(order.getOrderId())
				.paidMenuCnt(menuRequestDto.getMenuCount())
				.build();
			orderService.editOrderPaidCnt(orderPaidCntEditRequestDto);

			totalPrice += menuRequestDto.getMenuCount() * menu.getPrice();
		}

		// 오늘 날짜를 "yyyyMMdd" 형식으로 변환 (예: 20240408)
		String transmissionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		// 현재 시각을 "HHmmss" 형식으로 변환 (예: 135601)
		String transmissionTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
		// 20자리 난수
		String randomString = generateUUIDBasedNumber(20);

		// 요청할 API의 URL
		String url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/createCreditCardTransaction";

		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json"); // 요청의 Content-Type을 JSON으로 설정

		// 요청 본문 데이터 설정
		Map<String, Object> requestBody = new HashMap<>();
		Map<String, String> header = new HashMap<>();
		header.put("apiName", "createCreditCardTransaction");
		header.put("transmissionDate", transmissionDate);
		header.put("transmissionTime", transmissionTime);
		header.put("institutionCode", "00100");
		header.put("fintechAppNo", "001");
		header.put("apiServiceCode", "createCreditCardTransaction");
		header.put("institutionTransactionUniqueNo", randomString);
		header.put("apiKey", API_KEY);
		header.put("userKey", ssafyPaymentOrderRequestDto.getUserKey());

		requestBody.put("Header", header);
		requestBody.put("cardNo", ssafyPaymentOrderRequestDto.getCardNo());
		requestBody.put("cvc", ssafyPaymentOrderRequestDto.getCvc());
		requestBody.put("merchantId", ssafyPaymentOrderRequestDto.getMerchantId());
		requestBody.put("paymentBalance", String.valueOf(totalPrice));

		// HttpEntity에 헤더와 본문 데이터 설정
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

		// POST 요청 보내기
		ResponseEntity<SsafyPaymentResponseDto> response = restTemplate.exchange(
			url,
			HttpMethod.POST,
			requestEntity,
			SsafyPaymentResponseDto.class
		);

		// 응답 결과 반환
		return response.getBody();
	}

	/**
	 * 보증금 싸피페이 메소드
	 *
	 * @param ssafyPaymentDepositRequestDto 보증금 결제요청 정보
	 * @return SsafyPaymentResponseDto 결제 완료 정보
	 */
	@Override
	public SsafyPaymentResponseDto ssafyPay(SsafyPaymentDepositRequestDto ssafyPaymentDepositRequestDto) {

		// 결제 비밀번호 검증
		User user = authUtil.getAuthenticatedUser();
		if (!encryptService.encryptData(ssafyPaymentDepositRequestDto.getUserPassword()).equals(
			user.getPaymentPassword())) {
			throw new NotAuthenticatedException("결제 비밀번호가 틀립니다.");
		}

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(ssafyPaymentDepositRequestDto.getRestaurantId())
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다."));

		// 금액 계산
		int totalPrice =
			restaurant.getDepositPerMember() * ssafyPaymentDepositRequestDto.getReservationRegisterRequestDto()
				.getMemberCnt();
		if (ssafyPaymentDepositRequestDto.getPrice() != totalPrice) {
			log.info(String.valueOf(totalPrice));
			log.info(ssafyPaymentDepositRequestDto.getPrice().toString());
			throw new InvalidPriceException("보증금이 서버 정보와 일치하지 않습니다.");
		}

		// 오늘 날짜를 "yyyyMMdd" 형식으로 변환 (예: 20240408)
		String transmissionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		// 현재 시각을 "HHmmss" 형식으로 변환 (예: 135601)
		String transmissionTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
		// 20자리 난수
		String randomString = generateUUIDBasedNumber(20);

		// 요청할 API의 URL
		String url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/createCreditCardTransaction";

		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json"); // 요청의 Content-Type을 JSON으로 설정

		// 요청 본문 데이터 설정
		Map<String, Object> requestBody = new HashMap<>();
		Map<String, String> header = new HashMap<>();
		header.put("apiName", "createCreditCardTransaction");
		header.put("transmissionDate", transmissionDate);
		header.put("transmissionTime", transmissionTime);
		header.put("institutionCode", "00100");
		header.put("fintechAppNo", "001");
		header.put("apiServiceCode", "createCreditCardTransaction");
		header.put("institutionTransactionUniqueNo", randomString);
		header.put("apiKey", API_KEY);
		header.put("userKey", ssafyPaymentDepositRequestDto.getUserKey());

		requestBody.put("Header", header);
		requestBody.put("cardNo", ssafyPaymentDepositRequestDto.getCardNo());
		requestBody.put("cvc", ssafyPaymentDepositRequestDto.getCvc());
		requestBody.put("merchantId", ssafyPaymentDepositRequestDto.getMerchantId());
		requestBody.put("paymentBalance", String.valueOf(totalPrice));

		// HttpEntity에 헤더와 본문 데이터 설정
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

		// POST 요청 보내기
		ResponseEntity<SsafyPaymentResponseDto> response = restTemplate.exchange(
			url,
			HttpMethod.POST,
			requestEntity,
			SsafyPaymentResponseDto.class
		);

		// 응답 결과 반환
		return response.getBody();
	}

	// 20자리 난수 생성 메소드
	public String generateUUIDBasedNumber(int length) {
		// UUID 생성
		UUID uuid = UUID.randomUUID();

		// UUID의 숫자 부분을 추출하고 숫자만 남긴다.
		String numericUUID = uuid.toString().replaceAll("[^0-9]", "");

		// 만약 UUID에서 나온 숫자가 부족하면 UUID를 다시 생성해서 합칠 수 있습니다.
		while (numericUUID.length() < length) {
			uuid = UUID.randomUUID();
			numericUUID += uuid.toString().replaceAll("[^0-9]", "");
		}

		// 20자리로 자르기
		return numericUUID.substring(0, length);
	}
}
