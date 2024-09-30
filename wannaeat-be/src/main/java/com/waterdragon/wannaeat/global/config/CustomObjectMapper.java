package com.waterdragon.wannaeat.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class CustomObjectMapper {

	public static ObjectMapper createObjectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());  // JavaTimeModule을 등록
		objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);  // 날짜를 타임스탬프로 기록하지 않도록 설정
		return objectMapper;
	}
}