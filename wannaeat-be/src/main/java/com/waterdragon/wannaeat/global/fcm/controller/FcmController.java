package com.waterdragon.wannaeat.global.fcm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.global.fcm.dto.request.FcmSendRequestDto;
import com.waterdragon.wannaeat.global.fcm.service.FcmService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FcmController {

	private final FcmService fcmService;

	@Operation(summary = "FCM 전송 API")
	@PostMapping("/public/fcm")
	public ResponseEntity<ResponseDto<Void>> sendFcm(
		@Valid @RequestBody FcmSendRequestDto fcmSendRequestDto) {

		fcmService.sendFcmNotification(fcmSendRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("전송완료.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
