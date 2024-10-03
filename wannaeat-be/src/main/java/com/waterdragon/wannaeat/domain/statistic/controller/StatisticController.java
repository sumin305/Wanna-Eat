package com.waterdragon.wannaeat.domain.statistic.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.statistic.dto.response.MainStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.service.StatisticService;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.response.ResponseDto;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StatisticController {

	private final StatisticService statisticService;
	private final AuthUtil authUtil;

	/**
	 * 식당 메인 통계 조회 API
	 *
	 * @return 메인 통계 정보
	 */
	@Operation(summary = "식당 메인 통계 API")
	@GetMapping("/restaurants/statistics")
	public ResponseEntity<ResponseDto<MainStatisticResponseDto>> getStatisticsByMain() {
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("접근 권한이 없습니다.");
		}

		Restaurant restaurant = user.getRestaurant();
		if (restaurant == null) {
			throw new RestaurantNotFoundException("등록된 식당이 없습니다.");
		}

		MainStatisticResponseDto mainStatisticResponseDto = statisticService.getStatisticsByMain(restaurant);
		ResponseDto<MainStatisticResponseDto> responseDto = ResponseDto.<MainStatisticResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("메인 통계 데이터.")
			.data(mainStatisticResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
