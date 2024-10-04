package com.waterdragon.wannaeat.domain.restaurant.exception.error;

public class TimeRequestWithoutDateException extends RuntimeException {
	public TimeRequestWithoutDateException(String message) {
		super(message);
	}
}
