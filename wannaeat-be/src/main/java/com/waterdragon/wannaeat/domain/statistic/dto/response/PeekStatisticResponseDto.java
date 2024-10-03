package com.waterdragon.wannaeat.domain.statistic.dto.response;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PeekStatisticResponseDto {

	private Map<String, Long> dayStatistics;

	private Map<String, Long> hourStatistics;

	private double turnoverRate;

	private int averageUsageTime;

}
