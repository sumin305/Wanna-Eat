package com.waterdragon.wannaeat.domain.alarm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.alarm.domain.Alarm;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto;
import com.waterdragon.wannaeat.domain.alarm.repository.AlarmRepository;
import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

	private final AlarmRepository alarmRepository;

	@Override
	public Alarm registerAlarm(Reservation reservation, AlarmType alarmType) {
		return alarmRepository.save(Alarm.builder()
			.user(reservation.getRestaurant().getUser())
			.menu(null)
			.reservation(reservation)
			.type(alarmType)
			.build());
	}

	@Override
	public Alarm registerAlarm(Reservation reservation, Menu menu, AlarmType alarmType) {
		return alarmRepository.save(Alarm.builder()
			.user(reservation.getRestaurant().getUser())
			.menu(menu)
			.reservation(reservation)
			.type(alarmType)
			.build());
	}

	@Override
	public List<AlarmGetResponseDto> getListAlarmByUserId(Long userId) {
		return alarmRepository.findAlarmsByUserId(userId);
	}
}
