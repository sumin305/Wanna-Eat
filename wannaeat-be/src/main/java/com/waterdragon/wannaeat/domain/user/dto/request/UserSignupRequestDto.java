package com.waterdragon.wannaeat.domain.user.dto.request;

import com.waterdragon.wannaeat.domain.user.domain.enums.Role;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserSignupRequestDto {
	@NotNull(message = "닉네임은 필수 입력값입니다.")
	@Size(min = 1, max = 8, message = "닉네임은 8자 이하여야 합니다.")
	private String nickname;

	@NotEmpty(message = "휴대폰 번호는 필수 입력값입니다.")
	@Size(min = 11, max = 11, message = "휴대폰 번호는 11자리여야 합니다.")
	private String phone;

	@NotNull(message = "권한은 널일 수 없습니다.")
	private Role role;

}
