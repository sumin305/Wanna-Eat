package com.waterdragon.wannaeat.domain.alarm.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MoveCategory {

	RESERVATION("reservation");

	private final String key;
}