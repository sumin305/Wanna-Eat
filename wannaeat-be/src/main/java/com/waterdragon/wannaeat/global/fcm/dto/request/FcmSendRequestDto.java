package com.waterdragon.wannaeat.global.fcm.dto.request;

import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.MoveCategory;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FcmSendRequestDto {

	@NotNull(message = "fcm 토큰은 필수 입력값입니다.")
	private String token;

	@NotNull(message = "알림 타입은 널일 수 없습니다.")
	private AlarmType alarmType;

	@NotNull(message = "이동 카테고리는 널일 수 없습니다.")
	private MoveCategory moveCategory;

	@NotNull(message = "이동 카테고리 아이디는 널일 수 없습니다.")
	private Long moveCategoryId;

}
