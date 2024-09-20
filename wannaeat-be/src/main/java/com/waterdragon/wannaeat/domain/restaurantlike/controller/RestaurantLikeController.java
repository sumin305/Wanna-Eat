package com.waterdragon.wannaeat.domain.restaurantlike.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterdragon.wannaeat.domain.restaurantlike.service.RestaurantLikeService;
import com.waterdragon.wannaeat.global.response.ResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RestaurantLikeController {

	private final RestaurantLikeService restaurantLikeService;

	/**
	 * 매장 찜 등록  API
	 *
	 * @param restaurantId 매장 id
	 * @return void
	 */
	@Operation(summary = "매장 찜 등록 API")
	@PostMapping("/restaurants/{restaurantId}/like")
	ResponseEntity<ResponseDto<Void>> registerRestaurantLike(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		restaurantLikeService.registerRestaurantLike(restaurantId);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.CREATED.value())
			.message("매장 찜이 성공적으로 등록되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

	}

	@Operation(summary = "매장 찜 삭제 API")
	@DeleteMapping("/restaurants/{restaurantId}/like")
	ResponseEntity<ResponseDto<Void>> removeRestaurantLike(
		@PathVariable(name = "restaurantId") Long restaurantId) {

		restaurantLikeService.removeRestaurantLike(restaurantId);
		ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
			.status(HttpStatus.OK.value())
			.message("매장 찜이 성공적으로 삭제되었습니다.")
			.data(null)
			.build();

		return new ResponseEntity<>(responseDto, HttpStatus.OK);

	}

}
