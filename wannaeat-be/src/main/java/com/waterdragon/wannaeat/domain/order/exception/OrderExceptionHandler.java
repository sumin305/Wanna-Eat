package com.waterdragon.wannaeat.domain.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.waterdragon.wannaeat.domain.order.exception.error.OrderAlreadyServedException;
import com.waterdragon.wannaeat.domain.order.exception.error.OrderNotFoundException;
import com.waterdragon.wannaeat.domain.order.exception.error.TotalCntLowerThanPaidCntException;
import com.waterdragon.wannaeat.global.response.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class OrderExceptionHandler {

	// 주문 존재 안함
	@ExceptionHandler(OrderNotFoundException.class)
	public final ResponseEntity<ErrorResponseDto> handleOrderNotFoundException(
		OrderNotFoundException ex) {
		log.error("Not Found error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Order Not Found", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// 총 수량 < 주문된 수량
	@ExceptionHandler(TotalCntLowerThanPaidCntException.class)
	public final ResponseEntity<ErrorResponseDto> handleTotalCntLowerThanPaidCntException(
		TotalCntLowerThanPaidCntException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("TotalCnt Lower Than PaidCnt", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// 이미 서빙 완료된 주문
	@ExceptionHandler(OrderAlreadyServedException.class)
	public final ResponseEntity<ErrorResponseDto> handleOrderAlreadyServedException(
		OrderAlreadyServedException ex) {
		log.error("Bad Request error : {}", ex.getMessage(), ex);
		ex.printStackTrace();
		ErrorResponseDto error = new ErrorResponseDto("Order Already Served", ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
}
