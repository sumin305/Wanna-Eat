package com.waterdragon.wannaeat.domain.order.exception.error;

public class TotalCntLowerThanPaidCntException extends RuntimeException {
	public TotalCntLowerThanPaidCntException(String message) {
		super(message);
	}
}
