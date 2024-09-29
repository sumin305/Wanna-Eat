package com.waterdragon.wannaeat.domain.cart.exception.error;

public class CartNotFoundException extends RuntimeException {
	public CartNotFoundException(String message) {
		super(message);
	}
}
