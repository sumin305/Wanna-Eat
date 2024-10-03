package com.waterdragon.wannaeat.domain.order.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.order.dto.request.OrderRegisterRequestDto;
import com.waterdragon.wannaeat.domain.order.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderController {

	private final OrderService orderService;

	/**
	 * 장바구니 -> 주문서 주문하기 소켓 API
	 *
	 * @param orderRegisterRequestDto
	 */
	@MessageMapping("/orders/register")
	public void registerOrder(OrderRegisterRequestDto orderRegisterRequestDto) {

		orderService.registerOrder(orderRegisterRequestDto);
	}

}
