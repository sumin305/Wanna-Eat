package com.waterdragon.wannaeat.domain.restaurant.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SsafyRestaurantResponseDto {

	// Header 부분
	@JsonProperty("Header")
	private ResponseHeader header;

	// REC 부분
	@JsonProperty("REC")
	private List<ResponseRec> recs;

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ResponseHeader {
		@JsonProperty("responseCode")
		private String responseCode;
		@JsonProperty("responseMessage")
		private String responseMessage;
		@JsonProperty("apiName")
		private String apiName;
		@JsonProperty("transmissionDate")
		private String transmissionDate;
		@JsonProperty("transmissionTime")
		private String transmissionTime;
		@JsonProperty("institutionCode")
		private String institutionCode;
		@JsonProperty("apiKey")
		private String apiKey;
		@JsonProperty("apiServiceCode")
		private String apiServiceCode;
		@JsonProperty("institutionTransactionUniqueNo")
		private String institutionTransactionUniqueNo;
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ResponseRec {
		@JsonProperty("categoryId")
		private String categoryId;
		@JsonProperty("categoryName")
		private String categoryName;
		@JsonProperty("merchantId")
		private Long merchantId;
		@JsonProperty("merchantName")
		private String merchantName;
	}
}
