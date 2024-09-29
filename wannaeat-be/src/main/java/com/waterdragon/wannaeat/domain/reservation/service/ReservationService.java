package com.waterdragon.wannaeat.domain.reservation.service;

import java.util.List;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;

public interface ReservationService {

	UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto);

	void registerReservationTable(Reservation reservation, List<Integer> tableNumbers);

}
