package com.waterdragon.wannaeat.domain.socket.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.waterdragon.wannaeat.domain.cart.dto.response.CartDetailResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderListResponseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShareDataResponseDto {

	private LocalDate reservationDate;
	private LocalTime reservationStartTime;
	private LocalTime reservationEndTime;
	private ChatMessageListResponseDto chatMessageListResponseDto;
	private CartDetailResponseDto cartDetailResponseDto;
	private OrderListResponseDto orderListResponseDto;
}
