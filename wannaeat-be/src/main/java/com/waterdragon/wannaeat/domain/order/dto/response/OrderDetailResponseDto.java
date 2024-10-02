package com.waterdragon.wannaeat.domain.order.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderDetailResponseDto {

	private Long orderId;

	private Long reservationId;

	private Long menuId;
	private String menuName;
	private String menuImage;

	private Long reservationParticipantId;
	private String reservationParticipantNickname;

	private int totalCnt;
	private int paidCnt;

}
