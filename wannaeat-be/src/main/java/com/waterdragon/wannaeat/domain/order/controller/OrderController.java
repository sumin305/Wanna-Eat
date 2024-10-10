package com.waterdragon.wannaeat.domain.order.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.order.dto.request.OrderRegisterRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderServeRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderServeResponseDto;
import com.waterdragon.wannaeat.domain.order.service.OrderService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
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

	/**
	 * 서빙 처리 요청 API
	 *
	 * @param orderServeRequestDto 서빙할 주문 ID 리스트가 담긴 요청 객체
	 * @return ResponseDto<OrderServeResponseDto> 서빙 처리 결과를 담은 응답 객체
	 */
	@Operation(summary = "서빙 처리 요청 API")
	@PostMapping("/api/reservation/{reservationId}/orders/serve")
	public ResponseEntity<ResponseDto<OrderServeResponseDto>> serveOrder(
		@Valid @RequestBody OrderServeRequestDto orderServeRequestDto,
		@PathVariable Long reservationId) {

		// 서빙 처리 후 결과를 반환
		OrderServeResponseDto orderServeResponseDto = orderService.serveOrder(reservationId, orderServeRequestDto);

		// 응답 객체 생성
		ResponseDto<OrderServeResponseDto> responseDto = ResponseDto.<OrderServeResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("서빙이 성공적으로 처리되었습니다.")
			.data(orderServeResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
