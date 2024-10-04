package com.waterdragon.wannaeat.domain.reservation.repository;

import java.time.LocalDate;
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

	Page<Reservation> findByRestaurantAndReservationDateAndCancelledIsFalse(Restaurant restaurant,
		LocalDate reservationDate, Pageable pageable);

	Optional<Reservation> findByReservationId(Long reservationId);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT r FROM Reservation r WHERE r.reservationId = :reservationId")
	Optional<Reservation> findByReservationIdWithLock(@Param("reservationId") Long reservationId);

	Optional<Reservation> findByReservationUrl(String url);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT r FROM Reservation r WHERE r.reservationUrl = :reservationUrl")
	Optional<Reservation> findByReservationUrlWithLock(@Param("reservationUrl") String reservationUrl);

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

	@Query("SELECT r FROM Reservation r WHERE r.restaurant = :restaurant AND r.reservationDate = :reservationDate")
	List<Reservation> findByRestaurantAndReservationDate(@Param("restaurant") Restaurant restaurant,
		@Param("reservationDate") LocalDate reservationDate);

	@Query("SELECT r FROM Reservation r WHERE r.restaurant = :restaurant " +
		"AND r.cancelled = false " +
		"AND r.reservationDate BETWEEN :startDate AND :endDate")
	List<Reservation> findReservationsForRestaurantWithinDateRange(@Param("restaurant") Restaurant restaurant,
		@Param("startDate") LocalDate startDate,
		@Param("endDate") LocalDate endDate);

	@Query("SELECT r FROM Reservation r WHERE r.restaurant = :restaurant " +
		"AND r.cancelled = false " +
		"AND FUNCTION('YEAR', r.reservationDate) = :year " +
		"AND FUNCTION('MONTH', r.reservationDate) = :month")
	List<Reservation> findNotCancelledReservationsByRestaurantAndYearAndMonth(
		@Param("restaurant") Restaurant restaurant,
		@Param("year") int year,
		@Param("month") int month);

	@Query("SELECT r FROM Reservation r WHERE r.restaurant = :restaurant " +
		"AND FUNCTION('YEAR', r.reservationDate) = :year " +
		"AND FUNCTION('MONTH', r.reservationDate) = :month")
	List<Reservation> findReservationsByRestaurantAndYearAndMonth(@Param("restaurant") Restaurant restaurant,
		@Param("year") int year,
		@Param("month") int month);
}
