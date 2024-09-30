package com.waterdragon.wannaeat.domain.menu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.menu.exception.error.MenuCategoryNotFoundException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotBelongToRestaurantException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotFoundException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class MenuExceptionHandler {

	// 식당에 맞지 않는 메뉴
	@ExceptionHandler(MenuNotBelongToRestaurantException.class)
	public final ResponseEntity<ErrorResponseDto> handleMenuNotBelongToRestaurantException(
		MenuNotBelongToRestaurantException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Menu Not Belong To Restaurant", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 메뉴 id 해당 메뉴 존재 안함
	@ExceptionHandler(MenuNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleMenuNotFoundException(
		MenuNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Menu Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 메뉴 카테고리 존재 안함
	@ExceptionHandler(MenuCategoryNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleMenuCategoryNotFoundException(
		MenuCategoryNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Menu Category Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
}
