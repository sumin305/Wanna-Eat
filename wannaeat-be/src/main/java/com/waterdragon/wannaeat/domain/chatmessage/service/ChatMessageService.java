package com.waterdragon.wannaeat.domain.chatmessage.service;

import org.springframework.data.domain.Page;

import com.waterdragon.wannaeat.domain.chatmessage.dto.request.ChatMessageRegisterRequestDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageDetailResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;

public interface ChatMessageService {

	void registerChatMessage(
		ChatMessageRegisterRequestDto chatMessageRegisterRequestDto);

	ChatMessageListResponseDto getListChatMessage(String reservationUrl, Long ChatSize, Long ChatPage);
}

