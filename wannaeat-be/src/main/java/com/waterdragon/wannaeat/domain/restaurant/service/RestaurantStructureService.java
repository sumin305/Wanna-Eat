package com.waterdragon.wannaeat.domain.restaurant.service;

import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantStructureRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantStructureDetailResponseDto;

public interface RestaurantStructureService {

	void registerRestaurantStructure(RestaurantStructureRegisterRequestDto restaurantStructureRegisterRequestDto);

	RestaurantStructureDetailResponseDto getDetailRestaurantStructureByRestaurantId(Long restaurantId);
}
