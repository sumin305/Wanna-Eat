package com.waterdragon.wannaeat.domain.restaurant.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TableRegisterRequestDto {

	@NotNull(message = "테이블 번호는 필수 입력값입니다.")
	private Integer tableId;
	@NotNull(message = "테이블 인원 수는 필수 입력값입니다.")
	private Integer assignedSeats;
	@NotNull(message = "테이블 x좌표는 필수 입력값입니다.")
	private Double x;
	@NotNull(message = "테이블 y좌표는 필수 입력값입니다.")
	private Double y;
	@NotNull(message = "테이블 층수는 필수 입력값입니다.")
	private Integer floor;
}
