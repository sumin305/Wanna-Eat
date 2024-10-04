package com.waterdragon.wannaeat.domain.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.menu.domain.MenuCategory;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuCategoryEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuCategoryRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryDetailResponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryListResponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryRegisterResponseDto;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuCategoryNotFoundException;
import com.waterdragon.wannaeat.domain.menu.repository.MenuCategoryRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuCategoryServiceImpl implements MenuCategoryService {

	private final RestaurantRepository restaurantRepository;
	private final MenuCategoryRepository menuCategoryRepository;
	private final AuthUtil authUtil;

	/**
	 * 메뉴 카테고리 등록 메소드
	 *
	 * @param menuCategoryRegisterRequestDto 메뉴 카테고리 등록 정보
	 * @return MenuCategoryRegisterResponseDto 카테고리 id, 카테고리명
	 */
	@Override
	@Transactional
	public MenuCategoryRegisterResponseDto registerMenuCategory(
		MenuCategoryRegisterRequestDto menuCategoryRegisterRequestDto) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// restaurantId 유효성 검증
		Restaurant restaurant = restaurantRepository.findByRestaurantId(
				menuCategoryRegisterRequestDto.getRestaurantId())
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당 id의 식당은 존재하지 않습니다. restaurantId = "
				+ menuCategoryRegisterRequestDto.getRestaurantId()));

		// 사장님에 해당하는 식당 검증
		if (!restaurant.getUser().getUserId().equals(user.getUserId())) {
			throw new NotAuthorizedException("유저에 해당하는 식당이 아닙니다.");
		}

		// MenuCategory 엔티티 변환 후 저장
		MenuCategory menuCategory = MenuCategory.builder()
			.restaurant(restaurant)
			.categoryName(menuCategoryRegisterRequestDto.getMenuCategoryName())
			.build();
		menuCategoryRepository.save(menuCategory);

		// MenuCategoryResponseDto 반환
		return MenuCategoryRegisterResponseDto.builder()
			.menuCategoryName(menuCategory.getCategoryName())
			.restaurantId(restaurant.getRestaurantId())
			.build();
	}

	/**
	 * 식당별 메뉴 카테고리 목록 조회 메소드
	 *
	 * @param restaurantId 식당 id
	 * @return MenuCategoryListResponseDto 메뉴 카테고리 목록
	 */
	@Override
	public MenuCategoryListResponseDto getListMenuCategoryByRestaurantId(Long restaurantId) {

		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다. 식당 id = " + restaurantId));

		List<MenuCategory> menuCategories = menuCategoryRepository.findAllByRestaurant(restaurant);

		List<MenuCategoryDetailResponseDto> menuCategoryDtos = menuCategories.stream()
			.map(menuCategory -> MenuCategoryDetailResponseDto.builder()
				.menuCategoryId(menuCategory.getCategoryId())
				.menuCategoryName(menuCategory.getCategoryName())
				.build())
			.toList();

		// MenuCategoryListResponseDto 반환
		return MenuCategoryListResponseDto.builder()
			.menuCategories(menuCategoryDtos)
			.build();
	}

	/**
	 * 메뉴 카테고리 수정 API
	 *
	 * @param menuCategoryEditRequestDto 메뉴 카테고리 수정 메소드
	 */
	@Override
	@Transactional
	public void editMenuCategory(Long menuCategoryId, MenuCategoryEditRequestDto menuCategoryEditRequestDto) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// menuCategoryId 유효성 검증
		MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(menuCategoryId)
			.orElseThrow(() -> new MenuCategoryNotFoundException(
				"해당 메뉴 카테고리 id의 메뉴 카테고리는 존재하지 않습니다. 메뉴 카테고리 id = " + menuCategoryId));

		// restaurantId 유효성 검증
		Restaurant restaurant = restaurantRepository.findByRestaurantId(menuCategory.getRestaurant().getRestaurantId())
			.orElseThrow(() -> new RestaurantNotFoundException(
				"해당 메뉴 카테고리 id에 대한 식당은 존재하지 않습니다. 메뉴 카테고리 id = " + menuCategoryId));

		// 사장님에 해당하는 식당인지 검증
		if (!restaurant.getUser().getUserId().equals(user.getUserId())) {
			throw new NotAuthorizedException("해당 식당의 메뉴 수정 권한이 없습니다.");
		}

		menuCategory.updateCategoryName(menuCategoryEditRequestDto.getMenuCategoryName());
		menuCategoryRepository.save(menuCategory);
	}

	/**
	 * 메뉴 카테고리 삭제 API
	 *
	 * @param menuCategoryId 메뉴 카테고리 id
	 */
	@Override
	public void removeMenuCategory(Long menuCategoryId) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 메뉴 카테고리 id 유효성 검증
		MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(menuCategoryId)
			.orElseThrow(() -> new MenuCategoryNotFoundException(
				"해당 메뉴 카테고리 id의 메뉴 카테고리가 존재하지 않습니다. menuCategoryId = " + menuCategoryId));

		// 사장님 식당에 해당하는 메뉴 카테고리인지 유효성 검증
		if (!menuCategory.getRestaurant().getUser().getUserId().equals(user.getUserId())) {
			throw new NotAuthorizedException("메뉴 삭제 권한이 없습니다.");
		}

		// 메뉴 카테고리 삭제
		menuCategoryRepository.delete(menuCategory);
	}

}
