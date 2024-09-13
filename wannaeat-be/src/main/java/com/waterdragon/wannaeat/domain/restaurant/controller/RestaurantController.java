package com.waterdragon.wannaeat.domain.restaurant.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.service.RestaurantService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RestaurantController {

	private final RestaurantService restaurantService;

	/**
	 * 매장 등록 API
	 *
	 * @param restaurantRegisterRequestDto 매장 기본 정보
	 * @return void 매장 등록 결과
	 */
	@Operation(summary = "매장 등록 API")
	@PostMapping("/restaurants")
	public ResponseEntity<ResponseDto<Void>> registerRestaurant(
		@Valid @RequestBody RestaurantRegisterRequestDto restaurantRegisterRequestDto) {

		restaurantService.registerRestaurant(restaurantRegisterRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("매장이 성공적으로 등록되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}

}
