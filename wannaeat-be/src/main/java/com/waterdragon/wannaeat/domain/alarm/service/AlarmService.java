package com.waterdragon.wannaeat.domain.alarm.service;

import java.util.List;

import com.waterdragon.wannaeat.domain.alarm.domain.Alarm;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto;
import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;

public interface AlarmService {

	Alarm registerAlarm(Reservation reservation, AlarmType alarmType);

	Alarm registerAlarm(Reservation reservation, Menu menu, AlarmType alarmType);

	List<AlarmGetResponseDto> getListAlarmByUserId(Long userId);
}
