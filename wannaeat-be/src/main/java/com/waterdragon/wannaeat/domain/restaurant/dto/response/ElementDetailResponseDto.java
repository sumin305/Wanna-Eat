package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ElementDetailResponseDto {

	private String itemId;
	private String itemType;
	private double x;
	private double y;
	private int floor;
}
