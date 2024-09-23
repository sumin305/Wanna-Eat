package com.waterdragon.wannaeat.domain.user.dto.response;

import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDetailResponseDto {
	private long userId;
	private String email;
	private String nickname;
	private String phone;
	private Role role;
	private SocialType socialType;
}

