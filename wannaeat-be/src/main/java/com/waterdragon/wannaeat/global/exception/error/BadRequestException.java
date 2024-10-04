package com.waterdragon.wannaeat.global.exception.error;

public class BadRequestException extends RuntimeException {
	public BadRequestException(String message) {
		super(message);
	}
}
