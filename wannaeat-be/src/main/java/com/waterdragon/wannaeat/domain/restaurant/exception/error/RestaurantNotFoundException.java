package com.waterdragon.wannaeat.domain.restaurant.exception.error;

public class RestaurantNotFoundException extends RuntimeException {
	public RestaurantNotFoundException(String message) {
		super(message);
	}
}
