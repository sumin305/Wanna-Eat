package com.waterdragon.wannaeat.domain.statistic.dto.response;

import java.time.LocalDate;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationCountStatisticResponseDto {

	private Map<LocalDate, ReservationCountPerDayResponseDto> reservationCounts;

}
