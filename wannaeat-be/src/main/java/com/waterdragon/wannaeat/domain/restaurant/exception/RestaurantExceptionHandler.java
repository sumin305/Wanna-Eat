package com.waterdragon.wannaeat.domain.restaurant.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidBreakStartEndTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterReservationDateException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterTimeSequenceException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantCategoryException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantOpenCloseTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidUserLocationException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantCategoryNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantStructureNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.TimeRequestWithoutDateException;
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

	// 매장 영업 시작, 끝 시간 순서 오류
	@ExceptionHandler(InvalidRestaurantOpenCloseTimeException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidRestaurantOpenCloseTimeException(
		InvalidRestaurantOpenCloseTimeException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Restaurant Open Close Time", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 브레이크 타임 시작, 끝 시간 순서 오류
	@ExceptionHandler(InvalidBreakStartEndTimeException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidBreakStartEndTimeException(
		InvalidBreakStartEndTimeException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Break Start End Time", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 매장 존재 안함
	@ExceptionHandler(RestaurantNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantNotFoundException(
		RestaurantNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 매장 구조도 존재 안함
	@ExceptionHandler(RestaurantStructureNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantStructureNotFoundException(
		RestaurantStructureNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Structure Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 해당 매장 카테고리 존재 안함.
	@ExceptionHandler(RestaurantCategoryNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantCategoryNotFoundException(
		RestaurantCategoryNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Category Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 사용자 위도, 경도 못 받아옴.
	@ExceptionHandler(InvalidUserLocationException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidUserLocationException(
		InvalidUserLocationException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid User Location", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 날짜 없이 시간 필터링 요청
	@ExceptionHandler(TimeRequestWithoutDateException.class)
	public final ResponseEntity<ErrorResponseDto> handleTimeRequestWithoutDateException(
		TimeRequestWithoutDateException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Time Request Without Date", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 필터링 요청 시간 순서 오류
	@ExceptionHandler(InvalidFilterTimeSequenceException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidFilterTimeSequenceException(
		InvalidFilterTimeSequenceException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Filter Time Sequence", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 필터링 오늘 이전의 날짜로 요청
	@ExceptionHandler(InvalidFilterReservationDateException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidFilterReservationDateException(
		InvalidFilterReservationDateException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Filter Reservation Date", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
}
