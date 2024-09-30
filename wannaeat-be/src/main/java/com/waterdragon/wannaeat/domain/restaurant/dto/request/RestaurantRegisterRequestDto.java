package com.waterdragon.wannaeat.domain.restaurant.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class RestaurantRegisterRequestDto {

	@NotEmpty(message = "사업자 번호는 필수 입력값입니다.")
	private String restaurantBusinessNumber;

	@NotEmpty(message = "매장 주인은 필수 입력값입니다.")
	private String restaurantOwnerName;

	@NotEmpty(message = "매장 주소는 필수 입력값입니다.")
	private String restaurantAddress;

	@NotEmpty(message = "매장 번호는 필수 입력값입니다.")
	@Size(min = 11, max = 11, message = "매장 번호는 11자리여야 합니다.")
	private String restaurantPhone;

	@NotEmpty(message = "매장 이름은 필수 입력값입니다.")
	private String restaurantName;

	@NotNull(message = "매장 카테고리는 필수 입력값입니다.")
	private Long restaurantCategoryId;

}
