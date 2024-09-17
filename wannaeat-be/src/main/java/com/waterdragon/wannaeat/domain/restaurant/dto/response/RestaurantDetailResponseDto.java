package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import java.time.LocalTime;

import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantDetailResponseDto {

	private String restaurantBusinessNumber;

	private String restaurantOwnerName;

	private String restaurantAddress;

	private String restaurantPhone;

	private String restaurantName;

	private String restaurantCategoryName;

	private LocalTime restaurantOpenTime;

	private LocalTime restaurantCloseTime;

	private LocalTime breakStartTime;

	private LocalTime breakEndTime;

	private Integer maxReservationTime;

	private Integer minMemberCount;

	private Integer maxMemberCount;

	private Integer depositPerMember;

	private String restaurantDescription;

	private Double latitude;

	private Double longitude;

	private MenuListResponseDto menuListResponseDto;
}
