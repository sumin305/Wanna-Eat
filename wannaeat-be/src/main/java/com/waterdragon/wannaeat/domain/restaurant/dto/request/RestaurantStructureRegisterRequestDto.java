package com.waterdragon.wannaeat.domain.restaurant.dto.request;

import java.util.List;

import com.waterdragon.wannaeat.domain.restaurant.domain.Size;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantStructureRegisterRequestDto {

	@NotNull(message = "매장 크기는 필수 입력값입니다.")
	private Size size;

	@NotNull(message = "층수는 필수 입력값입니다.")
	private Integer floorCnt;

	private List<TableRegisterRequestDto> tableRegisterRequestDtos;
	private List<ElementRegisterRequestDto> elementRegisterRequestDtos;
}
