package com.waterdragon.wannaeat.domain.reservation.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.User;

import io.lettuce.core.dynamic.annotation.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	Page<Reservation> findByUser(User user, Pageable pageable);

	int countByUserAndRestaurant(User user, Restaurant restaurant);

	Optional<Reservation> findByReservationId(Long id);

	Optional<Reservation> findByReservationUrl(String url);

	@Query("SELECT r FROM Reservation r JOIN FETCH r.restaurant WHERE r.reservationUrl = :reservationUrl")
	Optional<Reservation> findByReservationUrlWithRestaurant(@Param("reservationUrl") String reservationUrl);
}
