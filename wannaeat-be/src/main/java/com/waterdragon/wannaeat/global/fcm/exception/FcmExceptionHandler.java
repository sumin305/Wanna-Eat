package com.waterdragon.wannaeat.global.fcm.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.global.fcm.exception.error.FailedSendFcmException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class FcmExceptionHandler {

	// FCM 전송 실패
	@ExceptionHandler(FailedSendFcmException.class)
	public final ResponseEntity<ErrorResponseDto> handleFailedSendFcmException(
		FailedSendFcmException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Failure Send FCM", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

}
