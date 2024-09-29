package com.waterdragon.wannaeat.domain.cart.dto.response;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartElementRegisterResponseDto {

	private String reservationParticipantNickname;
	private Map<Long, CartMenuRegisterResponseDto> menuInfo;
	private int participantTotalPrice;
}
