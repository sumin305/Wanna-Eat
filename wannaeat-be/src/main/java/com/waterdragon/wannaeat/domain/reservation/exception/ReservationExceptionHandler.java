package com.waterdragon.wannaeat.domain.reservation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.reservation.exception.error.AlreadyCancelledReservationException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.DuplicateReservationTableException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationParticipantNotFoundException;
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

	// 예약 참가자 존재 안함
	@ExceptionHandler(ReservationParticipantNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleReservationParticipantNotFoundException(
		ReservationParticipantNotFoundException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Reservation Participant Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 동일 시간대 예약된 테이블 존재
	@ExceptionHandler(DuplicateReservationTableException.class)
	public final ResponseEntity<ErrorResponseDto> handleDuplicateReservationTableException(
		DuplicateReservationTableException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Duplicate Reservation Table", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}

	// 이미 취소된 예약
	@ExceptionHandler(AlreadyCancelledReservationException.class)
	public final ResponseEntity<ErrorResponseDto> handleAlreadyCancelledReservationException(
		AlreadyCancelledReservationException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Already Cancelled Reservation", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);
	}
}
