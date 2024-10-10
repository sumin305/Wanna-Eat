package com.waterdragon.wannaeat.domain.payment.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoPaymentOrderRequestDto {

	@NotEmpty(message = "예약 url은 필수 입력값입니다.")
	private String reservationUrl;

	@NotNull
	@Size(min = 1, message = "결제 요청 내역은 비어있을 수 없습니다.")
	private List<PaymentMenuRequestDto> paymentMenuRequestDtos;
}
