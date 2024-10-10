package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantCategoryListResponseDto {
	List<RestaurantCategoryDetailResponseDto> restaurantCategories;
}
