package com.waterdragon.wannaeat.domain.menu.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuDetailReponseDto {

	private Long menuId;
	private String menuName;
	private int menuPrice;
	private String menuImage;
	private String menuDescription;
}
