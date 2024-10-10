package com.waterdragon.wannaeat.domain.reservation.exception.error;

public class ReservationOrderExistException extends RuntimeException {
	public ReservationOrderExistException(String message) {
		super(message);
	}
}
