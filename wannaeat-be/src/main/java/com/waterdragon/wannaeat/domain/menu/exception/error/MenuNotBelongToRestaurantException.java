package com.waterdragon.wannaeat.domain.menu.exception.error;

public class MenuNotBelongToRestaurantException extends RuntimeException {
	public MenuNotBelongToRestaurantException(String message) {
		super(message);
	}
}
