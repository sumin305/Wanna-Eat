package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import java.util.List;

import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantImageListResponseDto {

	private List<String> restaurantImages;
}
