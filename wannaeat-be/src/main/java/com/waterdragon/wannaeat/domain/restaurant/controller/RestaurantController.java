package com.waterdragon.wannaeat.domain.restaurant.controller;

import java.util.List;
import java.util.Map;

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

import com.waterdragon.wannaeat.domain.menu.dto.response.MenuDetailReponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
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

	/**
	 * 매장별 메뉴 목록 조회 API
	 *
	 * @param restaurantId 매장 id
	 * @return Map<String, List < MenuDetailReponseDto>> 카테고리별 메뉴 목록 반환
	 */
	@Operation(summary = "매장별 메뉴 목록 조회 API")
	@GetMapping("/public/restaurants/{restaurantId}/menus")
	public ResponseEntity<ResponseDto<Map<String, List<MenuDetailReponseDto>>>> getListMenusByRestaurantId(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		Map<String, List<MenuDetailReponseDto>> map = restaurantService.getListMenuByRestaurantId(restaurantId);
		ResponseDto<Map<String, List<MenuDetailReponseDto>>> responseDto = ResponseDto.<Map<String, List<MenuDetailReponseDto>>>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴 목록이 성공적으로 반환되었습니다.")
			.data(map)
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
