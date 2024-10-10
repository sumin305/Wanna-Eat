package com.waterdragon.wannaeat.domain.cart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.cart.dto.request.CartClearRequestDto;
import com.waterdragon.wannaeat.domain.cart.dto.request.CartDeleteRequestDto;
import com.waterdragon.wannaeat.domain.cart.dto.request.CartRegisterRequestDto;
import com.waterdragon.wannaeat.domain.cart.service.CartService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
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

	/**
	 * 장바구니 메뉴 휴지통 API
	 *
	 * @param cartDeleteRequestDto
	 */
	@MessageMapping("/carts/delete")
	public void deleteCart(CartDeleteRequestDto cartDeleteRequestDto) {

		cartService.deleteCart(cartDeleteRequestDto);
	}

	@MessageMapping("/carts/clear")
	public void clearCart(CartClearRequestDto cartClearRequestDto) {

		cartService.clearCart(cartClearRequestDto);
	}

	/**
	 * 장바구니 삭제 API
	 *
	 * @param reservationUrl
	 * @return
	 */
	@Operation(summary = "장바구니 삭제 API")
	@DeleteMapping("/api/public/carts/{reservationUrl}")
	public ResponseEntity<ResponseDto<Void>> removeCart(@PathVariable(name = "reservationUrl") String reservationUrl) {

		cartService.removeCart(reservationUrl);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("장바구니가 성공적으로 삭제되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}
}
