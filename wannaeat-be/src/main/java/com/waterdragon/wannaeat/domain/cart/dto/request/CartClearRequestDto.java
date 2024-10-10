package com.waterdragon.wannaeat.domain.cart.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartClearRequestDto {

	@NotEmpty
	private String reservationUrl;
	@NotNull
	private Long reservationParticipantId;

}
