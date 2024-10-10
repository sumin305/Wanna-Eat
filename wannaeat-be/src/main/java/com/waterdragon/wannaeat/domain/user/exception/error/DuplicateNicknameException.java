package com.waterdragon.wannaeat.domain.user.exception.error;

public class DuplicateNicknameException extends RuntimeException {
	public DuplicateNicknameException(String message) {
		super(message);
	}
}
