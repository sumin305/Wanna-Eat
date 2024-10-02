package com.waterdragon.wannaeat.domain.order.dto.response;

import com.waterdragon.wannaeat.domain.socket.dto.response.SocketResponseDto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class OrderRegisterResponseDto extends SocketResponseDto {

	private String message;
}
