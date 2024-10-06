package com.waterdragon.wannaeat.domain.statistic.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRestaurantVisitStatisticResponseDto {
	private Long restaurantId;

	private String restaurantName;

	private String restaurantImage;

	private Integer restaurantVisitCount;

	private String restaurantCategory;

}
