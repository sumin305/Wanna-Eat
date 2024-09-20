package com.waterdragon.wannaeat.domain.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
