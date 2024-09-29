package com.waterdragon.wannaeat.domain.reservation.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;

public interface ReservationService {

	UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto);

	ReservationDetailResponseDto registerReservation(ReservationRegisterRequestDto reservationRegisterRequestDto);

	Page<ReservationDetailResponseDto> getListReservation(Pageable pageable);

	void registerReservationTable(Reservation reservation, List<Integer> tableNumbers);

	String generateRandomString();
}
