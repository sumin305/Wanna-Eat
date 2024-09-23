package com.waterdragon.wannaeat.domain.payment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.payment.exception.error.InvalidPaymentException;
import com.waterdragon.wannaeat.domain.payment.exception.error.MenuCountRequestMoreThanUnpaidException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

@RestControllerAdvice
public class PaymentExceptionHandler {

	// 유효하지 않은 결제에 대한 요청
	@ExceptionHandler(InvalidPaymentException.class)
	public final ResponseEntity<ErrorResponseDto> handleInvalidPaymentException(
		InvalidPaymentException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Invalid Payment", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 결제 요청 수량 > 미결제 수량
	@ExceptionHandler(MenuCountRequestMoreThanUnpaidException.class)
	public final ResponseEntity<ErrorResponseDto> handleMenuCountRequestMoreThanUnpaidException(
		MenuCountRequestMoreThanUnpaidException ex) {
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("MenuCount Request More Than Unpaid", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
}
