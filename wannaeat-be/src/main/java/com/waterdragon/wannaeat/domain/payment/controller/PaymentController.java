package com.waterdragon.wannaeat.domain.payment.controller;

import java.time.Duration;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;
import com.waterdragon.wannaeat.domain.order.service.OrderService;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentMenuRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;
import com.waterdragon.wannaeat.domain.payment.exception.error.InvalidPaymentException;
import com.waterdragon.wannaeat.domain.payment.service.KakaoPaymentService;
import com.waterdragon.wannaeat.global.redis.service.RedisService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

	@Value("${spring.kakaopay-tid-expiration-millis}")
	private int kakaopayTidExpirationMillis;

	private final KakaoPaymentService kakaoPaymentService;
	private final RedisService redisService;
	private final OrderService orderService;

	/**
	 * 음식비 결제준비 요청 API(카카오페이)
	 * TODO: paymentId에 대해서 tid,KakaoPaymentReadyResponseDto를 redis에 저장하지 말고 MySQL?
	 * 
	 * @param kakaoPaymentRequestDto 음식비 결제 요청 정보
	 * @return KakaoPaymentReadyResponseDto tid, redirect_uri(카카오페이측 제공)
	 */
	@Operation(summary = "음식비 결제준비 요청 API(카카오페이)")
	@PostMapping("/menus/ready/kakao")
	public ResponseEntity<ResponseDto<KakaoPaymentReadyResponseDto>> kakaoPayReady(
		@Valid @RequestBody KakaoPaymentRequestDto kakaoPaymentRequestDto) {

		// 랜덤한 payment_id 생성
		String paymentId = UUID.randomUUID().toString();

		// 카카오페이 최초 요청 및 결제창 연결
		KakaoPaymentReadyResponseDto kakaoPaymentReadyResponseDto = kakaoPaymentService.kakaoPayReady(kakaoPaymentRequestDto, paymentId);

		// 결제 요청 시 결제 고유번호 tid를 Redis에 저장 (key = paymentId, value = tid)
		redisService.setValues(paymentId, kakaoPaymentReadyResponseDto.getTid(), Duration.ofMillis(kakaopayTidExpirationMillis));
		// 향후 수량 update 위해서 결제 요청 메뉴들도 Redis에 저장 (key = "payment_menus_{paymentId}", value = KakaoPaymentRequestDto)
		redisService.setValues("payment_menus_" + paymentId, kakaoPaymentRequestDto, Duration.ofMillis(kakaopayTidExpirationMillis));

		ResponseDto<KakaoPaymentReadyResponseDto> responseDto = ResponseDto.<KakaoPaymentReadyResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("결제 준비가 성공적으로 완료되었습니다.")
			.data(kakaoPaymentReadyResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 음식비 결제승인 요청 API(카카오페이)
	 *
	 * @param paymentId 결제 고유 id (우리 서버 측)
	 * @param pgToken pgToken
	 * @return
	 */
	@Operation(summary = "음식비 결제승인 요청 API(카카오페이)")
	@GetMapping("/completed/kakao")
	public ResponseEntity<ResponseDto<KakaoPaymentApproveResponseDto>> kakaoPayApprove(
		@RequestParam("payment_id") String paymentId,
		@RequestParam("pg_token") String pgToken) {

		// LinkedHashMap을 KakaoPaymentRequestDto로 변환하기 위한 ObjectMapper 객체 생성
		ObjectMapper objectMapper = new ObjectMapper();
		
		// 해당 paymentId에 대해서 Redis에 저장된 tid 가져오기
		String tid = (String) redisService.getValues(paymentId);
		// 해당 paymentId에 대해서 Redis에 저장된 KakaoPaymentRequestDto 가져오기 (역직렬화 과정에서 LinkedHashMap으로 반환됨)
		Object cachedObject = redisService.getValues("payment_menus_" + paymentId);

		// LinkedHashMap을 KakaoPaymentRequestDto로 반환
		KakaoPaymentRequestDto kakaoPaymentRequestDto = objectMapper.convertValue(cachedObject, KakaoPaymentRequestDto.class);

		// tid, KakaoPaymentRequestDto 확인
		if (tid == null || tid.equals("false") || kakaoPaymentRequestDto == null) {
			throw new InvalidPaymentException("유효하지 않은 결제 id 또는 결제 요청 정보가 존재하지 않습니다.");
		}

		// 카카오 결제 요청하기
		KakaoPaymentApproveResponseDto kakaoPaymentApproveResponseDto = kakaoPaymentService.kakaoPayApprove(tid, pgToken, paymentId);

		// 누구든 결제할 수 있기 때문에 reservationParticipantId는 확인할 필요 없음. 결제가 완료됐다면 수량만 바꿔주자.
		for (KakaoPaymentMenuRequestDto menuRequestDto : kakaoPaymentRequestDto.getKakaoPaymentMenuRequestDtos()) {

			// OrderPaidCntEditRequestDto 생성
			OrderPaidCntEditRequestDto orderPaidCntEditRequestDto = OrderPaidCntEditRequestDto.builder()
				.orderId(menuRequestDto.getOrderId())
				.paidMenuCnt(menuRequestDto.getMenuCount())
				.build();
			
			// 각 orderId의 paidCnt 수정
			orderService.editOrderPaidCnt(orderPaidCntEditRequestDto);
		}

		// 결제 승인 완료 응답 반환
		ResponseDto<KakaoPaymentApproveResponseDto> responseDto = ResponseDto.<KakaoPaymentApproveResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("결제가 성공적으로 완료되었습니다.")
			.data(kakaoPaymentApproveResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 결제 취소시 호출되는 API
	 *
	 * @return 결제 취소 메시지
	 */
	@Operation(summary = "결제 취소시 호출되는 API")
	@GetMapping("/cancel/kakao")
	public ResponseEntity<ResponseDto<Void>> kakaoPayCancel() {
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.EXPECTATION_FAILED.value())
			.message("결제가 취소되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.EXPECTATION_FAILED);
	}

	/**
	 * 결제 실패시 호출되는 API
	 *
	 * @return 결제 실패 메시지
	 */
	@Operation(summary = "결제 실패시 호출되는 API")
	@GetMapping("/fail/kakao")
	public ResponseEntity<ResponseDto<Void>> kakaoPayFail() {
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.EXPECTATION_FAILED.value())
			.message("결제에 실패했습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.EXPECTATION_FAILED);
	}

}
