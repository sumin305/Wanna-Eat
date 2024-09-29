package com.waterdragon.wannaeat.domain.menu.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.menu.dto.request.MenuCategoryEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuCategoryRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryListResponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryRegisterResponseDto;
import com.waterdragon.wannaeat.domain.menu.service.MenuCategoryService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MenuCategoryController {

	private final MenuCategoryService menuCategoryService;

	/**
	 * 메뉴 카테고리 등록 API
	 *
	 * @param menuCategoryRegisterRequestDto 메뉴 카테고리 등록 정보
	 * @return MenuCategoryRegisterResponseDto 메뉴 카테고리 등록 후 반환 정보
	 */
	@Operation(summary = "메뉴 카테고리 등록 API")
	@PostMapping("/menu-categories")
	public ResponseEntity<ResponseDto<MenuCategoryRegisterResponseDto>> registerMenuCategory(
		@Valid @RequestBody MenuCategoryRegisterRequestDto menuCategoryRegisterRequestDto) {

		MenuCategoryRegisterResponseDto menuCategoryRegisterResponseDto = menuCategoryService.registerMenuCategory(
			menuCategoryRegisterRequestDto);
		ResponseDto<MenuCategoryRegisterResponseDto> responseDto = ResponseDto.<MenuCategoryRegisterResponseDto>builder()
			.status(HttpStatus.CREATED.value())
			.message("메뉴 카테고리가 성공적으로 등록되었습니다.")
			.data(menuCategoryRegisterResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}

	/**
	 * 식당별 메뉴 카테고리 목록 조회 API
	 *
	 * @param restaurantId 식당 id
	 * @return MenuCategoryListResponseDto 메뉴 카테고리 목록
	 */
	@Operation(summary = "식당별 메뉴 카테고리 목록 조회 API")
	@GetMapping("/public/menu-categories/{restaurantId}")
	public ResponseEntity<ResponseDto<MenuCategoryListResponseDto>> getListMenuCategoryByRestaurantId(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		MenuCategoryListResponseDto menuCategoryListResponseDto = menuCategoryService.getListMenuCategoryByRestaurantId(
			restaurantId);
		ResponseDto<MenuCategoryListResponseDto> responseDto = ResponseDto.<MenuCategoryListResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("식당별 메뉴 카테고리 목록이 성공적으로 조회되었습니다.")
			.data(menuCategoryListResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 메뉴 카테고리 수정 API
	 *
	 * @param menuCategoryId 메뉴 카테고리 id
	 * @param menuCategoryEditRequestDto 메뉴 카테고리 수정 정보
	 * @return void
	 */
	@Operation(summary = "메뉴 카테고리 수정 API")
	@PatchMapping("/menu-categories/{menuCategoryId}")
	public ResponseEntity<ResponseDto<Void>> editMenuCategory(
		@PathVariable(name = "menuCategoryId") Long menuCategoryId,
		@Valid @RequestBody MenuCategoryEditRequestDto menuCategoryEditRequestDto) {

		menuCategoryService.editMenuCategory(menuCategoryId, menuCategoryEditRequestDto);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴 카테고리가 성공적으로 수정되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 메뉴 카테고리 삭제 API
	 *
	 * @param menuCategoryId 메뉴 카테고리 id
	 * @return void
	 */
	@Operation(summary = "메뉴 카테고리 삭제 API")
	@DeleteMapping("/menu-categories/{menuCategoryId}")
	public ResponseEntity<ResponseDto<Void>> removeMenuCategory(
		@PathVariable(name = "menuCategoryId") Long menuCategoryId) {

		menuCategoryService.removeMenuCategory(menuCategoryId);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴 카테고리가 성공적으로 삭제되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}
}
