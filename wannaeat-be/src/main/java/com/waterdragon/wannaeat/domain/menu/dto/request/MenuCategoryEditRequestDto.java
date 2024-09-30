package com.waterdragon.wannaeat.domain.menu.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuCategoryEditRequestDto {

	@NotNull(message = "식당 id는 필수 입력값입니다.")
	private Long restaurantId;
	@NotEmpty(message = "메뉴 카테고리명은 필수 입력값입니다.")
	private String menuCategoryName;
}
