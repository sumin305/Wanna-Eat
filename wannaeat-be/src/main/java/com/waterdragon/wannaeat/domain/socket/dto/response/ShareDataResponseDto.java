package com.waterdragon.wannaeat.domain.socket.dto.response;

import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShareDataResponseDto {

	ChatMessageListResponseDto chatMessageDetailResponseDtos;
}
