package com.waterdragon.wannaeat.domain.statistic.dto.response;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MainStatisticResponseDto {

	private Map<Integer, Long> monthStatistics;

	private Map<String, Long> dayStatistics;

	private Map<String, Long> hourStatistics;

	private Map<String, Long> revenues;

	private List<MenuStatisticResponseDto> topMenuStatistics;

	private List<MenuStatisticResponseDto> bottomMenuStatistics;

}
