package com.waterdragon.wannaeat.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${redirectURL}")
	private String URL;

	@Value("${JWT_ACCESS_HEADER}")
	private String JWT_ACCESS_HEADER;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins(URL, "http://localhost:3000")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
			.allowedHeaders("*")
			.exposedHeaders("*")
			.exposedHeaders(JWT_ACCESS_HEADER)
			.allowCredentials(true)
			.maxAge(3600);
	}
}
