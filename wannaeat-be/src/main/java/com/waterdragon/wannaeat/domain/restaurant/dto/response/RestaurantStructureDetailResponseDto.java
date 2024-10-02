package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import java.util.List;

import com.waterdragon.wannaeat.domain.restaurant.domain.Size;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantStructureDetailResponseDto {

	private Long restaurantId;

	private Size size; // 매장 크기
	private int floorCnt; // 매장 층수

	private List<TableDetailResponseDto> tables; // 테이블 정보
	private List<ToiletDetailResponseDto> toilets; // 화장실 정보
	private List<CounterDetailResponseDto> counters; // 계산대 정보
	private List<KitchenDetailResponseDto> kitchens; // 주방 정보
}
