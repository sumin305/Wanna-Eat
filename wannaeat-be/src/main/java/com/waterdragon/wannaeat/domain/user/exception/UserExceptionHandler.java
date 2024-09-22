package com.waterdragon.wannaeat.domain.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.user.exception.error.DuplicateNicknameException;
import com.waterdragon.wannaeat.domain.user.exception.error.DuplicatePhoneException;
import com.waterdragon.wannaeat.domain.user.exception.error.DuplicateUserException;
import com.waterdragon.wannaeat.domain.user.exception.error.InvalidCodeException;
import com.waterdragon.wannaeat.domain.user.exception.error.InvalidPhoneException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class UserExceptionHandler {

	// 이미 가입된 유저
	@ExceptionHandler(DuplicateUserException.class)
	public final ResponseEntity<ErrorResponseDto> handleDuplicateUserException(
		DuplicateUserException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Duplicate User", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

	// 중복된 닉네임으로 가입된 계정 존재
	@ExceptionHandler(DuplicateNicknameException.class)
	public final ResponseEntity<ErrorResponseDto> handleDuplicateNicknameException(
		DuplicateUserException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Duplicate Nickname", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

	// 유효하지 않은 전화번호
	@ExceptionHandler(InvalidPhoneException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidPhoneException(
		InvalidPhoneException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Phone Number", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.UNPROCESSABLE_ENTITY);
	}

	// 유효하지 않은 인증코드
	@ExceptionHandler(InvalidCodeException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidCodeException(
		InvalidCodeException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Auth Code", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
	}

	// 동일 플랫폼, 전화번호로 가입된 계정 존재
	@ExceptionHandler(DuplicatePhoneException.class)
	public final ResponseEntity<ErrorResponseDto> handleDuplicatePhoneException(
		DuplicatePhoneException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Duplicate Phone Number", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

}
