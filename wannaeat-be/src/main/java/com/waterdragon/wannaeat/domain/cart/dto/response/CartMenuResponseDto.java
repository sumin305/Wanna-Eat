package com.waterdragon.wannaeat.domain.cart.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartMenuResponseDto {

	private String menuName;
	private String menuImage;
	private int menuPrice;
	private int menuCnt;
	private int menuTotalPrice;
}
