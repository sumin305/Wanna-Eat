package com.waterdragon.wannaeat.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

	@Value("${redirectURL}")
	private String URL;

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("api/public/ws").setAllowedOriginPatterns("*")
			.setAllowedOrigins(URL, "null") // 올바른 출처 설정
			.withSockJS();

	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {

		registry.enableSimpleBroker("/queue", "/topic");

		registry.setApplicationDestinationPrefixes("/api/public/ws/chat-messages", "api/public/ws/carts",
			"api/public/ws/shared-orders");
	}
}
