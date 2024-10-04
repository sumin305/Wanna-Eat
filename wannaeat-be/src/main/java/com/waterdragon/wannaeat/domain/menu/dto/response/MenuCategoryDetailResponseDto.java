package com.waterdragon.wannaeat.domain.menu.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuCategoryDetailResponseDto {

	private Long menuCategoryId;
	private String menuCategoryName;
}
