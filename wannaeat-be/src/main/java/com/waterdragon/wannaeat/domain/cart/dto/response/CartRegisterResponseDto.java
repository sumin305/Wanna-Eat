package com.waterdragon.wannaeat.domain.cart.dto.response;

import java.util.List;

import com.waterdragon.wannaeat.domain.socket.dto.response.SocketResponseDto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class CartRegisterResponseDto extends SocketResponseDto {

	private Long reservationId;
	private List<CartElementRegisterResponseDto> cartElements; // Key: reservationParticipantId(사람), Value: <menuId : cartMenu>
	private int cartTotalPrice;
}
