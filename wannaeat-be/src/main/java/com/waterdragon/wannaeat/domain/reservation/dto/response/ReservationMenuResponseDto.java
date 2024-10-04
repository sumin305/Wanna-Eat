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
public class ReservationMenuResponseDto {
    private String menuName;            // 메뉴 이름
    private int notServedCnt;      // 서빙 전
    private int servedCnt;              // 서빙 후
    private List<Integer> orderIdList;  // 주문 ID 목록
}
