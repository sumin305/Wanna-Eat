package com.waterdragon.wannaeat.domain.cart.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class CartDetailResponseDto {

	private Long reservationId;
	private List<CartElementResponseDto> cartElements; // Key: reservationParticipantId(사람), Value: <menuId : cartMenu>
	private int cartTotalPrice;
}
