package com.waterdragon.wannaeat.domain.alarm.service;

import com.waterdragon.wannaeat.domain.alarm.dto.request.AlarmRegisterRequestDto;

public interface AlarmService {

	void registerAlarm(AlarmRegisterRequestDto alarmRegisterRequestDto);
}
