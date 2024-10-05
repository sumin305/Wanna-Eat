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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.reservation.dto.request.QrGenerateRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerReservationSummaryResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.RecentReservationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.service.ReservationService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReservationController {

	private final ReservationService reservationService;

	@Operation(summary = "예약 URL 유효성 검증 API")
	@PostMapping("/public/reservations/validation")
	public ResponseEntity<ResponseDto<UrlValidationResponseDto>> validateReservationUrl(
		@Valid @RequestBody UrlValidationRequestDto urlValidationRequestDto,
		HttpServletRequest request,
		HttpServletResponse response) {

		// 쿠키에서 예약 URL에 해당하는 참가자 ID 추출
		String participantIdFromCookie = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(urlValidationRequestDto.getReservationUrl())) {
					participantIdFromCookie = cookie.getValue();
					break;
				}
			}
		}

		UrlValidationResponseDto urlValidationResponseDto = reservationService.validateUrl(urlValidationRequestDto,
			participantIdFromCookie);
		ResponseDto<UrlValidationResponseDto> responseDto = ResponseDto.<UrlValidationResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("유효한 예약 URL입니다.")
			.data(urlValidationResponseDto)
			.build();

		if (participantIdFromCookie == null) {
			Cookie cookie = new Cookie(urlValidationRequestDto.getReservationUrl(),
				urlValidationResponseDto.getReservationParticipantId().toString());
			cookie.setMaxAge(7 * 24 * 60 * 60); // 유효기간 7일
			cookie.setPath("/"); // 쿠키 경로 설정
			response.addCookie(cookie);
		}

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
	public ResponseEntity<ResponseDto<ReservationDetailResponseDto>> registerReservation(
		@RequestParam(value = "token", required = false) String token,
		@Valid @RequestBody
		ReservationRegisterRequestDto reservationRegisterRequestDto) {

		reservationService.validateQr(token);

		reservationRegisterRequestDto.setUserId(null);
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
	 * 최우선 방문예정 식당을 리턴하는 API
	 *
	 * @return 최우선 방문 예정 식당
	 */
	@Operation(summary = "최우선 방문 예정 식당 조회 API")
	@GetMapping("/users/reservations/recent")
	public ResponseEntity<ResponseDto<RecentReservationResponseDto>> getRecentReservation() {
		RecentReservationResponseDto reservation = reservationService.getRecentReservation();

		ResponseDto<RecentReservationResponseDto> responseDto = ResponseDto.<RecentReservationResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("예약 리스트 조회 목록")
			.data(reservation)
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
	@GetMapping("/restaurants/reservation")
	public ResponseEntity<ResponseDto<ManagerReservationSummaryResponseDto>> getListReservation(
		@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, Pageable pageable) {

		ManagerReservationSummaryResponseDto managerReservationSummaryResponseDto = reservationService.getListReservationByRestaurantAndDate(
			date, pageable);
		ResponseDto<ManagerReservationSummaryResponseDto> responseDto = ResponseDto.<ManagerReservationSummaryResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("일별 예약 조회 목록")
			.data(managerReservationSummaryResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 회원용 예약 가능한 테이블 번호 목록 조회 API
	 *
	 * @param restaurantId 식당 아이디
	 * @param date 예약일
	 * @param startTime 이용 시작 시간
	 * @param endTime 이용 종료 시간
	 * @return 예약 가능한 테이블 번호 목록
	 */
	@Operation(summary = "회원 예약 가능 테이블 목록 조회 API")
	@GetMapping("/restaurants/{restaurantId}/reservations/available-tables")
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

	/**
	 * 비회원용 예약 가능한 테이블 번호 목록 조회 API
	 *
	 * @param restaurantId 식당 아이디
	 * @param date 예약일
	 * @param startTime 이용 시작 시간
	 * @param endTime 이용 종료 시간
	 * @return 예약 가능한 테이블 번호 목록
	 */
	@Operation(summary = "비회원 예약 가능 테이블 목록 조회 API")
	@GetMapping("/public/restaurants/{restaurantId}/reservations/available-tables")
	public ResponseEntity<ResponseDto<List<Integer>>> getListNotReservedTableNumber(
		@PathVariable("restaurantId") Long restaurantId,
		@RequestParam(value = "token", required = false) String token,
		@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
		@RequestParam("startTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
		@RequestParam("endTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime
	) {

		reservationService.validateQr(token);
		List<Integer> tableNumbers = reservationService.getListNotReservedTableNumber(restaurantId, date, startTime,
			endTime);
		ResponseDto<List<Integer>> responseDto = ResponseDto.<List<Integer>>builder()
			.status(HttpStatus.OK.value())
			.message("예약 가능 테이블 번호 목록")
			.data(tableNumbers)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 예약을 취소하는 API
	 *
	 * @param reservationId 예약 아이디
	 * @return
	 */
	@Operation(summary = "예약 취소 API")
	@DeleteMapping("/reservations/{reservationId}")
	@Transactional
	public ResponseEntity<ResponseDto<Void>> removeReservation(
		@PathVariable(value = "reservationId", required = false) Long reservationId) {

		reservationService.removeReservation(reservationId);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("예약이 취소되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 예약 후 퇴실하는 API
	 *
	 * @param urlValidationRequestDto 예약 Url 정보
	 * @return
	 */
	@Operation(summary = "예약 퇴실 API")
	@PatchMapping("/public/reservations")
	@Transactional
	public ResponseEntity<ResponseDto<Void>> editReservation(
		@Valid @RequestBody UrlValidationRequestDto urlValidationRequestDto) {

		reservationService.editReservation(urlValidationRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("퇴실이 완료되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 비회원용 매장 입장 QR 생성 API
	 *
	 * @param qrGenerateRequestDto
	 * @return
	 */
	@Operation(summary = "비회원 매장 입장 QR 생성 API")
	@PostMapping("/public/restaurant/qr")
	public Object generateEnterQrcode(
		@Valid @RequestBody QrGenerateRequestDto qrGenerateRequestDto) {

		Object qr = reservationService.generateEnterQrcode(qrGenerateRequestDto);
		return ResponseEntity.ok()
			.contentType(MediaType.IMAGE_PNG)
			.body(qr);
	}

	/**
	 * 고객용 예약 상세조회 API 구현
	 *
	 * @param reservationId 예약 아이디
	 * @return 예약 상세 조회 정보
	 */
	@Operation(summary = "고객용 예약 상세조회 API")
	@Transactional
	@GetMapping("/users/reservations/{reservationId}")
	public ResponseEntity<ResponseDto<ReservationDetailResponseDto>> getDetailReservationByUser(
		@PathVariable Long reservationId) {

		// 예약 상세 정보 조회
		ReservationDetailResponseDto reservationDetailResponseDto = reservationService.getDetailReservationByUser(
			reservationId);

		// 응답 객체 생성
		ResponseDto<ReservationDetailResponseDto> responseDto = ResponseDto.<ReservationDetailResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("예약 상세 정보가 성공적으로 조회되었습니다.")
			.data(reservationDetailResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 사업자용 예약 상세조회 API
	 *
	 * @param reservationId 예약 ID
	 * @return ResponseDto<ManagerReservationDetailResponseDto> 예약 상세 정보를 담은 응답 객체
	 */
	@Operation(summary = "사업자용 예약 상세조회 API")
	@GetMapping("/manager/reservation/{reservationId}")
	public ResponseEntity<ResponseDto<ManagerReservationDetailResponseDto>> getReservationListByManager(
		@PathVariable Long reservationId) {

		// 예약 상세 정보 조회
		ManagerReservationDetailResponseDto reservationDetail = reservationService.getReservationListByManager(
			reservationId);

		// 응답 객체 생성
		ResponseDto<ManagerReservationDetailResponseDto> responseDto = ResponseDto.<ManagerReservationDetailResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("예약 상세 정보가 성공적으로 조회되었습니다.")
			.data(reservationDetail)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
