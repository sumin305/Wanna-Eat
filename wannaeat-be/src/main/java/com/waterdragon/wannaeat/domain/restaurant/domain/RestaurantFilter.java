package com.waterdragon.wannaeat.domain.restaurant.domain;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantFilter {

	private Long categoryId;        // 카테고리 ID
	private String keyword;         // 검색어 (식당 이름 or 메뉴 이름)
	private LocalDate reservationDate; // 방문 날짜
	private LocalTime startTime;    // 예약 시작 시간
	private LocalTime endTime;      // 예약 종료 시간
	private Integer memberCount;    // 예약 인원 수
	private Double latitude;        // 검색하는 사용자의 위도
	private Double longitude;       // 검색하는 사용자의 경도
}
