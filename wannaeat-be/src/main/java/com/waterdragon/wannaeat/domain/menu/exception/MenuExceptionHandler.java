package com.waterdragon.wannaeat.domain.menu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.menu.exception.error.InvalidMenuCategoryException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotBelongToRestaurantException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotExistException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class MenuExceptionHandler {

	// 유효하지 않은 메뉴 카테고리
	@ExceptionHandler(InvalidMenuCategoryException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidMenuCategoryException(InvalidMenuCategoryException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Menu Category", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 식당에 맞지 않는 메뉴
	@ExceptionHandler(MenuNotBelongToRestaurantException.class)
	public final ResponseEntity<ErrorResponseDto> handleMenuNotBelongToRestaurantException(
		MenuNotBelongToRestaurantException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Menu Not Belong To Restaurant", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 메뉴 id 해당 메뉴 존재 안함
	@ExceptionHandler(MenuNotExistException.class)
	public final ResponseEntity<ErrorResponseDto> handleMenuNotExistException(
		MenuNotExistException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Menu Not Exist", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
}
