package com.waterdragon.wannaeat.domain.chatmessage.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.chatmessage.exception.error.ChatMessageParameterException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ChatMessageExceptionHandler {

	// 채팅 페이징 값 입력 안함
	@ExceptionHandler(ChatMessageParameterException.class)
	public final ResponseEntity<ErrorResponseDto> handleChatMessageParameterException(
		ChatMessageParameterException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Chat Message Parameter Exception", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
}
