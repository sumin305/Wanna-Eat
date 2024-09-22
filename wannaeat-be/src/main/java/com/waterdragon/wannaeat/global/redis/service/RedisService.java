package com.waterdragon.wannaeat.global.redis.service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisService {
	// RedisTemplate에서 String을 key로, Object를 value로 다루도록 설정
	private final RedisTemplate<String, Object> redisTemplate;

	// 데이터 저장 (Object 타입 지원)
	public void setValues(String key, Object data) {
		ValueOperations<String, Object> values = redisTemplate.opsForValue();
		values.set(key, data); // Object 타입을 저장
	}

	// 데이터 저장 (기간 설정)
	public void setValues(String key, Object data, Duration duration) {
		ValueOperations<String, Object> values = redisTemplate.opsForValue();
		values.set(key, data, duration); // 기간 설정 후 Object 저장
	}

	// 데이터 가져오기 (Object 반환)
	@Transactional(readOnly = true)
	public Object getValues(String key) {
		ValueOperations<String, Object> values = redisTemplate.opsForValue();

		return values.get(key); // Object를 그대로 반환 (형 변환은 호출한 곳에서 처리)
	}

	// 데이터 삭제
	public void deleteValues(String key) {
		redisTemplate.delete(key);
	}

	// 만료 시간 설정
	public void expireValues(String key, int timeout) {
		redisTemplate.expire(key, timeout, TimeUnit.MILLISECONDS);
	}

	// HashOperations: 해시 형태로 Object를 저장
	public void setHashOps(String key, Map<String, Object> data) {
		HashOperations<String, String, Object> values = redisTemplate.opsForHash();
		values.putAll(key, data); // Map<String, Object> 저장
	}

	// Hash 값 가져오기 (Object 반환)
	@Transactional(readOnly = true)
	public Object getHashOps(String key, String hashKey) {
		HashOperations<String, Object, Object> values = redisTemplate.opsForHash();
		return values.get(key, hashKey); // Object 반환
	}

	// Hash 값 삭제
	public void deleteHashOps(String key, String hashkey) {
		HashOperations<String, String, Object> values = redisTemplate.opsForHash();
		values.delete(key, hashkey);
	}

	// 값이 존재하는지 확인
	public boolean checkExistsValue(Object value) {
		return value != null && !value.equals("false");
	}

}
