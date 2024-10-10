package com.waterdragon.wannaeat.domain.menu.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuCategoryEditRequestDto {

	@NotEmpty(message = "메뉴 카테고리명은 필수 입력값입니다.")
	private String menuCategoryName;
}
