package com.waterdragon.wannaeat.domain.order.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.waterdragon.wannaeat.domain.order.domain.Order;

import jakarta.persistence.LockModeType;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT o FROM Order o WHERE o.orderId = :orderId")
	Optional<Order> findByOrderIdWithLock(Long orderId);

	// 비관적 락 없이 단순 조회하는 메소드
	Optional<Order> findByOrderId(Long orderId);
}
