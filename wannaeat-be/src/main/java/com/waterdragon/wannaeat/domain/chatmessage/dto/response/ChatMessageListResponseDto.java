package com.waterdragon.wannaeat.domain.chatmessage.dto.response;

import org.springframework.data.domain.Page;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMessageListResponseDto {

	Page<ChatMessageDetailResponseDto> chatMessageDetailResponseDtos;
}
