package com.waterdragon.wannaeat.domain.payment.controller;

import java.security.InvalidParameterException;
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
import com.waterdragon.wannaeat.domain.order.repository.OrderRepository;
import com.waterdragon.wannaeat.domain.order.service.OrderService;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentOrderRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.SsafyPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.SsafyPaymentOrderRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.SsafyPaymentResponseDto;
import com.waterdragon.wannaeat.domain.payment.exception.error.InvalidPaymentException;
import com.waterdragon.wannaeat.domain.payment.service.KakaoPaymentService;
import com.waterdragon.wannaeat.domain.payment.service.SsafyPaymentService;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.service.ReservationService;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.config.CustomObjectMapper;
import com.waterdragon.wannaeat.global.redis.service.RedisService;
import com.waterdragon.wannaeat.global.response.ResponseDto;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PaymentController {

	private final OrderRepository orderRepository;
	private final AuthUtil authUtil;
	@Value("${spring.kakaopay-tid-expiration-millis}")
	private int kakaopayTidExpirationMillis;

	private final KakaoPaymentService kakaoPaymentService;
	private final SsafyPaymentService ssafyPaymentService;
	private final RedisService redisService;
	private final OrderService orderService;
	private final ReservationService reservationService;

	/**
	 * 음식비 결제준비 요청 API(카카오페이)
	 *
	 * @param kakaoPaymentOrderRequestDto 음식비 결제 요청 정보
	 * @return KakaoPaymentReadyResponseDto tid, redirect_uri(카카오페이측 제공)
	 */
	@Transactional
	@Operation(summary = "음식비 결제 요청 API(카카오페이)")
	@PostMapping("/public/payments/menus/kakao")
	public ResponseEntity<ResponseDto<KakaoPaymentReadyResponseDto>> kakaoPayReady(
		@Valid @RequestBody KakaoPaymentOrderRequestDto kakaoPaymentOrderRequestDto) {

		// 랜덤한 payment_id 생성
		String paymentId = UUID.randomUUID().toString();

		// 카카오페이 최초 요청 및 결제창 연결
		KakaoPaymentReadyResponseDto kakaoPaymentReadyResponseDto = kakaoPaymentService.kakaoPayReady(
			kakaoPaymentOrderRequestDto, paymentId);

		// 결제 요청 시 결제 고유번호 tid를 Redis에 저장 (key = paymentId, value = tid)
		redisService.setValues(paymentId, kakaoPaymentReadyResponseDto.getTid(),
			Duration.ofMillis(kakaopayTidExpirationMillis));
		// 향후 수량 update 위해서 결제 요청 메뉴들도 Redis에 저장 (key = "payment_menus_{paymentId}", value = KakaoPaymentRequestDto)
		redisService.setValues("payment_menus_" + paymentId, kakaoPaymentOrderRequestDto,
			Duration.ofMillis(kakaopayTidExpirationMillis));

		ResponseDto<KakaoPaymentReadyResponseDto> responseDto = ResponseDto.<KakaoPaymentReadyResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("결제 준비가 성공적으로 완료되었습니다.")
			.data(kakaoPaymentReadyResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 보증금 결제준비 요청 API(카카오페이)
	 *
	 * @param kakaoPaymentDepositRequestDto 보증금 결제 요청 정보
	 * @return KakaoPaymentReadyResponseDto tid, redirect_uri(카카오페이측 제공)
	 */
	@Transactional
	@Operation(summary = "보증금 결제 요청 API(카카오페이)")
	@PostMapping("/payments/deposit/kakao")
	public ResponseEntity<ResponseDto<KakaoPaymentReadyResponseDto>> kakaoPayReady(
		@Valid @RequestBody KakaoPaymentDepositRequestDto kakaoPaymentDepositRequestDto) {

		User user = authUtil.getAuthenticatedUser();
		kakaoPaymentDepositRequestDto.getReservationRegisterRequestDto().setUserId(user.getUserId());

		// 랜덤한 payment_id 생성
		String paymentId = UUID.randomUUID().toString();

		// 카카오페이 최초 요청 및 결제창 연결
		KakaoPaymentReadyResponseDto kakaoPaymentReadyResponseDto = kakaoPaymentService.kakaoPayReady(
			kakaoPaymentDepositRequestDto, paymentId);

		// 결제 요청 시 결제 고유번호 tid를 Redis에 저장 (key = paymentId, value = tid)
		redisService.setValues(paymentId, kakaoPaymentReadyResponseDto.getTid(),
			Duration.ofMillis(kakaopayTidExpirationMillis));
		// 향후 예약 등록 위해서 예약 정보를 Redis에 저장 (key = "payment_deposit_{paymentId}", value = kakaoPaymentDepositRequestDto)
		redisService.setValues("payment_deposit_" + paymentId, kakaoPaymentDepositRequestDto,
			Duration.ofMillis(kakaopayTidExpirationMillis));

		ResponseDto<KakaoPaymentReadyResponseDto> responseDto = ResponseDto.<KakaoPaymentReadyResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("결제 준비가 성공적으로 완료되었습니다.")
			.data(kakaoPaymentReadyResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 결제승인 요청 API(카카오페이)
	 *
	 * @param paymentId 결제 고유 id (우리 서버 측)
	 * @param pgToken pgToken
	 * @return
	 */
	@Transactional
	@GetMapping("/public/payments/completed/kakao")
	public ResponseEntity<ResponseDto<KakaoPaymentApproveResponseDto>> kakaoPayApprove(
		@RequestParam("payment_id") String paymentId,
		@RequestParam("pg_token") String pgToken,
		@RequestParam("type") String type) {

		if (!type.equals("menu") && !type.equals("deposit")) {
			throw new InvalidParameterException("결제 타입이 올바르지 않습니다.");
		}

		// LinkedHashMap을 KakaoPaymentRequestDto로 변환하기 위한 ObjectMapper 객체 생성
		ObjectMapper objectMapper = CustomObjectMapper.createObjectMapper();
		// 해당 paymentId에 대해서 Redis에 저장된 tid 가져오기
		String tid = (String)redisService.getValues(paymentId);

		if (type.equals("menu")) {
			// 해당 paymentId에 대해서 Redis에 저장된 KakaoPaymentRequestDto 가져오기 (역직렬화 과정에서 LinkedHashMap으로 반환됨)
			Object cachedObject = redisService.getValues("payment_menus_" + paymentId);

			// LinkedHashMap을 KakaoPaymentMenuRequestDto로 반환
			KakaoPaymentOrderRequestDto kakaoPaymentOrderRequestDto = objectMapper.convertValue(cachedObject,
				KakaoPaymentOrderRequestDto.class);

			// tid, KakaoPaymentRequestDto 유효성 확인
			if (tid == null || tid.equals("false") || kakaoPaymentOrderRequestDto == null) {
				throw new InvalidPaymentException("유효하지 않은 결제 id 또는 결제 요청 정보가 존재하지 않습니다.");
			}

			// 누구든 결제할 수 있기 때문에 reservationParticipantId는 확인할 필요 없음.
			kakaoPaymentService.menuPaymentValidCheck(kakaoPaymentOrderRequestDto);

			// 카카오 결제 요청하기
			KakaoPaymentApproveResponseDto kakaoPaymentApproveResponseDto = kakaoPaymentService.kakaoPayApprove(tid,
				pgToken, paymentId);

			// 결제 승인 완료 응답 반환
			ResponseDto<KakaoPaymentApproveResponseDto> responseDto = ResponseDto.<KakaoPaymentApproveResponseDto>builder()
				.status(HttpStatus.OK.value())
				.message("결제가 성공적으로 완료되었습니다.")
				.data(kakaoPaymentApproveResponseDto)
				.build();

			return new ResponseEntity<>(responseDto, HttpStatus.OK);
		}

		if (type.equals("deposit")) {
			// 해당 paymentId에 대해서 Redis에 저장된 kakaoPaymentDepositRequestDto 가져오기 (역직렬화 과정에서 LinkedHashMap으로 반환됨)
			Object cachedObject = redisService.getValues("payment_deposit_" + paymentId);

			KakaoPaymentDepositRequestDto kakaoPaymentDepositRequestDto = objectMapper.convertValue(cachedObject,
				KakaoPaymentDepositRequestDto.class);

			log.info("Retrieved KakaoPaymentDepositRequestDto from Redis: {}", kakaoPaymentDepositRequestDto);

			// tid, kakaoPaymentDepositRequestDto 유효성 확인
			if (tid == null || tid.equals("false") || kakaoPaymentDepositRequestDto == null) {
				System.out.println(tid);
				System.out.println(kakaoPaymentDepositRequestDto);
				throw new InvalidPaymentException("유효하지 않은 결제 id 또는 결제 요청 정보가 존재하지 않습니다.");
			}

			// 예약 등록
			ReservationDetailResponseDto reservationDetailResponseDto = reservationService.registerReservation(
				kakaoPaymentDepositRequestDto.getReservationRegisterRequestDto());

			// 카카오 결제 요청하기
			KakaoPaymentApproveResponseDto kakaoPaymentApproveResponseDto = kakaoPaymentService.kakaoPayApprove(tid,
				pgToken, paymentId);
			kakaoPaymentApproveResponseDto.setReservationInfo(reservationDetailResponseDto);

			ResponseDto<KakaoPaymentApproveResponseDto> responseDto = ResponseDto.<KakaoPaymentApproveResponseDto>builder()
				.status(HttpStatus.OK.value())
				.message("결제가 성공적으로 완료되었습니다.")
				.data(kakaoPaymentApproveResponseDto)
				.build();

			return new ResponseEntity<>(responseDto, HttpStatus.OK);
		}
		return null;

	}

	/**
	 * 카카오페이 결제 취소시 호출되는 API
	 *
	 * @return 결제 취소 메시지
	 */
	@Transactional
	@Operation(summary = "결제 취소시 호출되는 API")
	@GetMapping("/public/payments/cancel/kakao")
	public ResponseEntity<ResponseDto<Void>> kakaoPayCancel() {
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.EXPECTATION_FAILED.value())
			.message("결제가 취소되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.EXPECTATION_FAILED);
	}

	/**
	 * 카카오페이 결제 실패시 호출되는 API
	 *
	 * @return 결제 실패 메시지
	 */
	@Transactional
	@Operation(summary = "결제 실패시 호출되는 API")
	@GetMapping("/public/payments/fail/kakao")
	public ResponseEntity<ResponseDto<Void>> kakaoPayFail() {
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.EXPECTATION_FAILED.value())
			.message("결제에 실패했습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.EXPECTATION_FAILED);
	}

	/**
	 * 음식비 결제요청 API (싸피페이)
	 *
	 * @param ssafyPaymentOrderRequestDto 음식비 결제 요청 정보
	 * @return 싸피페이 결제완료 정보
	 */
	@Transactional
	@Operation(summary = "음식비 결제 API(싸피페이)")
	@PostMapping("/payments/menus/ssafy")
	public ResponseEntity<ResponseDto<SsafyPaymentResponseDto>> ssafyPay(
		@Valid @RequestBody SsafyPaymentOrderRequestDto ssafyPaymentOrderRequestDto) {

		SsafyPaymentResponseDto ssafyPaymentResponseDto = ssafyPaymentService.ssafyPay(ssafyPaymentOrderRequestDto);
		ResponseDto<SsafyPaymentResponseDto> responseDto = ResponseDto.<SsafyPaymentResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("결제가 성공적으로 완료되었습니다.")
			.data(ssafyPaymentResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 보증금 결제요청 API (싸피페이)
	 *
	 * @param ssafyPaymentDepositRequestDto 보증금 결제요청 정보
	 * @return 싸피페이 결제완료 정보
	 */
	@Transactional
	@Operation(summary = "보증금 결제 API(싸피페이)")
	@PostMapping("/payments/deposit/ssafy")
	public ResponseEntity<ResponseDto<SsafyPaymentResponseDto>> ssafyPay(
		@Valid @RequestBody SsafyPaymentDepositRequestDto ssafyPaymentDepositRequestDto) {

		User user = authUtil.getAuthenticatedUser();
		ssafyPaymentDepositRequestDto.getReservationRegisterRequestDto().setUserId(user.getUserId());

		SsafyPaymentResponseDto ssafyPaymentResponseDto = ssafyPaymentService.ssafyPay(ssafyPaymentDepositRequestDto);
		ResponseDto<SsafyPaymentResponseDto> responseDto = ResponseDto.<SsafyPaymentResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("결제가 성공적으로 완료되었습니다.")
			.data(ssafyPaymentResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
