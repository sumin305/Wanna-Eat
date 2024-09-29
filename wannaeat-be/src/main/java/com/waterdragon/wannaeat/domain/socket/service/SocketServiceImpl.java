package com.waterdragon.wannaeat.domain.socket.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.chatmessage.dto.response.ChatMessageListResponseDto;
import com.waterdragon.wannaeat.domain.chatmessage.service.ChatMessageService;
import com.waterdragon.wannaeat.domain.socket.dto.response.ShareDataResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SocketServiceImpl implements SocketService {

	private final ChatMessageService chatMessageService;

	/**
	 * 공유 url 접속 시 모든 데이터(채팅, 장바구니) 불러오기 메소드
	 *
	 * @param reservationUrl 예약 url
	 * @return 모든 데이터 정보
	 */
	@Override
	public ShareDataResponseDto getShareData(String reservationUrl, Long chatSize, Long chatPage) {

		// 페이징 처리된 채팅 메시지 가져오기
		ChatMessageListResponseDto chatMessageListResponseDto = chatMessageService.getListChatMessage(
			reservationUrl, chatSize, chatPage);

		return ShareDataResponseDto.builder()
			.chatMessageDetailResponseDtos(chatMessageListResponseDto)
			.build();
	}
}
