package com.waterdragon.wannaeat.domain.menu.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuDetailResponseDto {

	private Long menuId;
	private String menuName;
	private int menuPrice;
	private String menuImage;
	private String menuDescription;
}
