package com.waterdragon.wannaeat.domain.reservation.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlValidationRequestDto {

	@NotNull(message = "Url이 존재하지 않습니다.")
	String reservationUrl;
}
