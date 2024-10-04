package com.waterdragon.wannaeat.domain.cart.exception.error;

public class CartMenuNotFoundException extends RuntimeException {
	public CartMenuNotFoundException(String message) {
		super(message);
	}
}
