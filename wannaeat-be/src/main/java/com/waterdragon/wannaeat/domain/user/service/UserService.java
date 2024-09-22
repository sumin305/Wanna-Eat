package com.waterdragon.wannaeat.domain.user.service;

import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeSendRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeVerifyRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserEditRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserSignupRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.response.UserDetailResponseDto;

public interface UserService {

	void signup(UserSignupRequestDto userSignupRequestDto);

	UserDetailResponseDto getDetailMyUser();

	void editUser(UserEditRequestDto userEditRequestDto);

	boolean checkNicknameDuplicate(String nickname);

	void sendPhoneAuthenticationCode(PhoneCodeSendRequestDto phoneCodeSendRequestDto);

	boolean verifyPhoneAuthenticationCode(PhoneCodeVerifyRequestDto phoneCodeSendRequestDto);

}
