package com.waterdragon.wannaeat.domain.user.service;

import com.waterdragon.wannaeat.domain.user.dto.request.FcmTokenEditRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeSendRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeVerifyRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserEditRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserSignupRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.response.UserDetailResponseDto;

import jakarta.servlet.http.HttpServletResponse;

public interface UserService {

	void signup(UserSignupRequestDto userSignupRequestDto);

	void signout(HttpServletResponse response);

	UserDetailResponseDto getDetailMyUser();

	void editUser(UserEditRequestDto userEditRequestDto);

	void checkNicknameDuplicate(String nickname);

	void sendPhoneAuthenticationCode(PhoneCodeSendRequestDto phoneCodeSendRequestDto);

	boolean verifyPhoneAuthenticationCode(PhoneCodeVerifyRequestDto phoneCodeSendRequestDto);

	void editFcmToken(FcmTokenEditRequestDto fcmTokenEditRequestDto);

}
