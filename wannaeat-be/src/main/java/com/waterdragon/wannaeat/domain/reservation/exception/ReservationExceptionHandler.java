package com.waterdragon.wannaeat.domain.reservation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class ReservationExceptionHandler {

	// 예약 존재 안함
	@ExceptionHandler(ReservationNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleReservationNotFoundException(
		ReservationNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Reservation Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
}
