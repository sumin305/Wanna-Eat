package com.waterdragon.wannaeat.domain.menu.exception.error;

public class MenuNotFoundException extends RuntimeException {
	public MenuNotFoundException(String message) {
		super(message);
	}
}
