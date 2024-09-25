package com.waterdragon.wannaeat.domain.socket.service;

import com.waterdragon.wannaeat.domain.socket.dto.request.ChatMessageRegisterRequestDto;

public interface ChatMessageService {

	void registerChatMessage(
		ChatMessageRegisterRequestDto chatMessageRegisterRequestDto);
}
