package com.waterdragon.wannaeat.domain.order.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.order.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	Optional<Order> findByOrderId(Long orderId);
}
