package com.waterdragon.wannaeat.domain.reservation.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;

	@Override
	public UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto) {

		log.info("예약 url : " + urlValidationRequestDto.getReservationUrl());
		Reservation reservation = reservationRepository.findByReservationUrl(
				urlValidationRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 예약은 만료되었거나, 퇴실 완료 처리 되었습니다. reservationUrl : " + urlValidationRequestDto.getReservationUrl()));

		return UrlValidationResponseDto.builder()
			.reservationId(reservation.getReservationId())
			.build();
	}
}
