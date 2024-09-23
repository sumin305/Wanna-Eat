package com.waterdragon.wannaeat.domain.payment.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.waterdragon.wannaeat.domain.order.exception.error.OrderNotFoundException;
import com.waterdragon.wannaeat.domain.order.repository.OrderRepository;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentMenuRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;
import com.waterdragon.wannaeat.domain.payment.exception.error.MenuCountRequestMoreThanUnpaidException;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoPaymentServiceImpl implements KakaoPaymentService {

	@Value("${pay.secret-key}")
	private String SECRET_KEY;

	@Value("${redirectURL}")
	private String REDIRECT_URL;

	private final OrderRepository orderRepository;
	private final MenuRepository menuRepository;
	private final ReservationRepository reservationRepository;

	/**
	 * 카카오페이 최초 요청 및 결제창 연결 메소드
	 *
	 * @param kakaoPaymentRequestDto 카카오페이 메뉴 결제 요청 정보
	 * @return KakaoPaymentReadyResponseDto 결제 고유번호 및 redirect 주소
	 */
	@Override
	public KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentRequestDto kakaoPaymentRequestDto, String paymentId) {

		// 결제 금액 계산
		int totalPrice = 0;
		List<KakaoPaymentMenuRequestDto> menuItems = kakaoPaymentRequestDto.getKakaoPaymentMenuRequestDtos();

		for (KakaoPaymentMenuRequestDto menuItem : menuItems) {
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
		Reservation reservation = reservationRepository.findByReservationId(kakaoPaymentRequestDto.getReservationId())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 번호의 예약은 존재하지 않습니다. reservationId : " + kakaoPaymentRequestDto.getReservationId()));
		Restaurant restaurant = reservation.getRestaurant();

		Map<String, String> parameters = new HashMap<>();
		parameters.put("cid", "TC0ONETIME");                                    // 가맹점 코드(테스트용)
		parameters.put("partner_order_id", paymentId);                       // 주문번호 (paymentId)
		parameters.put("partner_user_id", "roommake");                          // 회원 아이디
		parameters.put("item_name", "머물래?(" + restaurant.getName() + " 예약)");        // 상품명
		parameters.put("quantity", "1");                                        // 상품 수량
		parameters.put("total_amount", String.valueOf(totalPrice));             // 상품 총액
		parameters.put("tax_free_amount", "0");                                 // 상품 비과세 금액
		parameters.put("approval_url",
			REDIRECT_URL + "/api/payments/completed/kakao?payment_id=" + paymentId); // 결제 성공 시 URL
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
	 * @return
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
