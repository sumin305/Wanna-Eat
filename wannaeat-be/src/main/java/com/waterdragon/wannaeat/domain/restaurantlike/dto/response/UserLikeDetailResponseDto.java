package com.waterdragon.wannaeat.domain.restaurantlike.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLikeDetailResponseDto {

	private Long restaurantId;
	private String restaurantName;
	private String restaurantDescription;

	private String restaurantImageUrl;

	private boolean restaurantLike;

	private int userReservationCnt;
}
