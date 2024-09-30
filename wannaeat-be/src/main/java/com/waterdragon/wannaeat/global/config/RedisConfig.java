package com.waterdragon.wannaeat.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableRedisRepositories
public class RedisConfig {

	@Value("${redis.host}")
	private String host;
	@Value("${redis.port}")
	private int port;

	// Redis 연결 설정
	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		return new LettuceConnectionFactory(host, port);
	}

	// RedisTemplate 설정
	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

		// Key는 문자열로 직렬화
		redisTemplate.setKeySerializer(new StringRedisSerializer());

		// Value는 JSON으로 직렬화
		Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);

		ObjectMapper objectMapper = CustomObjectMapper.createObjectMapper();  // Custom ObjectMapper 설정
		serializer.setObjectMapper(objectMapper);

		redisTemplate.setValueSerializer(serializer);

		// HashValue도 JSON 직렬화
		redisTemplate.setHashValueSerializer(serializer);

		// Redis 연결 설정 적용
		redisTemplate.setConnectionFactory(redisConnectionFactory());

		return redisTemplate;
	}

}
