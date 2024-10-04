package com.waterdragon.wannaeat.domain.user.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FcmTokenEditRequestDto {
	@NotNull(message = "토큰은 필수 입력값입니다.")
	private String fcmToken;

}
