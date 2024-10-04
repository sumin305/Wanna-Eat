package com.waterdragon.wannaeat.domain.reservation.exception.error;

public class DuplicateReservationTableException extends RuntimeException {
	public DuplicateReservationTableException(String message) {
		super(message);
	}
}
