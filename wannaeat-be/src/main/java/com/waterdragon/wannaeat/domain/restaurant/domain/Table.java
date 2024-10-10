package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Table {

	private String itemId;
	private ItemType itemType;
	private double x;
	private double y;
	private int floor;

	private int tableId; // 테이블 번호
	private int assignedSeats; // 좌석 수
}
