package com.waterdragon.wannaeat.domain.user.domain.enums;

import lombok.Getter;

@Getter
public enum SocialType {

	KAKAO, GOOGLE;

	// String 값을 바탕으로 SocialType을 반환하는 메서드
	public static SocialType fromString(String value) {
		// Enum의 모든 값들 중에서 일치하는 값을 찾음
		for (SocialType type : SocialType.values()) {
			if (type.name().equalsIgnoreCase(value)) {
				return type;
			}
		}
		// 일치하는 값이 없으면 예외를 던지거나 null을 반환할 수 있음
		throw new IllegalArgumentException("No enum constant " + value);
	}

}