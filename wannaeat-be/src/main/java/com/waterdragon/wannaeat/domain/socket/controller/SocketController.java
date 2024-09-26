package com.waterdragon.wannaeat.domain.socket.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.socket.dto.request.ChatMessageRegisterRequestDto;
import com.waterdragon.wannaeat.domain.socket.service.ChatMessageService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SocketController {

	private final ChatMessageService chatMessageService;

	@MessageMapping("/chats/register")
	public ResponseEntity<ResponseDto<Void>> registerChatMessage(
		ChatMessageRegisterRequestDto chatMessageRegisterRequestDto) {

		System.out.print("컨트롤러 들어옴");
		System.out.println(chatMessageRegisterRequestDto);

		chatMessageService.registerChatMessage(chatMessageRegisterRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("채팅이 성공적으로 등록되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}
}
