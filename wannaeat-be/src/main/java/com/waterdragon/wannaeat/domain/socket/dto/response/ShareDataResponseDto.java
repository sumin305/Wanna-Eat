package com.waterdragon.wannaeat.domain.socket.dto.response;

import org.springframework.data.domain.Page;

import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageDetailResponseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShareDataResponseDto {

	Page<ChatMessageDetailResponseDto> chatMessageDetailResponseDtos;
}
