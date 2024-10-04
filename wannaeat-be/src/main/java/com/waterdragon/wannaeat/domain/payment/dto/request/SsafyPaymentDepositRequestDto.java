package com.waterdragon.wannaeat.domain.payment.dto.request;

import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SsafyPaymentDepositRequestDto extends SsafyPaymentRequestDto {

	@NotNull(message = "보증금이 유효하지 않습니다.")
	private Integer price;

	@NotNull(message = "식당 아이디는 널일 수 없습니다.")
	private Long restaurantId;

	@NotNull(message = "예약 정보가 설정되지 않았습니다.")
	private ReservationRegisterRequestDto reservationRegisterRequestDto;
}
