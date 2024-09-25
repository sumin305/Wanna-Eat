package com.waterdragon.wannaeat.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.domain.user.repository.UserTokenRepository;
import com.waterdragon.wannaeat.global.auth.jwt.filter.JwtAuthenticationProcessingFilter;
import com.waterdragon.wannaeat.global.auth.jwt.service.JwtService;
import com.waterdragon.wannaeat.global.auth.oauth2.handler.OAuth2LoginFailureHandler;
import com.waterdragon.wannaeat.global.auth.oauth2.handler.OAuth2LoginSuccessHandler;
import com.waterdragon.wannaeat.global.auth.oauth2.service.CustomOAuth2UserService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final UserTokenRepository userTokenRepository;
	private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
	private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
	private final CustomOAuth2UserService customOAuth2UserService;

	// 대칭키
	@Value("${symmetric.key}")
	private String symmetrickey;
	@Value("${symmetric.salt}")
	private String salt;

	// PasswordEncoder interface의 구현체가 BCryptPasswordEncoder임을 수동 빈 등록을 통해 명시
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// AesBytesEncryptor 사용을 위한 Bean등록
	@Bean
	public AesBytesEncryptor aesBytesEncryptor() {
		return new AesBytesEncryptor(symmetrickey, salt);
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.formLogin(AbstractHttpConfigurer::disable) // FormLogin 사용 X
			.httpBasic(AbstractHttpConfigurer::disable) // httpBasic 사용 X
			.csrf(AbstractHttpConfigurer::disable) // csrf 보안 사용 X

			// 세션 사용하지 않으므로 STATELESS로 설정
			.sessionManagement(
				sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

			//== URL별 권한 관리 옵션 ==//
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

				// 기본 페이지
				.requestMatchers("/", "/favicon.ico", "/oauth2/authorization/**", "/api/health-check").permitAll()
				.requestMatchers("/api/public/**").permitAll()

				// swagger 설정 (추후 막아야 함)
				.requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

				// 예약
				.requestMatchers(HttpMethod.POST, "/api/reservations/validation").permitAll()

				// 결제 (누구나 결제할 수 있음 -> 추후 보증금 결제 등은 회원만 가능하므로 추가 처리해줄것)
				.requestMatchers("/api/payments/**").permitAll()

				.anyRequest().authenticated()// 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
			)

			// 소셜 로그인
			.oauth2Login(oauth2 -> oauth2
				.userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(customOAuth2UserService))
				.successHandler(oAuth2LoginSuccessHandler)
				.failureHandler(oAuth2LoginFailureHandler)
				.authorizationEndpoint().baseUri("/api/public/oauth2/authorization")
				.and()
				.redirectionEndpoint().baseUri("/api/public/login/oauth2/code/**")
			)

			// 예외 처리
			.exceptionHandling(exceptionHandling -> exceptionHandling
				.authenticationEntryPoint((request, response, authException) -> {
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"유효하지 않은 토큰입니다.\"}");
				})
			);

		// JWT 인증 필터를 UsernamePasswordAuthenticationFilter 앞에 추가한다.
		http.addFilterBefore(jwtAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
		JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService,
			userRepository, userTokenRepository);
		return jwtAuthenticationFilter;
	}
}