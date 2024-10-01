package com.waterdragon.wannaeat.domain.reservation.exception.error;

public class UnpaidOrderExistsException extends RuntimeException {
	public UnpaidOrderExistsException(String message) {
		super(message);
	}
}
