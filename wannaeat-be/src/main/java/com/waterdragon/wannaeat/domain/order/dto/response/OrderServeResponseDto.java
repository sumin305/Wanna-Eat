package com.waterdragon.wannaeat.domain.order.dto.response;

import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationMenuResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderServeResponseDto {
    private boolean allPaymentsCompleted;
    private List<ReservationMenuResponseDto> reservationMenuList;
}
