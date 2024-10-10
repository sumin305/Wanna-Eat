package com.waterdragon.wannaeat.domain.reservation.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ManagerMainDataResponseDto {

	private List<CurrentReservedTableResponseDto> currentReservedTables;

	private int totalReservationCount;

	private int pastReservationCount;

}
