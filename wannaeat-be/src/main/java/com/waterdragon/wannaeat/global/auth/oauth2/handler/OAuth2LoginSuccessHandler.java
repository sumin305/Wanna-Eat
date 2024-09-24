package com.waterdragon.wannaeat.global.auth.oauth2.handler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.global.auth.jwt.service.JwtService;
import com.waterdragon.wannaeat.global.auth.oauth2.CustomOAuth2User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

	private final JwtService jwtService;
	private final UserRepository userRepository;

	@Value("${redirectURL}")
	private String REDIRECT_URL;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		log.info("OAuth2 Login 성공!");
		try {
			CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
			loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
		} catch (Exception e) {
			throw e;
		}

	}

	// TODO : 소셜 로그인 시에도 무조건 토큰 생성하지 말고 JWT 인증 필터처럼 RefreshToken 유/무에 따라 다르게 처리해보기
	private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
		String accessToken = jwtService.createAccessToken(oAuth2User.getEmail(), oAuth2User.getSocialType(),
			oAuth2User.getRole());
		String refreshToken = jwtService.createRefreshToken();
		response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);

		jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
		jwtService.updateRefreshToken(oAuth2User.getEmail(), oAuth2User.getSocialType(), refreshToken);

		String redirect = UriComponentsBuilder.fromUriString(REDIRECT_URL)
			.queryParam("redirectedFromSocialLogin", true).build().toUriString();
		response.sendRedirect(redirect);
	}
}