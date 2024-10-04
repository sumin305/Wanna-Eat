package com.waterdragon.wannaeat.domain.statistic.controller;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterTimeSequenceException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.statistic.dto.response.MainStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.PeekStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.ReservationCountStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.RevenueStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.service.StatisticService;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.response.ResponseDto;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StatisticController {

	private final StatisticService statisticService;
	private final AuthUtil authUtil;

	/**
	 * 식당 메인 통계 조회 API
	 *
	 * @return 메인 통계 정보
	 */
	@Operation(summary = "식당 메인 통계 조회 API")
	@GetMapping("/restaurants/statistics")
	public ResponseEntity<ResponseDto<MainStatisticResponseDto>> getStatisticsByMain() {
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("접근 권한이 없습니다.");
		}

		Restaurant restaurant = user.getRestaurant();
		if (restaurant == null) {
			throw new RestaurantNotFoundException("등록된 식당이 없습니다.");
		}

		MainStatisticResponseDto mainStatisticResponseDto = statisticService.getStatisticsByMain(restaurant);
		ResponseDto<MainStatisticResponseDto> responseDto = ResponseDto.<MainStatisticResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("메인 통계 데이터.")
			.data(mainStatisticResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 월별 피크 통계를 조회하는 API
	 *
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 피크 통계
	 */
	@Operation(summary = "월별 피크 통계 조회 API")
	@GetMapping("/restaurants/statistics/peek")
	public ResponseEntity<ResponseDto<PeekStatisticResponseDto>> getStatisticsByPeek(@RequestParam("year") int year,
		@RequestParam("month") int month) {
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("접근 권한이 없습니다.");
		}

		Restaurant restaurant = user.getRestaurant();
		if (restaurant == null) {
			throw new RestaurantNotFoundException("등록된 식당이 없습니다.");
		}

		LocalDate currentDate = LocalDate.now();

		// 입력받은 year와 month를 LocalDate로 변환 (해당 월의 1일로 설정)
		LocalDate inputDate = LocalDate.of(year, month, 1);

		// 입력 날짜가 현재 연월보다 미래인지 확인
		if (inputDate.isAfter(currentDate.withDayOfMonth(1))) {
			throw new InvalidFilterTimeSequenceException("검색 연월은 현재보다 뒤일 수 없습니다.");
		}

		PeekStatisticResponseDto peekStatisticResponseDto = statisticService.getStatisticsByPeek(restaurant, year,
			month);
		ResponseDto<PeekStatisticResponseDto> responseDto = ResponseDto.<PeekStatisticResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("월별 피크 통계 데이터.")
			.data(peekStatisticResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 월별 매출 통계를 조회하는 API
	 *
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 매출 통계
	 */
	@Operation(summary = "월별 매출 통계 조회 API")
	@GetMapping("/restaurants/statistics/revenue")
	public ResponseEntity<ResponseDto<RevenueStatisticResponseDto>> getStatisticsByRevenue(
		@RequestParam("year") int year,
		@RequestParam("month") int month) {
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("접근 권한이 없습니다.");
		}

		Restaurant restaurant = user.getRestaurant();
		if (restaurant == null) {
			throw new RestaurantNotFoundException("등록된 식당이 없습니다.");
		}

		LocalDate currentDate = LocalDate.now();

		// 입력받은 year와 month를 LocalDate로 변환 (해당 월의 1일로 설정)
		LocalDate inputDate = LocalDate.of(year, month, 1);

		// 입력 날짜가 현재 연월보다 미래인지 확인
		if (inputDate.isAfter(currentDate.withDayOfMonth(1))) {
			throw new InvalidFilterTimeSequenceException("검색 연월은 현재보다 뒤일 수 없습니다.");
		}

		RevenueStatisticResponseDto revenueStatisticResponseDto = statisticService.getStatisticsByRevenue(restaurant,
			year, month);
		ResponseDto<RevenueStatisticResponseDto> responseDto = ResponseDto.<RevenueStatisticResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("월별 매출 통계 데이터.")
			.data(revenueStatisticResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 월별 예약 수 통계를 조회하는 API
	 *
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 예약 수 통계
	 */
	@Operation(summary = "월별 매출 통계 조회 API")
	@GetMapping("/restaurants/statistics/reservation-count")
	public ResponseEntity<ResponseDto<ReservationCountStatisticResponseDto>> getReservationCountStatistics(
		@RequestParam("year") int year,
		@RequestParam("month") int month) {
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("접근 권한이 없습니다.");
		}

		Restaurant restaurant = user.getRestaurant();
		if (restaurant == null) {
			throw new RestaurantNotFoundException("등록된 식당이 없습니다.");
		}

		LocalDate currentDate = LocalDate.now();

		// 입력받은 year와 month를 LocalDate로 변환 (해당 월의 1일로 설정)
		LocalDate inputDate = LocalDate.of(year, month, 1);

		// 입력 날짜가 현재 연월보다 미래인지 확인
		if (inputDate.isAfter(currentDate.withDayOfMonth(1))) {
			throw new InvalidFilterTimeSequenceException("검색 연월은 현재보다 뒤일 수 없습니다.");
		}

		ReservationCountStatisticResponseDto reservationCountStatisticResponseDto = statisticService.getReservationCountStatistics(
			restaurant, year, month);
		ResponseDto<ReservationCountStatisticResponseDto> responseDto = ResponseDto.<ReservationCountStatisticResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("월별 예약 수 통계 데이터.")
			.data(reservationCountStatisticResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
