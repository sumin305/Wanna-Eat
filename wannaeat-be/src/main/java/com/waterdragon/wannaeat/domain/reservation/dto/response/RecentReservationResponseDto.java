package com.waterdragon.wannaeat.domain.reservation.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecentReservationResponseDto {

	private String status;

	private Long reservationId;

	private String restaurantName;

	private LocalDate reservationDate;

	private LocalTime reservationStartTime;

	private LocalTime reservationEndTime;

	private Integer memberCnt;

}
