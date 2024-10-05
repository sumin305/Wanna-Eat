package com.waterdragon.wannaeat.domain.payment.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SsafyPaymentRequestDto {

	@NotEmpty(message = "cardNo는 필수 입력값입니다.")
	private String cardNo;

	@NotEmpty(message = "cvc는 필수 입력값입니다.")
	private String cvc;

	@NotEmpty(message = "유저 Key는 필수 입력값입니다.")
	private String userKey;

	@NotEmpty(message = "유저 비밀번호는 필수 입력값입니다.")
	private String userPassword;
}
