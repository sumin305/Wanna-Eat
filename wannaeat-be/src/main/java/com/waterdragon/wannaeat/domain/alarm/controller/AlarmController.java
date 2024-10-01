package com.waterdragon.wannaeat.domain.alarm.controller;

import com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto;
import com.waterdragon.wannaeat.domain.alarm.service.AlarmService;
import com.waterdragon.wannaeat.global.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarms")
public class AlarmController {

    private final AlarmService alarmService;
    private final AuthUtil authUtil;

    @GetMapping("")
    public List<AlarmGetResponseDto> getListAlarmByUserId() {
        return alarmService.getListAlarmByUserId(authUtil.getAuthenticatedUser().getUserId());
    }
}
