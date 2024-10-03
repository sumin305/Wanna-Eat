package com.waterdragon.wannaeat.domain.user.domain;

import java.util.List;

import com.waterdragon.wannaeat.domain.alarm.domain.Alarm;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurantlike.domain.RestaurantLike;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;
import com.waterdragon.wannaeat.domain.user.dto.request.UserEditRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserSignupRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "nickname")
	private String nickname;

	@Column(name = "phone")
	private String phone;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(name = "social_type", nullable = false)
	private SocialType socialType;

	@Column(name = "deleted", nullable = false)
	private boolean deleted = Boolean.FALSE;

	@OneToOne(mappedBy = "user")
	private UserToken userToken;

	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
	private Restaurant restaurant;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Alarm> alarms;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Reservation> reservations;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<RestaurantLike> restaurantLikes;

	public void edit(UserSignupRequestDto userSignupRequestDto) {
		this.nickname = userSignupRequestDto.getNickname();
		this.phone = userSignupRequestDto.getPhone();
		this.role = userSignupRequestDto.getRole();
	}

	public void edit(UserEditRequestDto userEditRequestDto) {
		this.nickname = userEditRequestDto.getNickname();
	}
}