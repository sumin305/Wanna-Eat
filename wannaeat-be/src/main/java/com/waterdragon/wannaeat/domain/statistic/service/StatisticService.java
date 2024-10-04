package com.waterdragon.wannaeat.domain.statistic.service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.statistic.dto.response.MainStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.MenuStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.PeekStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.ReservationCountStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.RevenueStatisticResponseDto;

public interface StatisticService {

	MainStatisticResponseDto getStatisticsByMain(Restaurant restaurant);

	PeekStatisticResponseDto getStatisticsByPeek(Restaurant restaurant, int year, int month);

	RevenueStatisticResponseDto getStatisticsByRevenue(Restaurant restaurant, int year, int month);

	ReservationCountStatisticResponseDto getReservationCountStatistics(Restaurant restaurant, int year, int month);

	Map<Integer, Long> getMonthlyStatsByMonths(List<Reservation> reservations);

	Map<String, Long> getDayOfWeekStatsByMonths(List<Reservation> reservations);

	Map<String, Long> getHourlyStatsByMonths(Restaurant restaurant, List<Reservation> reservations);

	Map<String, Long> getRevenueByLastFiveDays(Restaurant restaurant);

	List<MenuStatisticResponseDto> getPopularMenusByLastThreeMonths(Restaurant restaurant);

	List<MenuStatisticResponseDto> getTop3PopularMenus(List<MenuStatisticResponseDto> menuStatistics);

	List<MenuStatisticResponseDto> getBottom3PopularMenus(List<MenuStatisticResponseDto> menuStatistics);

	List<Reservation> getReservationsByMonths(Restaurant restaurant, int month);

	double getTurnoverRate(Restaurant restaurant, List<Reservation> reservations);

	int getAverageUsageTime(List<Reservation> reservations);

	int getUniqueReservationDatesCount(List<Reservation> reservations);

	int getTotalReservationTableCount(List<Reservation> reservations);

	String getHalfHourSlot(LocalTime time);

	String convertDayOfWeekToKorean(DayOfWeek dayOfWeek);
}
