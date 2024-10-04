package com.waterdragon.wannaeat.domain.statistic.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenuePerDayResponseDto {

	private Long revenue;

	private int reservationCnt;

}
