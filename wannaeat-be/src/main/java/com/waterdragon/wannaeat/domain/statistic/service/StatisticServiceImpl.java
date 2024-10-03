package com.waterdragon.wannaeat.domain.statistic.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

	private final ReservationRepository reservationRepository;
	private final MenuRepository menuRepository;

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
	 * 최근 5일간의 매출 내역을 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @return 5일간의 매출 내역 목록
	 */
	@Override
	public Map<String, Long> getRevenueByLastFiveDays(Restaurant restaurant) {
		LocalDate today = LocalDate.now();
		LocalDate endDate = today.minusDays(1); // 어제
		LocalDate startDate = today.minusDays(5); // 5일 전

		// 날짜 포맷 설정 (MM-dd)
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");

		// 최근 5일간의 Reservation을 가져옴
		List<Reservation> reservations = reservationRepository.findReservationsForRestaurantWithinDateRange(restaurant,
			startDate, endDate);

		// 날짜별로 매출을 0으로 초기화
		Map<String, Long> salesMap = new HashMap<>();
		for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
			salesMap.put(date.format(formatter), 0L); // MM-dd 형식으로 변환하여 저장
		}

		// 예약 정보를 바탕으로 매출 계산
		for (Reservation reservation : reservations) {
			String reservationDate = reservation.getReservationDate().format(formatter); // MM-dd 형식으로 변환

			// 예약에 연결된 Orders 처리
			long totalSalesForDay = reservation.getOrders().stream()
				.mapToLong(order -> {
					// 메뉴 정보 가져오기
					Menu menu = menuRepository.findById(order.getMenu().getMenuId()).orElseThrow();
					return (long)menu.getPrice() * order.getTotalCnt(); // 메뉴 가격 * 주문 수량
				})
				.sum();

			// 날짜별 매출을 Map에 추가
			salesMap.merge(reservationDate, totalSalesForDay, Long::sum);
		}

		// 날짜 순으로 정렬하여 반환
		return salesMap.entrySet().stream()
			.sorted(Map.Entry.comparingByKey()) // 날짜 순으로 정렬
			.collect(
				Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new)); // 순서 유지
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
