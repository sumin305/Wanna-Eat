package com.waterdragon.wannaeat.domain.user.service;


import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeSendRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeVerifyRequestDto;

public interface UserService {

	void sendPhoneAuthenticationCode(PhoneCodeSendRequestDto phoneCodeSendRequestDto);

	boolean verifyPhoneAuthenticationCode(PhoneCodeVerifyRequestDto phoneCodeSendRequestDto);

}
