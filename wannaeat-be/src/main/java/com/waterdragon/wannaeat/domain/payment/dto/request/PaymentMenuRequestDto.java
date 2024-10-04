package com.waterdragon.wannaeat.domain.payment.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMenuRequestDto {

	@NotNull
	private Long menuId;
	@NotNull
	private Long orderId;
	@NotNull
	private Integer menuCount;
}
