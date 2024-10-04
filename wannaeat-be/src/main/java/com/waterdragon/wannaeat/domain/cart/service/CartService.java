package com.waterdragon.wannaeat.domain.cart.service;

import com.waterdragon.wannaeat.domain.cart.dto.request.CartClearRequestDto;
import com.waterdragon.wannaeat.domain.cart.dto.request.CartDeleteRequestDto;
import com.waterdragon.wannaeat.domain.cart.dto.request.CartRegisterRequestDto;
import com.waterdragon.wannaeat.domain.cart.dto.response.CartDetailResponseDto;

public interface CartService {

	void registerCart(CartRegisterRequestDto cartRegisterRequestDto);

	CartDetailResponseDto getDetailCartByReservationUrl(String reservationUrl);

	void deleteCart(CartDeleteRequestDto cartDeleteRequestDto);

	void clearCart(CartClearRequestDto cartClearRequestDto);

	void removeCart(String reservationUrl); // 테스트용
}
