package com.waterdragon.wannaeat.domain.alarm.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AlarmType {

	RESERVATION_CONFIRMED("예약 완료"),
	RESERVATION_CANCELED("예약 취소"),
	ENTERING_SOON("입장 30분 전"),
	EXITING_SOON("퇴실 30분 전"),
	EXIT_COMPLETED("퇴실 완료"),
	VISIT_SOON("방문 10분전"),
	ORDER_PAID("결제 완료"),
	ORDER_ADDED("주문 접수");

	private final String key;

}