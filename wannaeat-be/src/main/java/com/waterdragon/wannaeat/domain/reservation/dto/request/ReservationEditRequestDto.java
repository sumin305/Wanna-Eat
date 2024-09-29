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
public class ReservationEditRequestDto {

	@NotNull(message = "예약 아이디가 없습니다.")
	Long reservationId;

}
