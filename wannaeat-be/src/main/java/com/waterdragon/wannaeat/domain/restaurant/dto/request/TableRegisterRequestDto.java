package com.waterdragon.wannaeat.domain.restaurant.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TableRegisterRequestDto {

	@NotEmpty(message = "아이템 id(UUID)는 필수 입력값입니다.")
	private String itemId;

	@NotEmpty(message = "아이템 타입은 필수 입력값입니다. (COUNTER, RESTROOM, ENTRANCE, KITCHEN, SQUARE, ROUNDED")
	private String itemType;

	@NotNull(message = "x 좌표는 필수 입력값입니다.")
	private Double x;

	@NotNull(message = "y 좌표는 필수 입력값입니다.")
	private Double y;

	@NotNull(message = "층수는 필수 입력값입니다.")
	private Integer floor;

	// 테이블 타입일 때만 필요한 필드들
	@NotNull(message = "테이블 id는 필수 입력값입니다.")
	private Integer tableId;
	@NotNull(message = "좌석 수는 필수 입력값입니다.")
	private Integer assignedSeats;
}
