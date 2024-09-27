package com.waterdragon.wannaeat.domain.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "user_tokens")
public class UserToken {

	@Id
	@Column(name = "user_id")
	private Long userId;

	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
	private User user;

	@Column(name = "refresh_token")
	private String refreshToken;

	@Column(name = "fcm_token")
	private String fcmToken;

	public void editRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public void editFcmToken(String fcmToken) {
		this.fcmToken = fcmToken;
	}

	public void removeFcmToken(){
		this.fcmToken = null;
	}
}
