package com.waterdragon.wannaeat.domain.order.service;

import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderRegisterRequestDto;

public interface OrderService {

	void editOrderPaidCnt(OrderPaidCntEditRequestDto orderPaidCntEditRequestDto);

	void registerOrder(OrderRegisterRequestDto orderRegisterRequestDto);
}
