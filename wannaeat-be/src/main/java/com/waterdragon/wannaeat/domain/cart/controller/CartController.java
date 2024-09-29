package com.waterdragon.wannaeat.domain.cart.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.cart.dto.request.CartRegisterRequestDto;
import com.waterdragon.wannaeat.domain.cart.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CartController {

	private final CartService cartService;

	/**
	 * 장바구니 등록 API
	 *
	 * @param cartRegisterRequestDto
	 */
	@MessageMapping("/carts/register")
	public void registerCart(CartRegisterRequestDto cartRegisterRequestDto) {

		cartService.registerCart(cartRegisterRequestDto);
	}
}
