package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Kitchen {

	private int kitchenId; // 주방 번호
	private double ratio; // 가로,세로 비율
	private double x; // X 좌표
	private double y; // Y 좌표
	private double angle; // 각도
	private double length; // 주방 길이
	private double width; // 주방 너비
	private int floor; // 주방이 위치한 층
}
