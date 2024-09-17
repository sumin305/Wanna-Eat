package com.waterdragon.wannaeat.domain.restaurant.exception.error;

public class RestaurantCategoryNotFoundException extends RuntimeException {
	public RestaurantCategoryNotFoundException(String message) {
		super(message);
	}
}