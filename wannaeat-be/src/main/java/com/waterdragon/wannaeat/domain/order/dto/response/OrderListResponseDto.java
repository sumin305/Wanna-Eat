package com.waterdragon.wannaeat.domain.order.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderListResponseDto {
	List<OrderDetailResponseDto> orderDetailResponseDtos;
}
