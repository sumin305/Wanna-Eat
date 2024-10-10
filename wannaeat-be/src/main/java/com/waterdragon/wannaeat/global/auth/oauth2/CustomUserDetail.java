package com.waterdragon.wannaeat.global.auth.oauth2;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;

import lombok.ToString;

@ToString
public class CustomUserDetail implements UserDetails {
	private User user;

	public CustomUserDetail(User user) {
		this.user = user;
	}

	public User getUser() {
		return user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getPassword() {
		return "";
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	public long getId() {
		return user.getUserId();
	}

	public SocialType getSocialType() {
		return user.getSocialType();
	}
}
