package com.waterdragon.wannaeat.domain.payment.service;

import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentOrderRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;

public interface KakaoPaymentService {

	KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentOrderRequestDto kakaoPaymentOrderRequestDto,
		String paymentId);

	KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentDepositRequestDto kakaoPaymentDepositRequestDto,
		String paymentId);

	void menuPaymentValidCheck(KakaoPaymentOrderRequestDto kakaoPaymentOrderRequestDto);

	KakaoPaymentApproveResponseDto kakaoPayApprove(String tid, String pgToken, String paymentId);
}
