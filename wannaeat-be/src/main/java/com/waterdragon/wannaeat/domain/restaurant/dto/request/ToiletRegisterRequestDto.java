package com.waterdragon.wannaeat.domain.restaurant.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ToiletRegisterRequestDto {

	@NotNull(message = "화장실 x좌표는 필수 입력값입니다.")
	private Double x;
	@NotNull(message = "화장실 y좌표는 필수 입력값입니다")
	private Double y;
	@NotNull(message = "화장실 층수는 필수 입력값입니다")
	private Integer floor;
}
