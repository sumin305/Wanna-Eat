package com.waterdragon.wannaeat.domain.restaurant.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Element {

	private String itemId;
	private ItemType itemType;
	private double x;
	private double y;
	private int floor;
}
