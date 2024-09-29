package com.waterdragon.wannaeat.domain.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.User;

import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	Page<Reservation> findByUser(User user, Pageable pageable);

	int countByUserAndRestaurant(User user, Restaurant restaurant);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT r FROM Reservation r WHERE r.reservationId = :reservationId")
	Optional<Reservation> findByReservationIdWithLock(@Param("reservationId") Long reservationId);

	Optional<Reservation> findByReservationUrl(String url);

	@Query("SELECT r FROM Reservation r JOIN FETCH r.restaurant WHERE r.reservationUrl = :reservationUrl")
	Optional<Reservation> findByReservationUrlWithRestaurant(@Param("reservationUrl") String reservationUrl);

	@Query(
		"SELECT NEW com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto(DAY(r.reservationDate), COUNT(r)) "
			+
			"FROM Reservation r " +
			"WHERE r.restaurant = :restaurant " +
			"AND FUNCTION('YEAR', r.reservationDate) = :year " +
			"AND FUNCTION('MONTH', r.reservationDate) = :month " +
			"GROUP BY DAY(r.reservationDate)")
	List<ReservationCountResponseDto> countReservationsByDay(@Param("restaurant") Restaurant restaurant,
		@Param("year") int year,
		@Param("month") int month);
}
