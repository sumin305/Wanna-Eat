package com.waterdragon.wannaeat.domain.payment.exception.error;

public class MenuCountRequestMoreThanUnpaidException extends RuntimeException {
	public MenuCountRequestMoreThanUnpaidException(String message) {
		super(message);
	}
}
