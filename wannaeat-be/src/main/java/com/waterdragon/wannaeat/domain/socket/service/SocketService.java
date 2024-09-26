package com.waterdragon.wannaeat.domain.socket.service;

import com.waterdragon.wannaeat.domain.socket.dto.response.ShareDataResponseDto;

public interface SocketService {

	ShareDataResponseDto getShareData(String reservationUrl, Long chatPage, Long chatSize);
}
