package com.waterdragon.wannaeat.domain.order.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;

import jakarta.persistence.LockModeType;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT o FROM Order o WHERE o.orderId = :orderId")
	Optional<Order> findByOrderIdWithLock(Long orderId);

	// 비관적 락 없이 단순 조회하는 메소드
	Optional<Order> findByOrderId(Long orderId);

	@Query("SELECT o FROM Order o WHERE o.reservation = :reservation AND o.totalCnt > o.paidCnt")
	List<Order> findIncompleteOrdersByReservation(@Param("reservation") Reservation reservation);

	@Query("SELECT o FROM Order o WHERE o.reservation = :reservation AND o.menu = :menu AND o.reservationParticipant = :reservationParticipant")
	Optional<Order> findByReservationAndMenuAndReservationParticipant(
		@Param("reservation") Reservation reservation,
		@Param("menu") Menu menu,
		@Param("reservationParticipant") ReservationParticipant reservationParticipant
	);

	List<Order> findAllByReservation(Reservation reservation);

	// 여러 주문에 대해 비관적 락(PESSIMISTIC_WRITE)을 걸기 위한 메소드
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT o FROM Order o WHERE o.orderId IN :orderIds")
	List<Order> findByOrderIdsWithLock(@Param("orderIds") List<Long> orderIds);
}
