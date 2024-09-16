package com.waterdragon.wannaeat.domain.menu.exception.error;

public class MenuNotExistException extends RuntimeException {
	public MenuNotExistException(String message) {
		super(message);
	}
}
