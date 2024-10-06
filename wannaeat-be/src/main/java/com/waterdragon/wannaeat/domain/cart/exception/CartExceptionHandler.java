package com.waterdragon.wannaeat.domain.cart.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.cart.exception.error.CartMenuCntMinusException;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartMenuNotFoundException;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartMenuPlusMinusException;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartNotFoundException;
import com.waterdragon.wannaeat.domain.cart.exception.error.ReservationParticipantNotMatchReservationException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class CartExceptionHandler {

	// 장바구니 존재 안함
	@ExceptionHandler(CartNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleCartNotFoundException(
		CartNotFoundException ex) {
		log.error("Not Found error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Cart Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 메뉴 증감량 오류값 (+1, -1 제외한 입력값)
	@ExceptionHandler(CartMenuPlusMinusException.class)
	public final ResponseEntity<ErrorResponseDto> handleCartMenuPlusMinusException(
		CartMenuPlusMinusException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Cart Menu Plus Minus Exception", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 메뉴 재고수량 음수
	@ExceptionHandler(CartMenuCntMinusException.class)
	public final ResponseEntity<ErrorResponseDto> handleCartMenuCntMinusException(
		CartMenuCntMinusException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Cart Menu Cnt Minus Exception", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 예약 참가자가 해당 예약의 참가자가 아님.
	@ExceptionHandler(ReservationParticipantNotMatchReservationException.class)
	public final ResponseEntity<ErrorResponseDto> handleReservationParticipantNotMatchReservationException(
		ReservationParticipantNotMatchReservationException ex) {
		log.error("Forbidden error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Reservation Participant Not Match Reservation", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
	}

	// 장바구니 메뉴 존재 안함.
	@ExceptionHandler(CartMenuNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleCartMenuNotFoundException(
		CartMenuNotFoundException ex) {
		log.error("Not Found error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Cart Menu Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
}
