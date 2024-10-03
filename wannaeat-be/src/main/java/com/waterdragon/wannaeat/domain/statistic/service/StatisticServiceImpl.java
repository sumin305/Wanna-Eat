package com.waterdragon.wannaeat.domain.statistic.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

	private final ReservationRepository reservationRepository;

	/**
	 * n개월치 예약 데이터를 받아 피크 월을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 피크타임 순으로 정렬된 요일 목록
	 */
	@Override
	public Map<Integer, Long> getMonthlyStatsByMonths(List<Reservation> reservations) {
		return reservations.stream()
			.collect(Collectors.groupingBy(
				reservation -> reservation.getReservationDate().getMonthValue(), // 월을 숫자(1~12)로 그룹화
				Collectors.counting() // 각 월별 예약 수 카운트
			))
			.entrySet().stream()
			.sorted(Map.Entry.<Integer, Long>comparingByValue().reversed()) // 예약 수에 따라 정렬
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1,
				LinkedHashMap::new)); // 결과를 LinkedHashMap에 담아서 순서를 유지
	}

	/**
	 * n개월치 예약 데이터를 받아 피크 요일을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 피크타임 순으로 정렬된 요일 목록
	 */
	@Override
	public Map<String, Long> getDayOfWeekStatsByMonths(List<Reservation> reservations) {
		return reservations.stream()
			.collect(Collectors.groupingBy(
				reservation -> convertDayOfWeekToKorean(reservation.getReservationDate().getDayOfWeek()), // 요일을 한글로 변환
				Collectors.counting() // 각 요일별 예약 수 카운트
			))
			.entrySet().stream()
			.sorted(Map.Entry.<String, Long>comparingByValue().reversed()) // 예약 수에 따라 정렬
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1,
				LinkedHashMap::new)); // 결과를 LinkedHashMap에 담아서 순서를 유지
	}

	/**
	 * n개월치 예약 데이터를 받아 30분 단위의 시간대별 피크타임을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 피크타임 순으로 정렬된 시간 목록
	 */
	@Override
	public Map<String, Long> getHourlyStatsByMonths(List<Reservation> reservations) {
		return reservations.stream()
			.collect(Collectors.groupingBy(
				reservation -> getHalfHourSlot(reservation.getStartTime()), // 30분 단위로 그룹화
				Collectors.counting() // 각 시간대별 예약 수 카운트
			))
			.entrySet().stream()
			.sorted(Map.Entry.<String, Long>comparingByValue().reversed()) // 예약 수에 따라 정렬
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1,
				LinkedHashMap::new)); // 결과를 LinkedHashMap에 담아서 순서를 유지
	}

	/**
	 * 최근 n개월 치의 예약 데이터를 가져오는 메소드
	 *
	 * @param restaurant 정보를 가져올 식당
	 * @param month 받아올 개월 수
	 * @return 예약 목록
	 */
	@Override
	public List<Reservation> getReservationsByMonths(Restaurant restaurant, int month) {
		LocalDate endDate = LocalDate.now().withDayOfMonth(1).minusDays(1);  // 이번 달 제외한 저번 달의 마지막 날
		LocalDate startDate = endDate.minusMonths(month).withDayOfMonth(1);     // 12개월 전 1일

		return reservationRepository.findReservationsForRestaurantWithinDateRange(restaurant, startDate, endDate);
	}

	/**
	 * 시간을 30분 단위의 문자열로 변환하는 메소드
	 *
	 * @param time 변환할 시간
	 * @return 변환된 시간 정보
	 */
	@Override
	public String getHalfHourSlot(LocalTime time) {
		LocalTime halfHourSlot = time.truncatedTo(ChronoUnit.HOURS) // 시간을 먼저 00분으로 맞춘 후
			.plusMinutes(time.getMinute() >= 30 ? 30 : 0); // 30분 기준으로 그룹화
		return halfHourSlot.toString(); // 결과를 "HH:mm" 형식으로 반환
	}

	/**
	 * 요일을 한국어 약어로 변환하는 메소드
	 *
	 * @param dayOfWeek 요일 정보 (DayOfWeek)
	 * @return 한국어 약어 형식의 요일
	 */
	@Override
	public String convertDayOfWeekToKorean(DayOfWeek dayOfWeek) {
		return switch (dayOfWeek) {
			case MONDAY -> "월";
			case TUESDAY -> "화";
			case WEDNESDAY -> "수";
			case THURSDAY -> "목";
			case FRIDAY -> "금";
			case SATURDAY -> "토";
			case SUNDAY -> "일";
		};
	}
}
