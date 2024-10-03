package com.waterdragon.wannaeat.domain.payment.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentMenuRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.PaymentMenuRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;
import com.waterdragon.wannaeat.domain.payment.exception.error.InvalidPriceException;
import com.waterdragon.wannaeat.domain.payment.exception.error.MenuCountRequestMoreThanUnpaidException;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoPaymentServiceImpl implements KakaoPaymentService {

	private final RestaurantRepository restaurantRepository;
	@Value("${pay.secret-key}")
	private String SECRET_KEY;

	@Value("${redirectURL}")
	private String REDIRECT_URL;

	private final OrderService orderService;
	private final OrderRepository orderRepository;
	private final MenuRepository menuRepository;
	private final ReservationRepository reservationRepository;

	/**
	 * 카카오페이 최초 요청 및 결제창 연결 메소드
	 *
	 * @param kakaoPaymentMenuRequestDto 카카오페이 메뉴 결제 요청 정보
	 * @return KakaoPaymentReadyResponseDto 결제 고유번호 및 redirect 주소
	 */
	@Override
	public KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentMenuRequestDto kakaoPaymentMenuRequestDto,
		String paymentId) {

		// 결제 금액 계산
		int totalPrice = 0;
		List<PaymentMenuRequestDto> menuItems = kakaoPaymentMenuRequestDto.getPaymentMenuRequestDtos();

		for (PaymentMenuRequestDto menuItem : menuItems) {
			// Order 존재여부 확인 (락 없이 조회)
			Order order = orderRepository.findByOrderId(menuItem.getOrderId())
				.orElseThrow(
					() -> new OrderNotFoundException("해당 번호의 주문이 존재하지 않습니다. orderId : " + menuItem.getOrderId()));

			// Menu 존재여부 확인
			Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuItem.getMenuId())
				.orElseThrow(() -> new MenuNotFoundException("해당 번호의 메뉴가 존재하지 않습니다. menuId : " + menuItem.getMenuId()));

			// 재고 확인 (totalCnt, paidCnt 비교)
			int stock = order.getTotalCnt() - order.getPaidCnt();
			if (menuItem.getMenuCount() > stock) {
				throw new MenuCountRequestMoreThanUnpaidException(
					"미결제 수량은 " + menuItem.getMenuCount() + "개 미만인 " + stock + "개입니다.");
			}

			totalPrice += menu.getPrice() * menuItem.getMenuCount();
			log.info("메뉴 아이디 : " + menu.getMenuId());
			log.info("메뉴 가격 : " + menu.getPrice());
			log.info("메뉴 결제 수량 : " + menuItem.getMenuCount());
		}

		log.info("totalPrice : " + totalPrice);

		// 카카오페이 결제 준비
		Reservation reservation = reservationRepository.findByReservationId(
				kakaoPaymentMenuRequestDto.getReservationId())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 번호의 예약은 존재하지 않습니다. reservationId : " + kakaoPaymentMenuRequestDto.getReservationId()));
		Restaurant restaurant = reservation.getRestaurant();

		Map<String, String> parameters = new HashMap<>();
		parameters.put("cid", "TC0ONETIME");                                    // 가맹점 코드(테스트용)
		parameters.put("partner_order_id", paymentId);                       // 주문번호 (paymentId)
		parameters.put("partner_user_id", "roommake");                          // 회원 아이디
		parameters.put("item_name", "머물래?(" + restaurant.getName() + " 결제)");        // 상품명
		parameters.put("quantity", "1");                                        // 상품 수량
		parameters.put("total_amount", String.valueOf(totalPrice));             // 상품 총액
		parameters.put("tax_free_amount", "0");                                 // 상품 비과세 금액
		parameters.put("approval_url",
			REDIRECT_URL + "/api/payments/completed/kakao?payment_id=" + paymentId
				+ "&type=menu"); // 결제 성공 시 URL
		parameters.put("cancel_url", REDIRECT_URL + "/api/payments/cancel/kakao");      // 결제 취소 시 URL
		parameters.put("fail_url", REDIRECT_URL + "/api/payments/fail/kakao");          // 결제 실패 시 URL

		// HttpEntity : HTTP 요청 또는 응답에 해당하는 Http Header와 Http Body를 포함하는 클래스
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

		// RestTemplate
		// Rest 방식 API를 호출할 수 있는 Spring 내장 클래스
		RestTemplate template = new RestTemplate();
		String url = "https://open-api.kakaopay.com/online/v1/payment/ready";
		ResponseEntity<KakaoPaymentReadyResponseDto> responseEntity = template.postForEntity(url, requestEntity,
			KakaoPaymentReadyResponseDto.class);

		return responseEntity.getBody();
	}

	/**
	 * 카카오페이 최초 요청 및 결제창 연결 메소드
	 *
	 * @param kakaoPaymentDepositRequestDto 카카오페이 보증금 결제 요청 정보
	 * @return KakaoPaymentReadyResponseDto 결제 고유번호 및 redirect 주소
	 */
	@Override
	public KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentDepositRequestDto kakaoPaymentDepositRequestDto,
		String paymentId) {

		// 결제 금액 유효성 검사

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(kakaoPaymentDepositRequestDto.getRestaurantId())
			.orElseThrow(
				() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다."));

		int totalPrice =
			restaurant.getDepositPerMember() * kakaoPaymentDepositRequestDto.getReservationRegisterRequestDto()
				.getMemberCnt();
		if (kakaoPaymentDepositRequestDto.getPrice() != totalPrice) {
			log.info(String.valueOf(totalPrice));
			log.info(kakaoPaymentDepositRequestDto.getPrice().toString());
			throw new InvalidPriceException("보증금이 서버 정보와 일치하지 않습니다.");
		}

		Map<String, String> parameters = new HashMap<>();
		parameters.put("cid", "TC0ONETIME");                                    // 가맹점 코드(테스트용)
		parameters.put("partner_order_id", paymentId);                       // 주문번호 (paymentId)
		parameters.put("partner_user_id", "roommake");                          // 회원 아이디
		parameters.put("item_name", "머물래?(" + restaurant.getName() + " 예약)");        // 상품명
		parameters.put("quantity", "1");                                        // 상품 수량
		parameters.put("total_amount", String.valueOf(totalPrice));             // 상품 총액
		parameters.put("tax_free_amount", "0");                                 // 상품 비과세 금액
		parameters.put("approval_url",
			REDIRECT_URL + "/api/payments/completed/kakao?payment_id=" + paymentId
				+ "&type=deposit"); // 결제 성공 시 URL
		parameters.put("cancel_url", REDIRECT_URL + "/api/payments/cancel/kakao");      // 결제 취소 시 URL
		parameters.put("fail_url", REDIRECT_URL + "/api/payments/fail/kakao");          // 결제 실패 시 URL

		// HttpEntity : HTTP 요청 또는 응답에 해당하는 Http Header와 Http Body를 포함하는 클래스
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

		// RestTemplate
		// Rest 방식 API를 호출할 수 있는 Spring 내장 클래스
		RestTemplate template = new RestTemplate();
		String url = "https://open-api.kakaopay.com/online/v1/payment/ready";
		ResponseEntity<KakaoPaymentReadyResponseDto> responseEntity = template.postForEntity(url, requestEntity,
			KakaoPaymentReadyResponseDto.class);

		return responseEntity.getBody();

	}

	/**
	 * 카카오페이 승인 요청 전 메뉴 유효성 검증 메소드
	 *
	 * @param kakaoPaymentMenuRequestDto 결제 메뉴 요청 정보
	 */
	@Override
	public void menuPaymentValidCheck(KakaoPaymentMenuRequestDto kakaoPaymentMenuRequestDto) {
		for (PaymentMenuRequestDto menuRequestDto : kakaoPaymentMenuRequestDto.getPaymentMenuRequestDtos()) {

			List<Long> orderIds = kakaoPaymentMenuRequestDto.getPaymentMenuRequestDtos().stream()
				.map(PaymentMenuRequestDto::getOrderId)
				.collect(Collectors.toList());

			// 여러 주문에 대해 PESSIMISTIC_WRITE 락을 동시에 걸기
			// 동시 직전에 들어온 트랜잭션이 해당 주문 id에 접근하고 있다면 여기서 Lock이 걸린다.
			// 직전 트랜잭션이 모두 수행되고 락이 풀리고, 밑에 내려가면 결제 수량 미스매칭이 나서 예외를 던지게 된다.
			List<Order> orders = orderRepository.findByOrderIdsWithLock(orderIds);

			for (Order order : orders) {
				int remainingCount = order.getTotalCnt() - order.getPaidCnt();
				if (remainingCount < menuRequestDto.getMenuCount()) {
					throw new MenuCountRequestMoreThanUnpaidException(
						order.getMenu().getName() + "의 남은 미결제 수량보다 결제 수량이 많습니다.");
				}

				// OrderPaidCntEditRequestDto 생성 및 주문 수량 업데이트
				OrderPaidCntEditRequestDto orderPaidCntEditRequestDto = OrderPaidCntEditRequestDto.builder()
					.orderId(order.getOrderId())
					.paidMenuCnt(menuRequestDto.getMenuCount())
					.build();
				orderService.editOrderPaidCnt(orderPaidCntEditRequestDto);
			}
		}
	}

	// 카카오페이 측에 요청 시 헤더부에 필요한 값
	public HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "SECRET_KEY " + SECRET_KEY);
		headers.set("Content-type", "application/json");

		return headers;
	}

	/**
	 * 카카오페이 결제 승인 메소드
	 *
	 * @param tid 카카오페이측 결제 고유번호
	 * @param pgToken pgToken
	 * @param paymentId 우리 서버측 결제 고유번호
	 * @return 결제 승인 정보
	 */
	@Override
	public KakaoPaymentApproveResponseDto kakaoPayApprove(String tid, String pgToken, String paymentId) {
		Map<String, String> parameters = new HashMap<>();
		parameters.put("cid", "TC0ONETIME");              // 가맹점 코드(테스트용)
		parameters.put("tid", tid);                       // 결제 고유번호
		parameters.put("partner_order_id", paymentId);    // 주문번호
		parameters.put("partner_user_id", "roommake");    // 회원 아이디
		parameters.put("pg_token", pgToken);              // 결제승인 요청을 인증하는 토큰

		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

		RestTemplate template = new RestTemplate();
		String url = "https://open-api.kakaopay.com/online/v1/payment/approve";

		return template.postForObject(url, requestEntity, KakaoPaymentApproveResponseDto.class);
	}

}
