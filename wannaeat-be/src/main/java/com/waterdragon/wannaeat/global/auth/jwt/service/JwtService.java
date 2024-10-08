package com.waterdragon.wannaeat.global.auth.jwt.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.UserToken;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.domain.user.repository.UserTokenRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

	@Value("${jwt.secretKey}")
	private String secretKey;

	@Value("${jwt.access.expiration}")
	private Long accessTokenExpirationPeriod;

	@Value("${jwt.refresh.expiration}")
	private Long refreshTokenExpirationPeriod;

	@Value("${jwt.access.header}")
	private String accessHeader;

	@Value("${jwt.refresh.header}")
	private String refreshHeader;

	/**
	 * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "email"으로 설정
	 * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
	 */
	private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
	private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
	private static final String EMAIL_CLAIM = "email";
	private static final String SOCIAL_TYPE_CLAIM = "socialType";
	private static final String ROLE_CLAIM = "role";
	private static final String RESTAURANT_ID_CLAIM = "restaurantId";
	private static final String BEARER = "Bearer ";

	private final UserRepository userRepository;
	private final UserTokenRepository userTokenRepository;

	/**
	 * AccessToken 생성 메소드
	 */
	public String createAccessToken(String email, SocialType socialType, Role role, Restaurant restaurant) {
		Date now = new Date();
		return JWT.create() // JWT 토큰을 생성하는 빌더 반환
			.withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 Subject 지정 -> AccessToken이므로 AccessToken
			.withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정

			// 클레임으로는 email, socialType, role, restaurantId 4가지 사용
			.withClaim(EMAIL_CLAIM, email)
			.withClaim(SOCIAL_TYPE_CLAIM, socialType.name())
			.withClaim(ROLE_CLAIM, role.toString())
			.withClaim(RESTAURANT_ID_CLAIM,
				restaurant != null ? restaurant.getRestaurantId() : null) // restaurant가 null이면 null 설정
			.sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, application-jwt.yml에서 지정한 secret 키로 암호화
	}

	/**
	 * RefreshToken 생성
	 * RefreshToken은 Claim에 email도 넣지 않으므로 withClaim() X
	 */
	public String createRefreshToken() {
		Date now = new Date();
		return JWT.create()
			.withSubject(REFRESH_TOKEN_SUBJECT)
			.withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
			.sign(Algorithm.HMAC512(secretKey));
	}

	public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
		response.setStatus(HttpServletResponse.SC_OK);

		// AccessToken을 헤더에 설정
		setAccessTokenHeader(response, accessToken);

		// RefreshToken을 쿠키에 설정
		Cookie refreshTokenCookie = new Cookie(refreshHeader, refreshToken);
		refreshTokenCookie.setHttpOnly(true); // 보안을 위해 JavaScript에서 접근 불가
		// refreshTokenCookie.setSecure(true); // HTTPS에서만 전송되도록 설정
		refreshTokenCookie.setPath("/"); // 도메인 전체에서 사용 가능하게 설정
		refreshTokenCookie.setMaxAge(Math.toIntExact(refreshTokenExpirationPeriod)); // 쿠키 만료 시간 설정
		response.addCookie(refreshTokenCookie);

	}

	// 쿠키에서 RefreshToken 추출
	public Optional<String> extractRefreshTokenFromCookies(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (refreshHeader.equals(cookie.getName())) {
					return Optional.of(cookie.getValue());
				}
			}
		}
		return Optional.empty();
	}

	/**
	 * 헤더에서 AccessToken 추출
	 * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
	 * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
	 */
	public Optional<String> extractAccessToken(HttpServletRequest request) {
		return Optional.ofNullable(request.getHeader(accessHeader))
			.filter(refreshToken -> refreshToken.startsWith(BEARER))
			.map(refreshToken -> refreshToken.replace(BEARER, ""));
	}

	/**
	 * AccessToken에서 Email 추출
	 * 추출 전에 JWT.require()로 검증기 생성
	 * verify로 AceessToken 검증 후
	 * 유효하다면 getClaim()으로 이메일 추출
	 * 유효하지 않다면 빈 Optional 객체 반환
	 */
	public Optional<String> extractEmail(String accessToken) {
		try {
			// 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
			return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
				.build() // 반환된 빌더로 JWT verifier 생성
				.verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
				.getClaim(EMAIL_CLAIM) // claim(Email) 가져오기
				.asString());
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}

	/**
	 * AccessToken에서 SocialType 추출
	 * 추출 전에 JWT.require()로 검증기 생성
	 * verify로 AceessToken 검증 후
	 * 유효하다면 getClaim()으로 소셜타입 추출
	 * 유효하지 않다면 빈 Optional 객체 반환
	 */
	public Optional<SocialType> extractSocialType(String accessToken) {
		try {
			// 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
			String socialTypeString = JWT.require(Algorithm.HMAC512(secretKey))
				.build() // 반환된 빌더로 JWT verifier 생성
				.verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
				.getClaim(SOCIAL_TYPE_CLAIM) // claim(SocialType) 가져오기
				.asString();

			// SocialType 변환 시도
			return Optional.of(SocialType.fromString(socialTypeString));
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.", e);
			return Optional.empty();
		}
	}

	/**
	 * AccessToken 헤더 설정
	 */
	public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
		response.setHeader(accessHeader, accessToken);
	}

	/**
	 * RefreshToken DB 저장(업데이트)
	 */
	public void updateRefreshToken(String email, SocialType socialType, String refreshToken) {
		userRepository.findByEmailAndSocialType(email, socialType)
			.ifPresentOrElse(
				user -> {
					UserToken userToken = user.getUserToken();
					userToken.editRefreshToken(refreshToken);
					userTokenRepository.save(userToken); // 업데이트 후 저장
				},
				() -> {
					throw new IllegalStateException("해당 유저가 존재하지 않습니다.");
				}
			);
	}

	public boolean isTokenValid(String token) {
		try {
			JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
			return true;
		} catch (Exception e) {
			log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
			return false;
		}
	}

	public void removeAccessToken(HttpServletResponse response) {
		response.setHeader(accessHeader, "");
	}

	public void removeRefreshTokenCookie(HttpServletResponse response) {
		// RefreshToken 쿠키 삭제를 위해 만료 시간 0 설정
		Cookie refreshTokenCookie = new Cookie(refreshHeader, null);
		refreshTokenCookie.setHttpOnly(true); // 보안을 위해 JavaScript에서 접근 불가
		refreshTokenCookie.setPath("/"); // 모든 경로에서 적용되도록 설정
		refreshTokenCookie.setMaxAge(0); // 쿠키 만료 시간 0으로 설정하여 삭제
		response.addCookie(refreshTokenCookie);
	}
}