package com.waterdragon.wannaeat.domain.chatmessage.dto.response;

import java.time.LocalDateTime;

import com.waterdragon.wannaeat.domain.socket.dto.response.SocketResponseDto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class ChatMessageRegisterResponseDto extends SocketResponseDto {

	private Long reservationId;
	private Long senderReservationParticipantId;
	private String senderReservationParticipantNickname;
	private String content;
	private LocalDateTime registerTime;
}
