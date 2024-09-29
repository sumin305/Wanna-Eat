package com.waterdragon.wannaeat.domain.menu.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuListByCategoryResponseDto {

	private String menuCategoryName;
	private List<MenuDetailResponseDto> menuDetailResponseDtos;
}
