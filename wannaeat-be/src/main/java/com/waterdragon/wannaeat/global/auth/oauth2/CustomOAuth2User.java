package com.waterdragon.wannaeat.global.auth.oauth2;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;

import lombok.Getter;

/**
 * DefaultOAuth2User를 상속하고, email과 socialType, role 필드를 추가로 가진다.
 */
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

	private String email;
	private SocialType socialType;
	private Role role;
	private Restaurant restaurant;

	/**
	 * Constructs a {@code DefaultOAuth2User} using the provided parameters.
	 *
	 * @param authorities      the authorities granted to the user
	 * @param attributes       the attributes about the user
	 * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
	 *                         {@link #getAttributes()}
	 */
	public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
		Map<String, Object> attributes, String nameAttributeKey,
		String email, SocialType socialType, Role role, Restaurant restaurant) {
		super(authorities, attributes, nameAttributeKey);
		this.email = email;
		this.socialType = socialType;
		this.role = role;
		this.restaurant = restaurant;
	}
}
