package com.waterdragon.wannaeat.domain.restaurantlike.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.restaurant.exception.error.TimeRequestWithoutDateException;
import com.waterdragon.wannaeat.domain.restaurantlike.exception.error.AlreadyLikeException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class RestaurantLikeExceptionHandler {

	// 이미 존재하는 찜
	@ExceptionHandler(AlreadyLikeException.class)
	public final ResponseEntity<ErrorResponseDto> handleAlreadyLikeException(
		AlreadyLikeException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Already Like Exception", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}
}
