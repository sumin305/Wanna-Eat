package com.waterdragon.wannaeat.domain.statistic.service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

public interface StatisticService {

	Map<Integer, Long> getMonthlyStatsByMonths(List<Reservation> reservations);

	Map<String, Long> getDayOfWeekStatsByMonths(List<Reservation> reservations);

	Map<String, Long> getHourlyStatsByMonths(List<Reservation> reservations);

	Map<String, Long> getRevenueByLastFiveDays(Restaurant restaurant);

	List<Reservation> getReservationsByMonths(Restaurant restaurant, int month);

	String getHalfHourSlot(LocalTime time);

	String convertDayOfWeekToKorean(DayOfWeek dayOfWeek);
}
