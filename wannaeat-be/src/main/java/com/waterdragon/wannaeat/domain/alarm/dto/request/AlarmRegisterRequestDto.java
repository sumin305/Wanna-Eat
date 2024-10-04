package com.waterdragon.wannaeat.domain.alarm.dto.request;

import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.MoveCategory;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class AlarmRegisterRequestDto {

	@NotNull(message = "유저 아이디는 필수 입력값입니다.")
	private Long userId;

	@NotNull(message = "알림 타입은 널일 수 없습니다.")
	private AlarmType alarmType;

	@NotNull(message = "상대방 권한은 널일 수 없습니다.")
	private Role opponentType;

	@NotEmpty(message = "내용은 필수 입력값입니다.")
	private String message;

	@NotNull(message = "이동 카테고리는 널일 수 없습니다.")
	private MoveCategory moveCategory;

	@NotNull(message = "이동 카테고리 아이디는 널일 수 없습니다.")
	private Long moveCategoryId;

}
