package com.waterdragon.wannaeat.domain.order.dto.response;

import java.util.List;

import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationMenuResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderServeResponseDto {
	private boolean allPaymentsCompleted;
	private List<ReservationMenuResponseDto> reservationMenuList;
}
