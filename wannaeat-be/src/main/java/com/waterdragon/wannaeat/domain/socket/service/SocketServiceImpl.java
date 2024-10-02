package com.waterdragon.wannaeat.domain.socket.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.cart.dto.response.CartDetailResponseDto;
import com.waterdragon.wannaeat.domain.cart.service.CartService;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.service.ChatMessageService;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderListResponseDto;
import com.waterdragon.wannaeat.domain.order.service.OrderService;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.socket.dto.response.ShareDataResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SocketServiceImpl implements SocketService {

	private final ChatMessageService chatMessageService;
	private final CartService cartService;
	private final ReservationRepository reservationRepository;
	private final OrderService orderService;

	/**
	 * 공유 url 접속 시 모든 데이터(채팅, 장바구니) 불러오기 메소드
	 *
	 * @param reservationUrl 예약 url
	 * @return 모든 데이터 정보
	 */
	@Override
	public ShareDataResponseDto getShareData(String reservationUrl, Long chatSize, Long chatPage) {

		Reservation reservation = reservationRepository.findByReservationUrl(reservationUrl)
			.orElseThrow(
				() -> new ReservationNotFoundException("해당 reservation이 존재하지 않습니다. reservationUrl=" + reservationUrl));

		// 페이징 처리된 채팅 메시지 가져오기
		ChatMessageListResponseDto chatMessageListResponseDto = chatMessageService.getListChatMessage(
			reservationUrl, chatSize, chatPage);

		// 장바구니 가져오기
		CartDetailResponseDto cartDetailResponseDto = cartService.getDetailCartByReservationUrl(reservationUrl);

		// 주문서 가져오기
		OrderListResponseDto orderListResponseDto = orderService.getListOrderByReservationUrl(reservationUrl);

		return ShareDataResponseDto.builder()
			.reservationDate(reservation.getReservationDate())
			.reservationStartTime(reservation.getStartTime())
			.reservationEndTime(reservation.getEndTime())
			.chatMessageListResponseDto(chatMessageListResponseDto)
			.cartDetailResponseDto(cartDetailResponseDto)
			.orderListResponseDto(orderListResponseDto)
			.build();
	}
}
