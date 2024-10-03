package com.waterdragon.wannaeat.domain.reservation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerReservationDetailResponseDto {
    private String reservationDate;
    private String reservationStartTime;
    private String reservationEndTime;
    private int memberCnt;
    private String memberName;
    private boolean allPaymentsCompleted;
    List<Integer> tableList;
    private List<ReservationMenuResponseDto> reservationMenuList;
}
