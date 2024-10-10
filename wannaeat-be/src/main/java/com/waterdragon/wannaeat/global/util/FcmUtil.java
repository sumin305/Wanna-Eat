package com.waterdragon.wannaeat.global.util;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.AndroidNotification;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;
import com.waterdragon.wannaeat.domain.user.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FcmUtil {

	public void sendFcm(User user, AlarmType alarmType) {
		if (user == null || user.getUserToken().getFcmToken() == null) {
			return;
		}

		log.info(user.getUserToken().getFcmToken());
		Message message = Message.builder()
			.setToken(user.getUserToken().getFcmToken())
			.setNotification(Notification.builder()
				.setTitle("[머물래] " + alarmType.getKey())
				.setBody(alarmType.getMessage())
				.build())
			.setAndroidConfig(
				AndroidConfig.builder()
					.setNotification(
						AndroidNotification.builder()
							.setTitle("[머물래] " + alarmType.getKey())
							.setBody(alarmType.getMessage())
							.setPriority(AndroidNotification.Priority.HIGH)
							.build()
					).build()
			).build();
		try {
			FirebaseMessaging.getInstance().send(message);
		} catch (FirebaseMessagingException exception) {
			log.error("Fcm 메시지 전송 실패 : {}", exception.getMessage());
			// throw new RuntimeException(exception);
		}
	}

	public void sendFcm(User user, Reservation reservation, AlarmType alarmType) {
		if (user == null || user.getUserToken().getFcmToken() == null) {
			return;
		}

		Integer tableId = reservation.getReservationTables().get(0).getTableId();
		// 테이블 번호들을 추출하여 문자열로 변환
		List<Integer> tableIds = reservation.getReservationTables().stream()
			.map(ReservationTable::getTableId)
			.toList();

		// 테이블 번호를 콤마로 구분된 문자열로 변환
		String tableNumbers = tableIds.stream()
			.map(String::valueOf)
			.collect(Collectors.joining(", "));

		Message message = Message.builder()
			.setToken(user.getUserToken().getFcmToken())
			.setNotification(Notification.builder()
				.setTitle("[머물래] " + alarmType.getKey())
				.setBody(tableNumbers + alarmType.getMessage()) // 테이블 번호 추가
				.build())
			.setAndroidConfig(
				AndroidConfig.builder()
					.setNotification(
						AndroidNotification.builder()
							.setTitle("[머물래] " + alarmType.getKey())
							.setBody(tableNumbers + alarmType.getMessage())
							.build()
					).build()
			).build();
		try {
			FirebaseMessaging.getInstance().send(message);
		} catch (FirebaseMessagingException exception) {
			log.error("Fcm 메시지 전송 실패 : {}", exception.getMessage());
			// throw new RuntimeException(exception);
		}
	}

}
