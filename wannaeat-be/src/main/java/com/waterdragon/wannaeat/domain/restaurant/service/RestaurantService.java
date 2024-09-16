package com.waterdragon.wannaeat.domain.restaurant.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;

public interface RestaurantService {

	void registerRestaurant(RestaurantRegisterRequestDto restaurantRegisterRequestDto);

	void editRestaurant(Long restaurantId, RestaurantEditRequestDto restaurantEditRequestDto,
		List<MultipartFile> multipartFiles);
}
