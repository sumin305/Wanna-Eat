package com.waterdragon.wannaeat.domain.order.service;

import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderRegisterRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderServeRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderListResponseDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderServeResponseDto;

public interface OrderService {

	void editOrderPaidCnt(OrderPaidCntEditRequestDto orderPaidCntEditRequestDto);

	void registerOrder(OrderRegisterRequestDto orderRegisterRequestDto);

	OrderListResponseDto getListOrderByReservationUrl(String reservationUrl);

	OrderServeResponseDto serveOrder(Long reservationId, OrderServeRequestDto orderServeRequestDto);
}
