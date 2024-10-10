package com.waterdragon.wannaeat.domain.chatmessage.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.chatmessage.domain.ChatMessage;
import com.waterdragon.wannaeat.domain.chatmessage.dto.request.ChatMessageRegisterRequestDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageDetailResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageRegisterResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.exception.error.ChatMessageParameterException;
import com.waterdragon.wannaeat.domain.chatmessage.repository.ChatMessageRepository;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationParticipantNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationParticipantRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.socket.domain.enums.SocketType;

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
			.senderReservationParticipantNickname(reservationParticipant.getReservationParticipantNickName())
			.content(chatMessageRegisterRequestDto.getContent())
			.registerTime(LocalDateTime.now()) // 현재 등록 시간으로 작성
			.build();
		ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

		// 채팅 메시지 응답객체 생성
		ChatMessageRegisterResponseDto chatMessageRegisterResponseDto = ChatMessageRegisterResponseDto.builder()
			.socketType(SocketType.CHAT)
			.reservationId(chatMessage.getReservationId())
			.senderReservationParticipantId(chatMessage.getSenderReservationParticipantId())
			.senderReservationParticipantNickname(reservationParticipant.getReservationParticipantNickName())
			.content(chatMessage.getContent())
			.registerTime(chatMessage.getRegisterTime())
			.build();

		sendingOperations.convertAndSend("/topic/reservations/" + reservation.getReservationUrl(),
			chatMessageRegisterResponseDto);
	}

	/**
	 * 해당 reservationUrl의 모든 채팅 메시지 목록 불러오기 메소드
	 *
	 * @param reservationUrl 예약 url
	 * @return 채팅 목록
	 */
	@Override
	public ChatMessageListResponseDto getListChatMessage(String reservationUrl, Long chatPage, Long chatSize) {

		if (chatSize == null || chatPage == null || chatSize <= 0 || chatPage < 0) {
			throw new ChatMessageParameterException("chatSize는 0보다 커야 하고, chatPage는 0 이상이어야 합니다.");
		}

		Reservation reservation = reservationRepository.findByReservationUrl(reservationUrl)
			.orElseThrow(() -> new ReservationNotFoundException("해당 url의 예약이 존재하지 않습니다. url : " + reservationUrl));

		Pageable pageable = PageRequest.of(chatPage.intValue(), chatSize.intValue());

		Page<ChatMessage> chatMessagesPage = chatMessageRepository.findAllByReservationIdOrderByRegisterTimeDesc(
			reservation.getReservationId(), pageable);

		Page<ChatMessageDetailResponseDto> chatMessageDetailResponseDtos = chatMessagesPage.map(chatMessage ->
			ChatMessageDetailResponseDto.builder()
				.reservationId(chatMessage.getReservationId())
				.senderReservationParticipantId(chatMessage.getSenderReservationParticipantId())
				.senderReservationParticipantNickname(chatMessage.getSenderReservationParticipantNickname())
				.content(chatMessage.getContent())
				.registerTime(chatMessage.getRegisterTime())
				.build()
		);

		// ChatMessageListResponseDto로 반환
		return ChatMessageListResponseDto.builder()
			.chatMessageDetailResponseDtos(chatMessageDetailResponseDtos)
			.build();
	}
}

