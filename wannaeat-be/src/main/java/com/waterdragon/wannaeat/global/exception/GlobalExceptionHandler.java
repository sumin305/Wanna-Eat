package com.waterdragon.wannaeat.global.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.global.response.ErrorResponseDto;
import com.waterdragon.wannaeat.global.exception.error.BadRequestException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// 서버 에러
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<ErrorResponseDto> handleAllExceptions(Exception ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Server Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// Bad Request 에러
	@ExceptionHandler(BadRequestException.class)
	public final ResponseEntity<ErrorResponseDto> handleBadRequestException(Exception ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Bad Request Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// @Valid 유효성 검사 에러 처리
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public final ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		// 유효성 검사 에러 목록에서 필드 이름과 메시지 추출
		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.put(error.getField(), error.getDefaultMessage());
		}

		// 400 Bad Request 응답으로 에러 정보 반환
		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

}
