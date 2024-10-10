package com.waterdragon.wannaeat.domain.user.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserNicknameEditRequestDto {
	@NotNull(message = "닉네임은 필수 입력값입니다.")
	@Size(min = 1, max = 8, message = "닉네임은 8자 이하여야 합니다.")
	private String nickname;
}
