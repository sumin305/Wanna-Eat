package com.waterdragon.wannaeat.domain.restaurant.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantDetailResponseDto;

public interface RestaurantService {

	void registerRestaurant(RestaurantRegisterRequestDto restaurantRegisterRequestDto);

	RestaurantDetailResponseDto getDetailRestaurantByRestaurantId(Long restaurantId);

	MenuListResponseDto getListMenusByRestaurantId(Long restaurantId);

	void editRestaurant(Long restaurantId, RestaurantEditRequestDto restaurantEditRequestDto,
		List<MultipartFile> multipartFiles);
}
