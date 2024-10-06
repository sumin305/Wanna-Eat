package com.waterdragon.wannaeat.global.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.global.exception.error.BadRequestException;
import com.waterdragon.wannaeat.global.exception.error.FileRemoveFailureException;
import com.waterdragon.wannaeat.global.exception.error.FileUploadFailureException;
import com.waterdragon.wannaeat.global.exception.error.FileUploadMoreThanTenException;
import com.waterdragon.wannaeat.global.exception.error.NotAuthenticatedException;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	// 서버 에러
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<ErrorResponseDto> handleAllExceptions(Exception ex) {
		log.error("Server error : {}", ex.getMessage(), ex);  // 로그에 에러 메시지와 스택 트레이스 출력
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Server Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// Bad Request 에러
	@ExceptionHandler(BadRequestException.class)
	public final ResponseEntity<ErrorResponseDto> handleBadRequestException(BadRequestException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Bad Request Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// @Valid 유효성 검사 에러 처리
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public final ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		Map<String, String> errors = new HashMap<>();

		// 유효성 검사 에러 목록에서 필드 이름과 메시지 추출
		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.put(error.getField(), error.getDefaultMessage());
		}

		// 400 Bad Request 응답으로 에러 정보 반환
		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

	// FileUpload 에러
	@ExceptionHandler(FileUploadFailureException.class)
	public final ResponseEntity<ErrorResponseDto> handleFileUploadFailureException(FileUploadFailureException ex) {
		log.error("Server error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("File Upload Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// FileRemove 에러
	@ExceptionHandler(FileRemoveFailureException.class)
	public final ResponseEntity<ErrorResponseDto> handleFileRemoveFailureException(FileRemoveFailureException ex) {
		log.error("Server error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("File Remove Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 비인증 에러
	@ExceptionHandler(NotAuthenticatedException.class)
	public final ResponseEntity<ErrorResponseDto> handleNotAuthenticatedException(NotAuthenticatedException ex) {
		log.error("Unauthorized error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Not Authenticated", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
	}

	// 비인가(권한 없음) 에러
	@ExceptionHandler(NotAuthorizedException.class)
	public final ResponseEntity<ErrorResponseDto> handleNotAuthorizedException(NotAuthorizedException ex) {
		log.error("Forbidden error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Not Authorized", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
	}

	// FileUpload 10개 이상 (용량 제한)
	@ExceptionHandler(FileUploadMoreThanTenException.class)
	public final ResponseEntity<ErrorResponseDto> handleFileUploadMoreThanTenException(
		FileUploadMoreThanTenException ex) {
		log.error("Server error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("File Upload More Than 10 Error", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
