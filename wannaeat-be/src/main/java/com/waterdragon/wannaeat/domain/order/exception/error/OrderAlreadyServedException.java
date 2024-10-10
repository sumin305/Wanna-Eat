package com.waterdragon.wannaeat.domain.order.exception.error;

public class OrderAlreadyServedException extends RuntimeException {
	public OrderAlreadyServedException(String message) {
		super(message);
	}
}
