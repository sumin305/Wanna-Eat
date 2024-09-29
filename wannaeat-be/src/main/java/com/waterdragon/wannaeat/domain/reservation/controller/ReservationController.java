package com.waterdragon.wannaeat.domain.reservation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.service.ReservationService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReservationController {

	private final ReservationService reservationService;

	@Operation(summary = "예약 URL 유효성 검증 API")
	@PostMapping("/reservations/validation")
	public ResponseEntity<ResponseDto<UrlValidationResponseDto>> validateReservationUrl(@Valid @RequestBody
	UrlValidationRequestDto urlValidationRequestDto) {

		UrlValidationResponseDto urlValidationResponseDto = reservationService.validateUrl(urlValidationRequestDto);
		ResponseDto<UrlValidationResponseDto> responseDto = ResponseDto.<UrlValidationResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("유효한 예약 URL입니다.")
			.data(urlValidationResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 비회원 예약 API
	 *
	 * @param reservationRegisterRequestDto 예약 등록 정보
	 * @return 등록 예약 상세 정보
	 */
	@Operation(summary = "비회원 예약 API")
	@PostMapping("/public/restaurants/{restaurantId}/reservations")
	@Transactional
	public ResponseEntity<ResponseDto<ReservationDetailResponseDto>> registerReservation(@Valid @RequestBody
	ReservationRegisterRequestDto reservationRegisterRequestDto) {

		ReservationDetailResponseDto reservationDetailResponseDto = reservationService.registerReservation(
			reservationRegisterRequestDto);
		ResponseDto<ReservationDetailResponseDto> responseDto = ResponseDto.<ReservationDetailResponseDto>builder()
			.status(HttpStatus.CREATED.value())
			.message("예약이 완료되었습니다.")
			.data(reservationDetailResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}
}
