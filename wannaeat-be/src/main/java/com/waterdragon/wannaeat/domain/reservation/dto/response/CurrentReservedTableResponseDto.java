package com.waterdragon.wannaeat.domain.reservation.dto.response;

import java.time.LocalTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CurrentReservedTableResponseDto {

	private Long reservationId;

	private int tableId;

	private LocalTime reservationStartTime;

	private LocalTime reservationEndTime;

}
