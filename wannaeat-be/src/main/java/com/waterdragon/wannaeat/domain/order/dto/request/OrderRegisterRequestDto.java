package com.waterdragon.wannaeat.domain.order.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderRegisterRequestDto {

	private String reservationUrl;
	private Boolean prepareRequest;
}
