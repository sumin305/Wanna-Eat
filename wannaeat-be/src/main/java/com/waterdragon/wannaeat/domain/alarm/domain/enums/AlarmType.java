package com.waterdragon.wannaeat.domain.alarm.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AlarmType {

	RESERVATION_CONFIRMED("예약 신청"),
	RESERVATION_CANCELED("예약 취소"),
	ENTERING_SOON("입장 30분 전"),
	EXITING_SOON("퇴실 30분 전"),
	EXIT_COMPLETED("퇴실 완료"),
	VISIT_SOON("방문 10분전"),
	ORDER_ADDED("주문 접수");

	private final String key;

	public String getMessage() {
		return switch (this) {
			case RESERVATION_CONFIRMED -> "새로운 예약이 접수되었습니다.";
			case RESERVATION_CANCELED -> "예약이 취소되었습니다.";
			case ENTERING_SOON -> "입장 30분 전입니다.";
			case EXITING_SOON -> "퇴실 30분 전입니다.";
			case EXIT_COMPLETED -> "번 테이블이 퇴실하였습니다.";
			case VISIT_SOON -> "번 테이블 방문 10분 전입니다.";
			case ORDER_ADDED -> "번 테이블 주문이 접수되었습니다.";
		};
	}

}