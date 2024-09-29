package com.waterdragon.wannaeat.domain.cart.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartMenu {
	private String menuName;
	private String menuImage;
	private int menuPrice;
	@Setter
	private int menuCnt;
	@Setter
	private int menuTotalPrice;
}
