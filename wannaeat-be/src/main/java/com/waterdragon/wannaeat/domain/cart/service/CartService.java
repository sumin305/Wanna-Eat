package com.waterdragon.wannaeat.domain.cart.service;

import com.waterdragon.wannaeat.domain.cart.dto.request.CartRegisterRequestDto;

public interface CartService {

	void registerCart(CartRegisterRequestDto cartRegisterRequestDto);
}
