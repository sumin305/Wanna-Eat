package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Table {

	private int tableId; // 테이블 번호
	private int assignedSeats; // 실제 사장님 할당 좌석 수
	private double x; // X 좌표
	private double y; // Y 좌표
	private int floor; // 테이블이 위치한 층
}
