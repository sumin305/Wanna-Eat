package com.waterdragon.wannaeat.global.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class FcmConfig {
	@Value("${firebase.path}")
	private String FCM_KEY;

	@PostConstruct
	public void initialize() {
		try {
			FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(
					GoogleCredentials.fromStream(new ClassPathResource(FCM_KEY).getInputStream())
				)
				.build();
			FirebaseApp.initializeApp(options);
			log.info("Fcm 설정 성공");
		} catch (IOException exception) {
			log.error("Fcm 연결 오류 {}", exception.getMessage());
		}
	}
}