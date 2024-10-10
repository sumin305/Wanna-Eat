package com.waterdragon.wannaeat.domain.order.exception.error;

public class OrderNotFoundException extends RuntimeException {
	public OrderNotFoundException(String message) {
		super(message);
	}
}
