package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ToiletDetailResponseDto {

	private double x; // X 좌표
	private double y; // Y 좌표
	private int floor; // 카운터가 위치한 층
}
