package com.waterdragon.wannaeat.domain.menu.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.dto.request.MenuEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;
import com.waterdragon.wannaeat.domain.menu.service.MenuService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MenuController {

	private final MenuService menuService;

	/**
	 * 메뉴 등록 API
	 *
	 * @param menuRegisterRequestDto 메뉴 등록 정보
	 * @param multipartFile 메뉴 사진
	 * @return void 메뉴 등록 결과
	 */
	@Operation(summary = "메뉴 등록 API")
	@PostMapping("/menus")
	public ResponseEntity<ResponseDto<Void>> registerMenu(
		@Valid @RequestPart(name = "menuRegisterRequestDto") MenuRegisterRequestDto menuRegisterRequestDto,
		@RequestPart(name = "menuImage", required = false) MultipartFile multipartFile) {

		menuService.registerMenu(menuRegisterRequestDto, multipartFile);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("메뉴가 성공적으로 등록되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
	}

	/**
	 * 식당별 메뉴 목록 조회 API
	 *
	 * @param restaurantId 식당 id
	 * @return MenuListResponseDto 메뉴 목록
	 */
	@Operation(summary = "식당별 메뉴 목록 조회 API")
	@GetMapping("/public/restaurants/{restaurantId}/menus")
	public ResponseEntity<ResponseDto<MenuListResponseDto>> getListMenuByRestaurantId(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		MenuListResponseDto menuListResponseDto = menuService.getListMenuByRestaurantId(restaurantId);
		ResponseDto<MenuListResponseDto> responseDto = ResponseDto.<MenuListResponseDto>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴 목록이 성공적으로 조회되었습니다.")
			.data(menuListResponseDto)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 메뉴 수정 API
	 *
	 * @param menuId 메뉴 id
	 * @param menuEditRequestDto 메뉴 수정 정보
	 * @param multipartFile 메뉴 수정 이미지
	 * @return void 메뉴 수정 결과
	 */
	@Operation(summary = "메뉴 수정 API")
	@PatchMapping("/menus/{menuId}")
	public ResponseEntity<ResponseDto<Void>> editMenu(
		@PathVariable(name = "menuId") Long menuId,
		@Valid @RequestPart(name = "menuEditRequestDto") MenuEditRequestDto menuEditRequestDto,
		@RequestPart(name = "menuImage", required = false) MultipartFile multipartFile) {

		menuService.editMenu(menuId, menuEditRequestDto, multipartFile);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴가 성공적으로 수정되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	/**
	 * 메뉴 삭제 API
	 *
	 * @param menuId 메뉴 id
	 * @return void 메뉴 삭제 결과
	 */
	@Operation(summary = "메뉴 삭제 API")
	@DeleteMapping("/menus/{menuId}")
	public ResponseEntity<ResponseDto<Void>> removeMenu(
		@PathVariable(name = "menuId") Long menuId) {

		menuService.removeMenu(menuId);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("메뉴가 성공적으로 삭제되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

}
