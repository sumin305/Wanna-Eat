package com.waterdragon.wannaeat.domain.statistic.service;

import java.util.List;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

public interface StatisticService {

	List<Reservation> getReservationsByMonths(Restaurant restaurant, int month);

}
