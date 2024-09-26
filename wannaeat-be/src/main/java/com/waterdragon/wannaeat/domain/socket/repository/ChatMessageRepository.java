package com.waterdragon.wannaeat.domain.socket.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.waterdragon.wannaeat.domain.socket.domain.ChatMessage;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
}
