package com.waterdragon.wannaeat.domain.payment.service;

import com.waterdragon.wannaeat.domain.payment.dto.request.KakaoPaymentRequestDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentApproveResponseDto;
import com.waterdragon.wannaeat.domain.payment.dto.response.KakaoPaymentReadyResponseDto;

public interface KakaoPaymentService {

	KakaoPaymentReadyResponseDto kakaoPayReady(KakaoPaymentRequestDto kakaoPaymentRequestDto, String paymentId);

	KakaoPaymentApproveResponseDto kakaoPayApprove(String tid, String pgToken, String paymentId);
}
