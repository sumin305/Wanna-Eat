package com.waterdragon.wannaeat.domain.alarm.service;

import com.waterdragon.wannaeat.domain.alarm.dto.request.AlarmRegisterRequestDto;
import com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto;

import java.util.List;

public interface AlarmService {

	void registerAlarm(AlarmRegisterRequestDto alarmRegisterRequestDto);

	List<AlarmGetResponseDto> getListAlarmByUserId(Long userId);
}
