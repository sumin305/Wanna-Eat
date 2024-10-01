package com.waterdragon.wannaeat.domain.alarm.dto.response;

import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlarmGetResponseDto {

    private String alarmType;
    private Long reservationId;
    private String menuName;
    private String imageUrl;
    private int memberCnt;  // 예약 인원 추가
    private String registTime;

    public AlarmGetResponseDto(AlarmType alarmType, Long reservationId, String menuName, String imageUrl, int memberCnt, LocalDateTime registTime) {
        this.alarmType = alarmType.name();
        this.reservationId = reservationId;
        this.menuName = menuName;
        this.imageUrl = imageUrl;
        this.memberCnt = memberCnt;

        // LocalDateTime을 원하는 형식으로 String 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.registTime = registTime.format(formatter);
    }
}
