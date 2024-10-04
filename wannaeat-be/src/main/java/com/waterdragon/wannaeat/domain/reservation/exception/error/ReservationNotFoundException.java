package com.waterdragon.wannaeat.domain.reservation.exception.error;

public class ReservationNotFoundException extends RuntimeException {
	public ReservationNotFoundException(String message) {
		super(message);
	}
}
