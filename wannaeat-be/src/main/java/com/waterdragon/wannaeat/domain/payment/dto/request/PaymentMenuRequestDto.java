package com.waterdragon.wannaeat.domain.payment.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMenuRequestDto {

	@NotNull(message = "주문 id는 필수 입력값입니다.")
	private Long orderId;
	@NotNull(message = "메뉴 id는 필수 입력값입니다.")
	private Long menuId;
	@NotNull(message = "메뉴 수량은 필수 입력값입니다.")
	private Integer menuCount;
}
