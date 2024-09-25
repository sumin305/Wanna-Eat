package com.waterdragon.wannaeat.domain.reservation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.User;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	int countByUserAndRestaurant(User user, Restaurant restaurant);

	Optional<Reservation> findByReservationId(Long id);

	Optional<Reservation> findByReservationUrl(String url);
}
