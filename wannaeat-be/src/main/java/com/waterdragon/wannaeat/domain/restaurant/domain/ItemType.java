package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ItemType {

	SQUARE("square", "사각 테이블"),
	ROUNDED("rounded", "원형 테이블"),
	RESTROOM("restroom", "화장실"),
	COUNTER("counter", "계산대"),
	ENTRANCE("entrance", "출입구"),
	KITCHEN("kitchen", "주방");

	private final String itemType;
	private final String label;
}
