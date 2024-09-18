package com.waterdragon.wannaeat.domain.user.exception.error;

public class DuplicatePhoneException extends RuntimeException {
	public DuplicatePhoneException(String message) {
		super(message);
	}
}
