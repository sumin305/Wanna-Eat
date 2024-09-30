package com.waterdragon.wannaeat.domain.reservation.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.reservation.dto.request.QrGenerateRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationEditRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
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

	/**
	 * 로그인한 고객의 예약 내역을 받아오는 API
	 *
	 * @param pageable 페이징 정보
	 * @return 예약 리스트 정보
	 */
	@Operation(summary = "예약 정보 조회 API")
	@GetMapping("/users/reservations")
	public ResponseEntity<ResponseDto<Page<ReservationDetailResponseDto>>> getListReservation(Pageable pageable) {
		Page<ReservationDetailResponseDto> reservations = reservationService.getListReservation(pageable);

		ResponseDto<Page<ReservationDetailResponseDto>> responseDto = ResponseDto.<Page<ReservationDetailResponseDto>>builder()
			.status(HttpStatus.OK.value())
			.message("예약 리스트 조회 목록")
			.data(reservations)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 월별 예약 카운트 조회 API
	 *
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 예약 카운트 정보
	 */
	@Operation(summary = "월별 예약 카운트 조회 API")
	@GetMapping("/restaurants/{restaurantId}/reservation-counts")
	public ResponseEntity<ResponseDto<List<ReservationCountResponseDto>>> getListReservationCount(int year, int month) {
		List<ReservationCountResponseDto> reservationCounts = reservationService.getListReservationCount(year, month);

		ResponseDto<List<ReservationCountResponseDto>> responseDto = ResponseDto.<List<ReservationCountResponseDto>>builder()
			.status(HttpStatus.OK.value())
			.message("월별 예약 카운트 조회 목록")
			.data(reservationCounts)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 일별 예약 목록 조회 API
	 *
	 * @param date 검색 일자
	 * @return 해당 일자의 예약 목록 정보
	 */
	@Operation(summary = "일별 예약 조회 API")
	@GetMapping("/restaurants/{restaurantId}/reservation")
	public ResponseEntity<ResponseDto<List<ReservationDetailResponseDto>>> getListReservation(
		@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

		List<ReservationDetailResponseDto> reservationDetailResponseDtos = reservationService.getListReservationByDate(
			date);
		ResponseDto<List<ReservationDetailResponseDto>> responseDto = ResponseDto.<List<ReservationDetailResponseDto>>builder()
			.status(HttpStatus.OK.value())
			.message("일별 예약 조회 목록")
			.data(reservationDetailResponseDtos)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 예약 가능한 테이블 번호 목록 조회 API
	 *
	 * @param restaurantId 식당 아이디
	 * @param date 예약일
	 * @param startTime 이용 시작 시간
	 * @param endTime 이용 종료 시간
	 * @return 예약 가능한 테이블 번호 목록
	 */
	@Operation(summary = "예약 가능 테이블 목록 조회 API")
	@GetMapping("/public/restaurants/{restaurantId}/reservations/available-tables")
	public ResponseEntity<ResponseDto<List<Integer>>> getListNotReservedTableNumber(
		@PathVariable("restaurantId") Long restaurantId,
		@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
		@RequestParam("startTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
		@RequestParam("endTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime
	) {

		List<Integer> tableNumbers = reservationService.getListNotReservedTableNumber(restaurantId, date, startTime,
			endTime);
		ResponseDto<List<Integer>> responseDto = ResponseDto.<List<Integer>>builder()
			.status(HttpStatus.OK.value())
			.message("예약 가능 테이블 번호 목록")
			.data(tableNumbers)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	@Operation(summary = "예약 취소 API")
	@PatchMapping("/users/reservations")
	@Transactional
	public ResponseEntity<ResponseDto<Void>> editReservation(@Valid @RequestBody
	ReservationEditRequestDto reservationEditRequestDto) {

		reservationService.editReservation(reservationEditRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("예약이 취소되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	@Operation(summary = "비회원 매장 입장 QR 생성 API")
	@PostMapping("/public/restaurant/qr")
	public Object generateEnterQrcode(
		@Valid @RequestBody QrGenerateRequestDto qrGenerateRequestDto) {

		Object qr = reservationService.generateEnterQrcode(qrGenerateRequestDto);
		return ResponseEntity.ok()
			.contentType(MediaType.IMAGE_PNG)
			.body(qr);
	}

}
