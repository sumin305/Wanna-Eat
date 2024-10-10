package com.waterdragon.wannaeat.domain.chatmessage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.waterdragon.wannaeat.domain.chatmessage.domain.ChatMessage;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

	Page<ChatMessage> findAllByReservationIdOrderByRegisterTimeDesc(Long reservationId, Pageable pageable);
}
