package com.waterdragon.wannaeat.domain.cart.dto.response;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartElementResponseDto {

	private String reservationParticipantNickname;
	private Map<Long, CartMenuResponseDto> menuInfo;
	private int participantTotalPrice;
}
