package com.waterdragon.wannaeat.domain.alarm.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.alarm.domain.Alarm;
import com.waterdragon.wannaeat.domain.alarm.domain.repository.AlarmRepository;
import com.waterdragon.wannaeat.domain.alarm.dto.request.AlarmRegisterRequestDto;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.global.fcm.service.FcmService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

	private final UserRepository userRepository;
	private final AlarmRepository alarmRepository;
	private final FcmService fcmService;

	@Override
	public void registerAlarm(AlarmRegisterRequestDto alarmRegisterRequestDto) {
		Alarm alarm = alarmRepository.save(Alarm.builder()
			.user(userRepository.findByUserId(alarmRegisterRequestDto.getUserId()).get())
			.type(alarmRegisterRequestDto.getAlarmType())
			.message(alarmRegisterRequestDto.getMessage())
			.moveCategory(alarmRegisterRequestDto.getMoveCategory())
			.moveCategoryId(alarmRegisterRequestDto.getMoveCategoryId())
			.build());

		// String token = alarm.getUser().getUserToken().getFcmToken();
		// if (token != null && !token.isEmpty()) {
		// 	fcmService.sendFcmNotification(FcmSendRequestDto.builder()
		// 		.token(token)
		// 		.alarmType(alarm.getType())
		// 		.moveCategory(alarm.getMoveCategory())
		// 		.moveCategoryId(alarm.getMoveCategoryId())
		// 		.build());
		// }
	}
}
