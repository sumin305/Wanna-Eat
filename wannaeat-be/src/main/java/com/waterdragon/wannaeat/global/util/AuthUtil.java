package com.waterdragon.wannaeat.global.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.global.auth.oauth2.CustomUserDetail;
import com.waterdragon.wannaeat.global.exception.error.NotAuthenticatedException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthUtil {

	private final UserRepository userRepository;

	public User getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication.getPrincipal() == "anonymousUser") {
			throw new NotAuthenticatedException("회원 정보가 없습니다.");
		}
		CustomUserDetail userDetails = (CustomUserDetail)authentication.getPrincipal();

		return userRepository.findByUserId(userDetails.getId())
			.orElseThrow(() -> new NotAuthenticatedException("회원 정보가 없습니다"));
	}

}
