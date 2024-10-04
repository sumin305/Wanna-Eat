package com.waterdragon.wannaeat.domain.chatmessage.domain;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Document(collection = "chatmessages")
public class ChatMessage {

	@Id
	private ObjectId id;

	private Long reservationId;
	private Long senderReservationParticipantId;
	private String senderReservationParticipantNickname;
	private String content;
	private LocalDateTime registerTime;
}