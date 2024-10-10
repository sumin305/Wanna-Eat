package com.waterdragon.wannaeat.domain.reservation.dto.response;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ManagerReservationSummaryResponseDto {

	private LocalDate reservationDate;

	List<ReservationSummaryResponseDto> reservations;

}
