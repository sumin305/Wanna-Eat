package com.waterdragon.wannaeat.domain.order.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderServeRequestDto {
	private List<Integer> orderIdList;
}
