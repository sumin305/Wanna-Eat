package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CounterDetailResponseDto {

	private double x;
	private double y;
	private int floor;
}
