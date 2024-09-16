package com.waterdragon.wannaeat.domain.restaurant.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.service.RestaurantService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/restaurants")
public class RestaurantController {

	private final RestaurantService restaurantService;

	/**
	 * 매장 등록 API
	 *
	 * @param restaurantRegisterRequestDto 매장 기본 정보
	 * @return void 매장 등록 결과
	 */
	@Operation(summary = "매장 등록 API")
	@PostMapping
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

	@Operation(summary = "매장 정보 수정 API")
	@PatchMapping("/{restaurantId}")
	public ResponseEntity<ResponseDto<Void>> editRestaurant(
		@PathVariable(name = "restaurantId") Long restaurantId,
		@Valid @RequestPart(name = "restaurantEditRequestDto") RestaurantEditRequestDto restaurantEditRequestDto,
		@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) {

		restaurantService.editRestaurant(restaurantId, restaurantEditRequestDto, multipartFiles);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("매장이 성공적으로 수정되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);

	}



}
