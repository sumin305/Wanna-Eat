package com.waterdragon.wannaeat.domain.menu.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class MenuRegisterRequestDto {

	@NotNull(message = "식당은 필수 입력값입니다.")
	private Long restaurantId;

	@NotNull(message = "메뉴 카테고리는 필수 입력값입니다.")
	private Long menuCategoryId;

	@NotEmpty(message = "메뉴명은 필수 입력값입니다.")
	private String menuName;

	@NotNull(message = "메뉴 가격은 필수 입력값입니다.")
	private Integer menuPrice;

	private String menuDescription;
}
