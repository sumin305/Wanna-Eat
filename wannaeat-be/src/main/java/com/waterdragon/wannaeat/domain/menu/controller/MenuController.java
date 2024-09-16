package com.waterdragon.wannaeat.domain.menu.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.dto.request.MenuEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.service.MenuService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
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
	@PostMapping
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
	 * 메뉴 수정 API
	 *
	 * @param menuId 메뉴 id
	 * @param menuEditRequestDto 메뉴 수정 정보
	 * @param multipartFile 메뉴 수정 이미지
	 * @return void 메뉴 수정 결과
	 */
	@Operation(summary = "메뉴 수정 API")
	@PatchMapping("/{menuId}")
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
	@DeleteMapping("/{menuId}")
	public ResponseEntity<ResponseDto<Void>> removeMenu(
		@PathVariable(name = "menuId") Long menuId) {

		menuService.removeMenu(menuId);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.NO_CONTENT.value())
			.message("메뉴가 성공적으로 삭제되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.NO_CONTENT);
	}

}
