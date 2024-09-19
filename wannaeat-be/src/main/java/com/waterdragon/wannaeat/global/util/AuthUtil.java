package com.waterdragon.wannaeat.global.util;

import org.springframework.stereotype.Component;

import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthUtil {

	private final UserRepository userRepository;

	public User getAuthenticatedUser() {
		return userRepository.findByUserIdAndDeletedFalse((long)1).get();
	}
}
