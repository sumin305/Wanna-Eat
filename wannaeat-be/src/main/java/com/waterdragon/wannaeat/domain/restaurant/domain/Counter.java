package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Counter {

	private int counterId; // 카운터 번호
	private double ratio; // 가로,세로 비율
	private double x; // X 좌표
	private double y; // Y 좌표
	private double angle; // 각도
	private double length; // 카운터 길이
	private double width; // 카운터 너비
	private int floor; // 카운터가 위치한 층
}
