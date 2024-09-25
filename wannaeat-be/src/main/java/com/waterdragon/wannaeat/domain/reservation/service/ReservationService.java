package com.waterdragon.wannaeat.domain.reservation.service;

import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;

public interface ReservationService {

	UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto);
}
