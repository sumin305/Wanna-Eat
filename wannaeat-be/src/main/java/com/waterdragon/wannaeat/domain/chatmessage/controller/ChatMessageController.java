package com.waterdragon.wannaeat.domain.chatmessage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.chatmessage.dto.request.ChatMessageRegisterRequestDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.service.ChatMessageService;
import com.waterdragon.wannaeat.domain.socket.dto.response.ShareDataResponseDto;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
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

	@Operation(summary = "채팅 목록 조회 API")
	@GetMapping("/api/public/chatmessages/{reservationUrl}")
	public ResponseEntity<ResponseDto<ChatMessageListResponseDto>> getListChatMessage(
		@PathVariable(name = "reservationUrl") String reservationUrl,
		@RequestParam(name = "chatPage", required = false) Long chatPage,
		@RequestParam(name = "chatSize", required = false) Long chatSize) {

		ChatMessageListResponseDto chatMessageListResponseDto = chatMessageService.getListChatMessage(reservationUrl, chatPage, chatSize);
		ResponseDto<ChatMessageListResponseDto> responseDto = ResponseDto.<ChatMessageListResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("해당 공유예약 url의 채팅 페이징 목록이 성공적으로 조회되었습니다.")
			.data(chatMessageListResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);

	}
}

