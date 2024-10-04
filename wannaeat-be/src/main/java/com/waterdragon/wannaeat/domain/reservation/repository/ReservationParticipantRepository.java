package com.waterdragon.wannaeat.domain.reservation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;

public interface ReservationParticipantRepository extends JpaRepository<ReservationParticipant, Long> {

	Optional<ReservationParticipant> findByReservationParticipantId(Long id);
}
