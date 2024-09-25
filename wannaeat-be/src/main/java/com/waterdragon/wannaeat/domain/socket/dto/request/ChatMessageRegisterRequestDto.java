package com.waterdragon.wannaeat.domain.socket.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRegisterRequestDto {

	private String reservationUrl; // 공동 url에서 api 요청할 땐 무조건 url로 (토큰 역할)
	private Long senderReservationParticipantId;
	private String content;
}
