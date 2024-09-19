package com.waterdragon.wannaeat.domain.restaurant.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantCategoryListResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantDetailResponseDto;
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

	@Operation(summary = "매장 정보 상세 조회 API(메뉴 포함)")
	@GetMapping("/public/restaurants/{restaurantId}")
	public ResponseEntity<ResponseDto<RestaurantDetailResponseDto>> getDetailRestaurantByRestaurantId(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		RestaurantDetailResponseDto restaurantDetailResponseDto = restaurantService.getDetailRestaurantByRestaurantId(
			restaurantId);
		ResponseDto<RestaurantDetailResponseDto> responseDto = ResponseDto.<RestaurantDetailResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("매장 상세가 성공적으로 조회되었습니다.")
			.data(restaurantDetailResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 매장별 메뉴 목록 조회 API
	 *
	 * @param restaurantId 매장 id
	 * @return Map<String, List < MenuDetailReponseDto>> 카테고리별 메뉴 목록 반환
	 */
	@Operation(summary = "매장별 메뉴 목록 조회 API")
	@GetMapping("/public/restaurants/{restaurantId}/menus")
	public ResponseEntity<ResponseDto<MenuListResponseDto>> getListMenusByRestaurantId(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		MenuListResponseDto menuListResponseDto = restaurantService.getListMenusByRestaurantId(restaurantId);
		ResponseDto<MenuListResponseDto> responseDto = ResponseDto.<MenuListResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴 목록이 성공적으로 조회되었습니다.")
			.data(menuListResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 매장 카테고리 목록 조회 API
	 *
	 * @return RestaurantCategoryListResponseDto 매장 카테고리 목록
	 */
	@Operation(summary = "매장 카테고리 목록 조회 API")
	@GetMapping("/public/restaurants/categories")
	public ResponseEntity<ResponseDto<RestaurantCategoryListResponseDto>> getListRestaurantCategories() {

		RestaurantCategoryListResponseDto restaurantCategoryListResponseDto = restaurantService.getListRestaurantCategories();
		ResponseDto<RestaurantCategoryListResponseDto> responseDto = ResponseDto.<RestaurantCategoryListResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("매장 카테고리 목록이 성공적으로 조회되었습니다.")
			.data(restaurantCategoryListResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 매장 수정 API
	 *
	 * @param restaurantId 매장 id
	 * @param restaurantEditRequestDto 매장 수정 정보
	 * @param multipartFiles 매장 사진
	 * @return void 매장 수정 결과
	 */
	@Operation(summary = "매장 정보 수정 API")
	@PatchMapping("/restaurants/{restaurantId}")
	public ResponseEntity<ResponseDto<Void>> editRestaurant(
		@PathVariable(name = "restaurantId") Long restaurantId,
		@Valid @RequestPart(name = "restaurantEditRequestDto") RestaurantEditRequestDto restaurantEditRequestDto,
		@RequestPart(name = "restaurantImages", required = false) List<MultipartFile> multipartFiles) {

		restaurantService.editRestaurant(restaurantId, restaurantEditRequestDto, multipartFiles);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("매장이 성공적으로 수정되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
