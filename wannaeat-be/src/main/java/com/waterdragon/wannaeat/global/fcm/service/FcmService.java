package com.waterdragon.wannaeat.global.fcm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.AndroidNotification;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.waterdragon.wannaeat.global.fcm.dto.request.FcmSendRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FcmService {

	@Value("${redirectURL}")
	private String REDIRECT_URL;

	public void sendFcmNotification(FcmSendRequestDto fcmSendRequestDto) {
		Message message = Message.builder()
			.setToken(fcmSendRequestDto.getToken())
			.setNotification(Notification.builder()
				.setTitle(fcmSendRequestDto.getAlarmType().getKey())
				.setBody("[머물래] " + fcmSendRequestDto.getAlarmType().getKey())
				.build())
			.setAndroidConfig(
				AndroidConfig.builder()
					.setNotification(
						AndroidNotification.builder()
							.setTitle(fcmSendRequestDto.getAlarmType().getKey())
							.setBody("[머물래] " + fcmSendRequestDto.getAlarmType().getKey())
							.setClickAction(REDIRECT_URL + "/" + fcmSendRequestDto.getMoveCategory().getKey() + "/"
								+ fcmSendRequestDto.getMoveCategoryId())
							.build()
					).build()
			).build();
		try {
			FirebaseMessaging.getInstance().send(message);
		} catch (FirebaseMessagingException exception) {
			log.error("Fcm 메시지 전송 실패 : {}", exception.getMessage());
			throw new RuntimeException(exception);
		}
	}
}
