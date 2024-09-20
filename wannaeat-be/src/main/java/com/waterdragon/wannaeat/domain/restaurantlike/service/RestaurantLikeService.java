package com.waterdragon.wannaeat.domain.restaurantlike.service;

import com.waterdragon.wannaeat.domain.restaurantlike.dto.response.UserLikeListResponseDto;

public interface RestaurantLikeService {

	void registerRestaurantLike(Long restaurantId);

	UserLikeListResponseDto getListUserLikeRestaurant();

	void removeRestaurantLike(Long restaurantId);
}
