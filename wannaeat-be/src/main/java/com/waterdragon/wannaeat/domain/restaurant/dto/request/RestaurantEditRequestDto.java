package com.waterdragon.wannaeat.domain.restaurant.dto.request;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantEditRequestDto {

	@NotEmpty(message = "사업자 번호는 필수 입력값입니다.")
	private String restaurantBusinessNumber;

	@NotEmpty(message = "매장 주인은 필수 입력값입니다.")
	private String restaurantOwnerName;

	@NotEmpty(message = "매장 주소는 필수 입력값입니다.")
	private String restaurantAddress;

	@NotEmpty(message = "매장 번호는 필수 입력값입니다.")
	@Size(min = 9, max = 11, message = "매장 번호는 9자리 이상, 11자리 이하여야 합니다.")
	private String restaurantPhone;

	@NotEmpty(message = "매장 이름은 필수 입력값입니다.")
	private String restaurantName;

	@NotNull(message = "매장 카테고리 id는 필수 입력값입니다.")
	private Long restaurantCategoryId;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private LocalTime restaurantOpenTime;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private LocalTime restaurantCloseTime;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private LocalTime breakStartTime;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private LocalTime breakEndTime;

	private Integer maxReservationTime;

	private Integer minMemberCount;

	private Integer maxMemberCount;

	private Integer depositPerMember;

	private String restaurantDescription;

	private Double latitude;

	private Double longitude;
}
