package com.waterdragon.wannaeat.domain.statistic.service;

import java.util.List;
import java.util.Map;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

public interface StatisticService {

	Map<Integer, Long> getMonthlyStatsByMonths(List<Reservation> reservations);

	List<Reservation> getReservationsByMonths(Restaurant restaurant, int month);

}
