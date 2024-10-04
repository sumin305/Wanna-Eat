package com.waterdragon.wannaeat.domain.reservation.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UrlValidationResponseDto {

	private Long reservationId;
	private Long reservationParticipantId;
	private String reservationParticipantNickname;
}
