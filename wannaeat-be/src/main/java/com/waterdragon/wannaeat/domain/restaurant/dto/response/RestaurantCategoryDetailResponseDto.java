package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantCategoryDetailResponseDto {

	private Long restaurantCategoryId;
	private String restaurantCategoryName;
}
