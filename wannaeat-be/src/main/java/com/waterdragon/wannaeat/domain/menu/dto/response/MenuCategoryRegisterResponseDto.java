package com.waterdragon.wannaeat.domain.menu.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuCategoryRegisterResponseDto {

	private Long menuCategoryId;
	private String menuCategoryName;
}
