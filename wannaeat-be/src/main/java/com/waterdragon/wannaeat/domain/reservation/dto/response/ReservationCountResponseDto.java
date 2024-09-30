package com.waterdragon.wannaeat.domain.reservation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCountResponseDto {

	private int day;
	private long count;

}
