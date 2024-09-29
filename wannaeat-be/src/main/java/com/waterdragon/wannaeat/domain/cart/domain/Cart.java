package com.waterdragon.wannaeat.domain.cart.domain;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	private Long reservationId;
	private Map<Long, Map<Long, CartMenu>> cartElements; // Key: reservationParticipantId(참가자 id), Value: <menuId(메뉴 id) : cartMenu(메뉴 정보)>
	@Setter
	private int cartTotalPrice;
}
