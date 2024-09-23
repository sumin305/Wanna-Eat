package com.waterdragon.wannaeat.domain.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;

public interface ReservationParticipantRepository extends JpaRepository<ReservationParticipant, Long> {
}
