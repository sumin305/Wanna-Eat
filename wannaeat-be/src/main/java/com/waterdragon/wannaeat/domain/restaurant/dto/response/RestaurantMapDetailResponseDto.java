package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantMapDetailResponseDto {

	private Long restaurantId;
	private String restaurantName;
	private Double latitude;
	private Double longitude;
}
