package com.waterdragon.wannaeat.domain.alarm.service;

import java.util.List;

import com.waterdragon.wannaeat.domain.alarm.dto.request.AlarmRegisterRequestDto;
import com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto;

public interface AlarmService {

	void registerAlarm(AlarmRegisterRequestDto alarmRegisterRequestDto);

	List<AlarmGetResponseDto> getListAlarmByUserId(Long userId);
}
