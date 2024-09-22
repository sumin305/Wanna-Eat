package com.waterdragon.wannaeat.domain.user.service;

import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeSendRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeVerifyRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserSignupRequestDto;

public interface UserService {

	void signup(UserSignupRequestDto userSignupRequestDto);

	void sendPhoneAuthenticationCode(PhoneCodeSendRequestDto phoneCodeSendRequestDto);

	boolean verifyPhoneAuthenticationCode(PhoneCodeVerifyRequestDto phoneCodeSendRequestDto);

}
