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

	private List<TableDetailResponseDto> tableDetailResponseDtos;
	private List<ElementDetailResponseDto> elementDetailResponseDtos;
}
