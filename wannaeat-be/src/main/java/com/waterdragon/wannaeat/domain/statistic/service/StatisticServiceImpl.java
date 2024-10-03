package com.waterdragon.wannaeat.domain.statistic.service;

import java.time.LocalDate;
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

}
