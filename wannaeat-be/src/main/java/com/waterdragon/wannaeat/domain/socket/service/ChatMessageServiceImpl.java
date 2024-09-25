package com.waterdragon.wannaeat.domain.socket.service;

import java.time.LocalDateTime;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationParticipantNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationParticipantRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.socket.domain.ChatMessage;
import com.waterdragon.wannaeat.domain.socket.domain.enums.SocketType;
import com.waterdragon.wannaeat.domain.socket.dto.request.ChatMessageRegisterRequestDto;
import com.waterdragon.wannaeat.domain.socket.dto.response.ChatMessageRegisterResponseDto;
import com.waterdragon.wannaeat.domain.socket.repository.ChatMessageRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

	private final ChatMessageRepository chatMessageRepository;
	private final SimpMessageSendingOperations sendingOperations;
	private final ReservationRepository reservationRepository;
	private final ReservationParticipantRepository reservationParticipantRepository;

	/**
	 * 채팅 메시지 전송 메소드
	 *
	 * @param chatMessageRegisterRequestDto 채팅 전송 요청 정보
	 * @return ChatMessageRegisterResponseDto 채팅 전송 응답 정보 (작성 시간 추가)
	 */
	@Override
	@Transactional
	public void registerChatMessage(
		ChatMessageRegisterRequestDto chatMessageRegisterRequestDto) {

		// url 유효성 확인
		Reservation reservation = reservationRepository.findByReservationUrl(
				chatMessageRegisterRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 url의 예약이 존재하지 않습니다. reservationId : " + chatMessageRegisterRequestDto.getReservationUrl()));

		// reservationParticipantId 유효성 확인
		ReservationParticipant reservationParticipant = reservationParticipantRepository.findByReservationParticipantId(
				chatMessageRegisterRequestDto.getSenderReservationParticipantId())
			.orElseThrow(() -> new ReservationParticipantNotFoundException(
				"해당 id의 예약 참가자가 존재하지 않습니다. : reservationParticipantId"
					+ chatMessageRegisterRequestDto.getSenderReservationParticipantId()));

		// 채팅 메시지 저장
		ChatMessage chatMessage = ChatMessage.builder()
			.reservationId(reservation.getReservationId())
			.senderReservationParticipantId(reservationParticipant.getReservationParticipantId())
			.content(chatMessageRegisterRequestDto.getContent())
			.registerTime(LocalDateTime.now()) // 현재 등록 시간으로 작성
			.build();
		chatMessageRepository.save(chatMessage);

		// 채팅 메시지 응답객체 생성
		ChatMessageRegisterResponseDto chatMessageRegisterResponseDto = ChatMessageRegisterResponseDto.builder()
			.socketType(SocketType.CHAT)
			.senderReservationParticipantId(chatMessage.getSenderReservationParticipantId())
			.senderReservationParticipantNickname(reservationParticipant.getReservationParticipantNickName())
			.content(chatMessage.getContent())
			.registerTime(chatMessage.getRegisterTime())
			.build();

		System.out.println(chatMessageRegisterResponseDto);

		// /topic/reservations/{reservationUrl}을 구독 중인 모든 사용자에게 뿌려줌.
		sendingOperations.convertAndSend("/topic/reservations/" + reservation.getReservationUrl(),
			chatMessageRegisterResponseDto);
	}
}
