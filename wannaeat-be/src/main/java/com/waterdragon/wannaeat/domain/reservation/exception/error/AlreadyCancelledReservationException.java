package com.waterdragon.wannaeat.domain.reservation.exception.error;

public class AlreadyCancelledReservationException extends RuntimeException {
	public AlreadyCancelledReservationException(String message) {
		super(message);
	}
}
