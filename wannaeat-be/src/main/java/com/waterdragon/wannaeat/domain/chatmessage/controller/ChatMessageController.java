package com.waterdragon.wannaeat.domain.chatmessage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.chatmessage.dto.request.ChatMessageRegisterRequestDto;
import com.waterdragon.wannaeat.domain.chatmessage.service.ChatMessageService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {

	private final ChatMessageService chatMessageService;

	/**
	 * 채팅 메시지 등록 API
	 *
	 * @param chatMessageRegisterRequestDto
	 * @return
	 */
	@MessageMapping("/chats/register")
	public ResponseEntity<ResponseDto<Void>> registerChatMessage(
		ChatMessageRegisterRequestDto chatMessageRegisterRequestDto) {

		chatMessageService.registerChatMessage(chatMessageRegisterRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("채팅이 성공적으로 등록되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}
}

