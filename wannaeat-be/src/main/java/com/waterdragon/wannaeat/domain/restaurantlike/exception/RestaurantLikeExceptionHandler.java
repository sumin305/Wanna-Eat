package com.waterdragon.wannaeat.domain.restaurantlike.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.restaurantlike.exception.error.LikeDuplicateException;
import com.waterdragon.wannaeat.domain.restaurantlike.exception.error.LikeNotFoundException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class RestaurantLikeExceptionHandler {

	// 이미 존재하는 찜
	@ExceptionHandler(LikeDuplicateException.class)
	public final ResponseEntity<ErrorResponseDto> handleLikeDuplicateException(
		LikeDuplicateException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Like Duplicate", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

	// 찜 없음
	@ExceptionHandler(LikeNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleLikeNotFoundException(
		LikeNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Like Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
}
