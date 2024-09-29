package com.waterdragon.wannaeat.domain.payment.service;

import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentDepositRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentMenuRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;

public interface KakaoPaymentService {

	KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentMenuRequestDto kakaoPaymentMenuRequestDto, String paymentId);

	KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentDepositRequestDto kakaoPaymentDepositRequestDto,
		String paymentId);

	void menuPaymentValidCheck(KakaoPaymentMenuRequestDto kakaoPaymentMenuRequestDto);

	KakaoPaymentApproveResponseDto kakaoPayApprove(String tid, String pgToken, String paymentId);
}
