package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
public class Table {

	private int tableId; // 테이블 번호
	private int capableSeats; // 총 좌석 수
	private int assignedSeats; // 실제 사장님 할당 좌석 수
	private double ratio; // 가로,세로 비율
	private double x; // X 좌표
	private double y; // Y 좌표
	private double angle; // 각도
	private double length; // 테이블 길이
	private double width; // 테이블 너비
	private int floor; // 테이블이 위치한 층
}
