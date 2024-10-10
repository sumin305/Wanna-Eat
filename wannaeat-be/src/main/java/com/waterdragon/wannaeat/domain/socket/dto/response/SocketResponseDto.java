package com.waterdragon.wannaeat.domain.socket.dto.response;

import com.waterdragon.wannaeat.domain.socket.domain.enums.SocketType;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class SocketResponseDto {

	private SocketType socketType;
}
