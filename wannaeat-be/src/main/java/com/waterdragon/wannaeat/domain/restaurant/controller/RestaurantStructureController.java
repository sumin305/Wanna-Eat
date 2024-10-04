package com.waterdragon.wannaeat.domain.restaurant.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantStructureRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantStructureDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.service.RestaurantStructureService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RestaurantStructureController {

	private final RestaurantStructureService restaurantStructureService;

	@Operation(summary = "매장 구조도 등록 API")
	@PostMapping("/restaurants/structure")
	public ResponseEntity<ResponseDto<Void>> registerRestaurantStructure(
		@Valid @RequestBody RestaurantStructureRegisterRequestDto restaurantStructureRegisterRequestDto) {

		restaurantStructureService.registerRestaurantStructure(restaurantStructureRegisterRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("매장 구조도 정보가 성공적으로 등록되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

	}

	@Operation(summary = "매장 구조도 조회 API")
	@GetMapping("/public/restaurants/{restaurantId}/structure")
	public ResponseEntity<ResponseDto<RestaurantStructureDetailResponseDto>> getDetailRestaurantStructureByRestaurantId(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		RestaurantStructureDetailResponseDto restaurantStructureDetailResponseDto = restaurantStructureService.getDetailRestaurantStructureByRestaurantId(
			restaurantId);
		ResponseDto<RestaurantStructureDetailResponseDto> responseDto = ResponseDto.<RestaurantStructureDetailResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("매장 구조도 정보가 성공적으로 조회되었습니다.")
			.data(restaurantStructureDetailResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);

	}
}
