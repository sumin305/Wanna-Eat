package com.waterdragon.wannaeat.domain.reservation.dto.response;

import java.time.LocalTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationSummaryResponseDto {

	private Long reservationId;

	private String userName;

	private LocalTime reservationStartTime;

	private LocalTime reservationEndTime;

	private Integer memberCnt;

	private List<Integer> tableList;

}
