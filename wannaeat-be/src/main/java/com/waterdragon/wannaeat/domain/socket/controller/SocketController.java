package com.waterdragon.wannaeat.domain.socket.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.socket.dto.response.ShareDataResponseDto;
import com.waterdragon.wannaeat.domain.socket.service.SocketService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SocketController {

	private final SocketService socketService;

	/**
	 * 공유 url 접속 시 모든 데이터(채팅, 장바구니) 불러오기 API
	 *
	 * @param reservationUrl 예약 url
	 * @return 모든 데이터 정보
	 */
	@Operation(summary = "공유 url 접속 시 모든 데이터(채팅, 장바구니) 불러오기 API")
	@GetMapping("/api/public/share-data/{reservationUrl}")
	public ResponseEntity<ResponseDto<ShareDataResponseDto>> getShareData(
		@PathVariable(name = "reservationUrl") String reservationUrl,
		@RequestParam(name = "chatPage", required = false) Long chatPage,
		@RequestParam(name = "chatSize", required = false) Long chatSize) {

		ShareDataResponseDto shareDataResponseDto = socketService.getShareData(reservationUrl, chatPage, chatSize);
		ResponseDto<ShareDataResponseDto> responseDto = ResponseDto.<ShareDataResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("해당 공유예약 url의 모든 정보가 성공적으로 조회되었습니다.")
			.data(shareDataResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);

	}
}
