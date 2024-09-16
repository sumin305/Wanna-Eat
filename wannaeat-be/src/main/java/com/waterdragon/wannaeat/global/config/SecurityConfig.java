package com.waterdragon.wannaeat.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.domain.user.repository.UserTokenRepository;
import com.waterdragon.wannaeat.global.auth.jwt.filter.JwtAuthenticationProcessingFilter;
import com.waterdragon.wannaeat.global.auth.jwt.service.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final UserTokenRepository userTokenRepository;

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
				.requestMatchers("/", "/favicon.ico", "/oauth2/authorization/**").permitAll()
				.requestMatchers("/api/public/**").permitAll()
				.anyRequest().permitAll()// 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
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