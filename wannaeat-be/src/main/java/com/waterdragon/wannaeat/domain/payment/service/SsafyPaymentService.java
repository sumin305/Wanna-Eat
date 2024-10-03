package com.waterdragon.wannaeat.domain.payment.service;

import com.waterdragon.wannaeat.domain.payment.dto.request.SsafyPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.SsafyPaymentOrderRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.SsafyPaymentResponseDto;

public interface SsafyPaymentService {

	SsafyPaymentResponseDto ssafyPay(SsafyPaymentOrderRequestDto ssafyPaymentOrderRequestDto);

	SsafyPaymentResponseDto ssafyPay(SsafyPaymentDepositRequestDto ssafyPaymentDepositRequestDto);
}
