package com.waterdragon.wannaeat.domain.restaurant.exception.error;

public class InvalidUserLocationException extends RuntimeException {
	public InvalidUserLocationException(String message) {
		super(message);
	}
}