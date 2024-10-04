package com.waterdragon.wannaeat.global.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "에러 메시지 전송 객체")
public class ErrorResponseDto {

	@Schema(description = "에러 종류", example = "error")
	private String error;

	@Schema(description = "에러 메세지", example = "error message")
	private Object message;

}