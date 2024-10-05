package com.waterdragon.wannaeat.domain.restaurant.exception.error;

public class RestaurantAlreadyExistException extends RuntimeException {
	public RestaurantAlreadyExistException(String message) {
		super(message);
	}
}
