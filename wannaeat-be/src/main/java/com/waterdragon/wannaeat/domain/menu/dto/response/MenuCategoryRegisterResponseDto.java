package com.waterdragon.wannaeat.domain.menu.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuCategoryRegisterResponseDto {

	private String menuCategoryName;
	private Long restaurantId;
}
