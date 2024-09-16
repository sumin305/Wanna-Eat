package com.waterdragon.wannaeat.domain.restaurant.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantCategoryException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class RestaurantExceptionHandler {

	// 유효하지 않은 식당 카테고리
	@ExceptionHandler(InvalidRestaurantCategoryException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidRestaurantCategoryException(
		InvalidRestaurantCategoryException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Restaurant Category", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 사업자 등록번호 중복
	@ExceptionHandler(DuplicateBusinessNumberException.class)
	public final ResponseEntity<ErrorResponseDto> handleDuplicateBusinessNumberException(
		DuplicateBusinessNumberException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Duplicate Business Number", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}
}
