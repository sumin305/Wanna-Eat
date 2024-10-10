package com.waterdragon.wannaeat.domain.cart.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartDeleteRequestDto {

	@NotEmpty
	private String reservationUrl;
	@NotNull
	private Long reservationParticipantId;
	@NotNull
	private Long menuId;
}
