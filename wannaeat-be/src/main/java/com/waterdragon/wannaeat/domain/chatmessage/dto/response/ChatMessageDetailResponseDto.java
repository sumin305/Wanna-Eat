package com.waterdragon.wannaeat.domain.chatmessage.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMessageDetailResponseDto {

	private Long reservationId;
	private Long senderReservationParticipantId;
	private String senderReservationParticipantNickname;
	private String content;
	private LocalDateTime registerTime;
}
