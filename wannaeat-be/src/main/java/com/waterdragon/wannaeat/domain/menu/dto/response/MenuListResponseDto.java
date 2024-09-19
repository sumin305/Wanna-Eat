package com.waterdragon.wannaeat.domain.menu.dto.response;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuListResponseDto {

	private Map<String, List<MenuDetailReponseDto>> menusMap;
}
