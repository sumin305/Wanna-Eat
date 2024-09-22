package com.waterdragon.wannaeat.domain.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.user.dto.request.NicknameDuplicateCheckRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeSendRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeVerifyRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserSignupRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.response.UserDetailResponseDto;
import com.waterdragon.wannaeat.domain.user.exception.error.DuplicateNicknameException;
import com.waterdragon.wannaeat.domain.user.service.UserService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

	private final UserService userService;

	/**
	 * 회원가입 API
	 *
	 * @param userSignupRequestDto 회원 추가 정보
	 * @return void 가입 요청 결과
	 */
	@Operation(summary = "회원가입 API")
	@PostMapping("/public/users/signup")
	public ResponseEntity<ResponseDto<Void>> signup(
		@Valid @RequestBody UserSignupRequestDto userSignupRequestDto) {

		userService.signup(userSignupRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("회원가입이 완료되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}

	@Operation(summary = "내 정보 조회 API")
	@GetMapping("/users")
	public ResponseEntity<ResponseDto<UserDetailResponseDto>> getDetailMyUser() {
		ResponseDto<UserDetailResponseDto> responseDto = ResponseDto.<UserDetailResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("로그인 유저 정보")
			.data(userService.getDetailMyUser())
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 닉네임 중복검사 API
	 *
	 * @param nicknameDuplicateCheckRequestDto 닉네임 정보
	 * @return 중복검사 결과
	 */
	@Operation(summary = "닉네임 중복검사 API")
	@PostMapping("/public/users/check-nickname")
	public ResponseEntity<ResponseDto<Void>> checkNicknameDuplicate(
		@Valid @RequestBody NicknameDuplicateCheckRequestDto nicknameDuplicateCheckRequestDto) {

		if (userService.checkNicknameDuplicate(nicknameDuplicateCheckRequestDto.getNickname())) {
			throw new DuplicateNicknameException("해당 닉네임으로 가입된 계정이 존재합니다.");
		}

		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("사용 가능한 닉네임입니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);

	}

	/**
	 * SMS 인증코드 전송 API
	 *
	 * @param phoneCodeSendRequestDto 인증코드 요청 정보
	 * @return void 인증코드 전송 결과
	 */
	@Operation(summary = "SMS 인증코드 전송 API")
	@PostMapping("/public/users/send-code")
	public ResponseEntity<ResponseDto<Void>> sendPhoneAuthenticationCode(
		@Valid @RequestBody PhoneCodeSendRequestDto phoneCodeSendRequestDto) {

		userService.sendPhoneAuthenticationCode(phoneCodeSendRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("인증코드가 전송 되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}

	/**
	 * SMS 인증코드 검증 API
	 *
	 * @param phoneCodeVerifyRequestDto 입력된 인증코드 정보
	 * @return void 인증 결과
	 */
	@Operation(summary = "SMS 인증코드 검증 API")
	@GetMapping("/public/users/verify-code")
	public ResponseEntity<ResponseDto<Void>> verifyEmailAuthenticationCode(
		@Valid @RequestBody PhoneCodeVerifyRequestDto phoneCodeVerifyRequestDto) {

		userService.verifyPhoneAuthenticationCode(phoneCodeVerifyRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("인증이 완료되었습니다.")
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
