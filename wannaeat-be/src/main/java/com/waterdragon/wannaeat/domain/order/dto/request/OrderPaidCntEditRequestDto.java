package com.waterdragon.wannaeat.domain.order.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderPaidCntEditRequestDto {

	@NotNull
	Long orderId;
	@NotNull
	Integer paidMenuCnt;
}
