package com.waterdragon.wannaeat.domain.user.exception.error;

public class DuplicateUserException extends RuntimeException {
	public DuplicateUserException(String message) {
		super(message);
	}
}
