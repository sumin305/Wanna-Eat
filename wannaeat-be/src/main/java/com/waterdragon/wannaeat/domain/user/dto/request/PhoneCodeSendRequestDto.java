package com.waterdragon.wannaeat.domain.user.dto.request;

import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PhoneCodeSendRequestDto {
	@NotNull(message = "가입 플랫폼은 널일 수 없습니다.")
	private SocialType socialType;

	@NotEmpty(message = "휴대폰 번호는 필수 입력값입니다.")
	@Size(min = 11, max = 11, message = "휴대폰 번호는 11자리여야 합니다.")
	private String phone;
}
