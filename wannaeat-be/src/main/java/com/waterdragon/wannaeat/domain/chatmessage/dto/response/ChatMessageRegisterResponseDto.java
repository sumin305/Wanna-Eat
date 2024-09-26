package com.waterdragon.wannaeat.domain.chatmessage.dto.response;

import java.time.LocalDateTime;

import com.waterdragon.wannaeat.domain.socket.dto.response.SocketResponseDto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class ChatMessageRegisterResponseDto extends SocketResponseDto {

	private Long senderReservationParticipantId; // 보낸 사람 id
	private String senderReservationParticipantNickname; // 보낸 사람 닉네임
	private String content; // 내용
	private LocalDateTime registerTime; // 등록 시간
}
