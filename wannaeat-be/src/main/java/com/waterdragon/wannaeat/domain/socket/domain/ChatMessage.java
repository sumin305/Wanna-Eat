package com.waterdragon.wannaeat.domain.socket.domain;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
@Document(collection = "chatmessages")
public class ChatMessage {

	@Id
	private ObjectId id;

	private Long reservationId;
	private Long senderReservationParticipantId;
	private String content;
	private LocalDateTime registerTime;
}
