package com.waterdragon.wannaeat.domain.restaurant.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.FailureRegistRestaurantToSsafyException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidBreakStartEndTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterReservationDateException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterTimeSequenceException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidMerchantNameException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantOpenCloseTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidUserLocationException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantAlreadyExistException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantCategoryNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantElementOutOfRangeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantStructureNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.TableIdDuplicateException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.TimeRequestWithoutDateException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class RestaurantExceptionHandler {

	// 사업자 등록번호 중복
	@ExceptionHandler(DuplicateBusinessNumberException.class)
	public final ResponseEntity<ErrorResponseDto> handleDuplicateBusinessNumberException(
		DuplicateBusinessNumberException ex) {
		log.error("Conflict error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Duplicate Business Number", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

	// 매장 영업 시작, 끝 시간 순서 오류
	@ExceptionHandler(InvalidRestaurantOpenCloseTimeException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidRestaurantOpenCloseTimeException(
		InvalidRestaurantOpenCloseTimeException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Restaurant Open Close Time", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 브레이크 타임 시작, 끝 시간 순서 오류
	@ExceptionHandler(InvalidBreakStartEndTimeException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidBreakStartEndTimeException(
		InvalidBreakStartEndTimeException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Break Start End Time", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 매장 존재 안함
	@ExceptionHandler(RestaurantNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantNotFoundException(
		RestaurantNotFoundException ex) {
		log.error("Not Found error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 매장 구조도 존재 안함
	@ExceptionHandler(RestaurantStructureNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantStructureNotFoundException(
		RestaurantStructureNotFoundException ex) {
		log.error("Not Found error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Structure Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 해당 매장 카테고리 존재 안함.
	@ExceptionHandler(RestaurantCategoryNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantCategoryNotFoundException(
		RestaurantCategoryNotFoundException ex) {
		log.error("Not Found error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Category Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 사용자 위도, 경도 못 받아옴.
	@ExceptionHandler(InvalidUserLocationException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidUserLocationException(
		InvalidUserLocationException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid User Location", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 날짜 없이 시간 필터링 요청
	@ExceptionHandler(TimeRequestWithoutDateException.class)
	public final ResponseEntity<ErrorResponseDto> handleTimeRequestWithoutDateException(
		TimeRequestWithoutDateException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Time Request Without Date", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 필터링 요청 시간 순서 오류
	@ExceptionHandler(InvalidFilterTimeSequenceException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidFilterTimeSequenceException(
		InvalidFilterTimeSequenceException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Filter Time Sequence", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 필터링 오늘 이전의 날짜로 요청
	@ExceptionHandler(InvalidFilterReservationDateException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidFilterReservationDateException(
		InvalidFilterReservationDateException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Filter Reservation Date", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 매장 구조도 요소 범위 벗어남
	@ExceptionHandler(RestaurantElementOutOfRangeException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantElementOutOfRangeException(
		RestaurantElementOutOfRangeException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Element Out Of Range", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 매장 구조도 요소 범위 벗어남
	@ExceptionHandler(TableIdDuplicateException.class)
	public final ResponseEntity<ErrorResponseDto> handleTableIdDuplicateException(
		TableIdDuplicateException ex) {
		log.error("Conflict error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Table Id Duplicate", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

	// 싸피페이 가맹점 등록 실패
	@ExceptionHandler(FailureRegistRestaurantToSsafyException.class)
	public final ResponseEntity<ErrorResponseDto> handleFailureRegistRestaurantToSsafyException(
		FailureRegistRestaurantToSsafyException ex) {
		log.error("Server error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Failure Regist Restaurant To Ssafy", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 싸피페이 가맹점명과 식당명 불일치
	@ExceptionHandler(InvalidMerchantNameException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidMerchantNameException(
		InvalidMerchantNameException ex) {
		log.error("Server error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Merchant Name Exception", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 이미 해당 계정으로 등록된 식당 존재
	@ExceptionHandler(RestaurantAlreadyExistException.class)
	public final ResponseEntity<ErrorResponseDto> handleRestaurantAlreadyExistException(
		RestaurantAlreadyExistException ex) {
		log.error("Conflict error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Restaurant Already Exist Exception", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}
}
