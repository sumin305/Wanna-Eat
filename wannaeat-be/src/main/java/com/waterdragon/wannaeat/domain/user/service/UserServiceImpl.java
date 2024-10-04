package com.waterdragon.wannaeat.domain.user.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.UserToken;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;
import com.waterdragon.wannaeat.domain.user.dto.request.FcmTokenEditRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeSendRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.PhoneCodeVerifyRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserNicknameEditRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.request.UserSignupRequestDto;
import com.waterdragon.wannaeat.domain.user.dto.response.UserDetailResponseDto;
import com.waterdragon.wannaeat.domain.user.exception.error.DuplicateNicknameException;
import com.waterdragon.wannaeat.domain.user.exception.error.DuplicatePhoneException;
import com.waterdragon.wannaeat.domain.user.exception.error.DuplicateUserException;
import com.waterdragon.wannaeat.domain.user.exception.error.InvalidCodeException;
import com.waterdragon.wannaeat.domain.user.exception.error.InvalidPhoneException;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.domain.user.repository.UserTokenRepository;
import com.waterdragon.wannaeat.global.auth.jwt.service.JwtService;
import com.waterdragon.wannaeat.global.auth.oauth2.service.EncryptService;
import com.waterdragon.wannaeat.global.redis.service.RedisService;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final EncryptService encryptService;
	private final RedisService redisService;
	private final AuthUtil authUtil;
	private final UserTokenRepository userTokenRepository;
	private DefaultMessageService messageService; // 생성자 주입
	private final JwtService jwtService;

	@Value("${spring.phone-authcode-expiration-millis}")
	private int authCodeExpirationMillis;

	@Value("${coolsms.senderNumber}")
	private String senderNumber;

	@Value("${coolsms.apiKey}")
	private String apiKey;

	@Value("${coolsms.apiSecret}")
	private String apiSecret;

	@PostConstruct
	public void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	/**
	 * 추가정보를 받아 회원가입을 처리하는 메소드
	 *
	 * @param userSignupRequestDto 회원 추가 정보
	 */
	@Override
	public void signup(UserSignupRequestDto userSignupRequestDto) {
		checkNicknameDuplicate(userSignupRequestDto.getNickname());
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.GUEST) {
			throw new DuplicateUserException("이미 가입된 계정입니다. 다시 로그인 해 주세요.");
		}
		userSignupRequestDto.setPhone(encryptService.encryptData(userSignupRequestDto.getPhone()));
		userSignupRequestDto.setPaymentPassword(encryptService.encryptData(userSignupRequestDto.getPaymentPassword()));
		user.edit(userSignupRequestDto);
		userRepository.save(user);
	}

	/**
	 * 로그아웃 메소드
	 * DB의 Refresh와 FcmToken을 삭제, 헤더와 쿠키의 Access, RefreshToken 삭제
	 *
	 * @param response 응답 객체
	 */
	@Override
	public void signout(HttpServletResponse response) {
		User user = authUtil.getAuthenticatedUser();

		// DB의 RefreshToken 삭제
		user.getUserToken().removeTokens();
		userRepository.save(user);

		// 헤더의 AccessToken과 쿠키의 RefreshToken 삭제
		jwtService.removeAccessToken(response);
		jwtService.removeRefreshTokenCookie(response);

	}

	/**
	 * 로그인 유저 정보를 받아오는 메소드
	 *
	 * @return 로그인 유저 정보
	 */
	@Override
	public UserDetailResponseDto getDetailMyUser() {
		User user = authUtil.getAuthenticatedUser();
		String phone = encryptService.decryptData(user.getPhone());
		return UserDetailResponseDto.builder()
			.userId(user.getUserId())
			.email(user.getEmail())
			.nickname(user.getNickname())
			.phone(phone)
			.role(user.getRole())
			.socialType(user.getSocialType())
			.build();
	}

	/**
	 * 로그인 유저 닉네임을 수정하는 메소드
	 *
	 * @param userNicknameEditRequestDto 수정할 유저 정보
	 */
	@Override
	public void editUserNickname(UserNicknameEditRequestDto userNicknameEditRequestDto) {
		checkNicknameDuplicate(userNicknameEditRequestDto.getNickname());
		User user = authUtil.getAuthenticatedUser();
		user.editNickname(userNicknameEditRequestDto);
		userRepository.save(user);
	}

	/**
	 * 닉네임 중복검사 메소드
	 *
	 * @param nickname 닉네임
	 */
	@Override
	public void checkNicknameDuplicate(String nickname) {
		if (userRepository.findByNickname(nickname).isPresent()) {
			throw new DuplicateNicknameException("해당 닉네임으로 가입된 계정이 존재합니다.");
		}
	}

	/**
	 * SMS 인증코드 전송을 요청하는 메소드
	 *
	 * @param phoneCodeSendRequestDto 인증코드 요청 정보
	 */
	@Override
	public void sendPhoneAuthenticationCode(PhoneCodeSendRequestDto phoneCodeSendRequestDto) {
		String to = phoneCodeSendRequestDto.getPhone();
		int code = (int)(Math.random() * (90000)) + 100000;
		String certificationNumber = String.valueOf(code);
		String phone = encryptService.encryptData(to);
		SocialType socialType = phoneCodeSendRequestDto.getSocialType();

		// 해당 번호로 가입된 계정 조회
		userRepository.findByPhoneAndSocialTypeAndDeletedFalse(phone, socialType)
			.ifPresent((user) -> {
				throw new DuplicatePhoneException("해당 번호로 가입된 " + socialType.toString() + " 계정이 존재합니다.");
			});

		Message message = new Message();
		message.setFrom(senderNumber);
		message.setTo(to);
		message.setText("[머물래] 본인 확인 인증번호는 [" + certificationNumber + "]입니다.\n5분 이내에 인증을 완료해주세요.");

		SingleMessageSentResponse m = messageService.sendOne(new SingleMessageSendingRequest(message));
		if (m.getStatusCode().charAt(0) != '2') {
			throw new InvalidPhoneException("유효하지 않은 번호입니다.");
		}
		// SMS 인증 요청 시 인증 번호 Redis에 저장 ( key = phone + socialType / value = AuthCode )
		redisService.setValues(phone + phoneCodeSendRequestDto.getSocialType().toString(), certificationNumber,
			Duration.ofMillis(authCodeExpirationMillis));
	}

	/**
	 * SMS 인증코드 검증 메소드
	 *
	 * @param phoneCodeVerifyRequestDto 입력받은 인증코드 정보
	 * @return boolean 인증 성공시 true 반환
	 */
	@Override
	public boolean verifyPhoneAuthenticationCode(PhoneCodeVerifyRequestDto phoneCodeVerifyRequestDto) {
		String phone = encryptService.encryptData(phoneCodeVerifyRequestDto.getPhone());
		String key = phone + phoneCodeVerifyRequestDto.getSocialType().toString();
		String redisAuthCode = (String)redisService.getValues(key);

		if (!redisService.checkExistsValue(redisAuthCode)) {
			throw new InvalidCodeException("인증코드가 만료되었습니다.");
		}
		if (!redisAuthCode.equals(
			String.valueOf(phoneCodeVerifyRequestDto.getCode()))) {
			throw new InvalidCodeException("인증코드가 일치하지 않습니다.");
		}
		redisService.deleteValues(key);
		return true;
	}

	/**
	 * FcmToken 갱신 메소드
	 *
	 * @param fcmTokenEditRequestDto FcmToken 정보
	 */
	@Override
	public void editFcmToken(FcmTokenEditRequestDto fcmTokenEditRequestDto) {
		UserToken userToken = authUtil.getAuthenticatedUser().getUserToken();
		String fcmToken = fcmTokenEditRequestDto.getFcmToken();
		// DB에 저장된 토큰과 일치하지 않는 경우(새로운 토큰인 경우)에만 갱신
		if (userToken.getFcmToken() == null || !userToken.getFcmToken().equals(fcmToken)) {
			userToken.editFcmToken(fcmToken);
			userTokenRepository.save(userToken);
		}

	}

}
