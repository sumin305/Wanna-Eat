package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Counter {

	private double x; // X 좌표
	private double y; // Y 좌표
	private int floor; // 카운터가 위치한 층
}
