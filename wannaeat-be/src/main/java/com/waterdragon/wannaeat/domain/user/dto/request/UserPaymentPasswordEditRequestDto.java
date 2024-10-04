package com.waterdragon.wannaeat.domain.user.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserPaymentPasswordEditRequestDto {
	@NotNull(message = "비밀번호는 필수 입력값입니다.")
	@Size(min = 6, max = 6, message = "결제 비밀번호는 6자리여야 합니다.")
	private String paymentPassword;
}
