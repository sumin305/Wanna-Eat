package com.waterdragon.wannaeat.domain.menu.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.domain.MenuCategory;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuDetailResponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListByCategoryResponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuCategoryNotFoundException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotBelongToRestaurantException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotFoundException;
import com.waterdragon.wannaeat.domain.menu.repository.MenuCategoryRepository;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantCategoryRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;
import com.waterdragon.wannaeat.global.util.S3Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

	private final RestaurantRepository restaurantRepository;
	private final MenuCategoryRepository menuCategoryRepository;
	private final AuthUtil authUtil;
	private final S3Util fileUtil;
	private final MenuRepository menuRepository;
	private final RestaurantCategoryRepository restaurantCategoryRepository;

	/**
	 * 메뉴 등록 메소드
	 *
	 * @param menuRegisterRequestDto 메뉴 등록 정보
	 * @param multipartFile 메뉴 사진
	 */
	@Override
	@Transactional
	public void registerMenu(MenuRegisterRequestDto menuRegisterRequestDto, MultipartFile multipartFile) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 식당 존재여부 및 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(menuRegisterRequestDto.getRestaurantId(),
				user)
			.orElseThrow(() -> new NotAuthorizedException("메뉴 등록 권한 없음."));

		// 미유효 메뉴 카테고리 체크
		Long categoryId = menuRegisterRequestDto.getMenuCategoryId();
		MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new MenuCategoryNotFoundException("미유효 식당 카테고리 번호 : " + categoryId));

		// 식당에 맞는 메뉴 카테고리인지 확인
		if (!menuCategory.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId())) {
			throw new MenuNotBelongToRestaurantException(
				"해당 메뉴 카테고리는 식당에 존재하지 않음. : " + menuCategory.getCategoryName());
		}

		// 메뉴 사진 등록
		String uploadedMenuImageFileName = fileUtil.uploadFile(multipartFile);

		// Menu 엔티티 생성 후 저장
		Menu menu = Menu.builder()
			.restaurant(restaurant)
			.menuCategory(menuCategory)
			.name(menuRegisterRequestDto.getMenuName())
			.price(menuRegisterRequestDto.getMenuPrice())
			.image(uploadedMenuImageFileName)
			.description(menuRegisterRequestDto.getMenuDescription())
			.build();
		menuRepository.save(menu);
	}

	/**
	 * 식당별 메뉴 목록 조회 메소드
	 *
	 * @param restaurantId 식당 id
	 * @return MenuListResponseDto 메뉴 목록
	 */
	@Override
	public MenuListResponseDto getListMenuByRestaurantId(Long restaurantId) {

		// restaurantId 유효성 검증
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다. 식당 id : " + restaurantId));

		// 해당 식당의 모든 메뉴들을 조회
		List<Menu> menus = menuRepository.findAllByRestaurantAndDeletedFalse(restaurant);

		// 메뉴를 menuCategoryId를 기준으로 그룹화
		Map<Long, List<MenuDetailResponseDto>> categorizedMenus = new HashMap<>();

		for (Menu menu : menus) {
			Long categoryId = menu.getMenuCategory().getCategoryId();
			MenuDetailResponseDto menuDetailResponseDto = MenuDetailResponseDto.builder()
				.menuId(menu.getMenuId())
				.menuName(menu.getName())
				.menuPrice(menu.getPrice())
				.menuImage(menu.getImage())
				.menuDescription(menu.getDescription())
				.build();

			// categoryId 기준 Map 저장
			categorizedMenus.computeIfAbsent(categoryId, k -> new ArrayList<>()).add(menuDetailResponseDto);
		}

		// 카테고리별로 그룹화된 메뉴 리스트를 MenuListByCategoryResponseDto로 변환
		List<MenuListByCategoryResponseDto> menuListByCategoryResponseDtos = new ArrayList<>();

		for (Map.Entry<Long, List<MenuDetailResponseDto>> entry : categorizedMenus.entrySet()) {
			Long categoryId = entry.getKey();
			List<MenuDetailResponseDto> menuDetailResponseDtos = entry.getValue();

			// 메뉴 카테고리 이름 찾기
			MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(categoryId)
				.orElseThrow(
					() -> new MenuCategoryNotFoundException("해당 메뉴 카테고리가 존재하지 않습니다. 메뉴 카테고리 id : " + categoryId));
			String categoryName = menuCategory.getCategoryName();

			// MenuListByCategoryResponseDto 생성
			MenuListByCategoryResponseDto menuListByCategoryResponseDto = MenuListByCategoryResponseDto.builder()
				.menuCategoryName(categoryName)
				.menuDetailResponseDtos(menuDetailResponseDtos)
				.build();

			// menuListByCategoryResponseDtos에 추가
			menuListByCategoryResponseDtos.add(menuListByCategoryResponseDto);
		}

		// MenuListResponseDto 생성 및 반환
		return MenuListResponseDto.builder()
			.menuListByCategoryResponseDtos(menuListByCategoryResponseDtos)
			.build();
	}

	/**
	 * 메뉴 수정 메소드
	 *
	 * @param menuId 메뉴 id
	 * @param menuEditRequestDto 메뉴 수정 정보
	 * @param multipartFile 메뉴 수정 사진
	 */
	@Override
	@Transactional
	public void editMenu(Long menuId, MenuEditRequestDto menuEditRequestDto, MultipartFile multipartFile) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 메뉴 id 유효성 검증
		Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuId)
			.orElseThrow(() -> new MenuNotFoundException("메뉴id에 해당하는 메뉴 존재하지 않음. : " + menuId));

		// 식당 존재 여부 및 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(menuEditRequestDto.getRestaurantId(),
				user)
			.orElseThrow(() -> new NotAuthorizedException("메뉴 수정 권한 없음."));

		// 미유효 메뉴 카테고리 체크
		Long categoryId = menuEditRequestDto.getMenuCategoryId();
		MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new MenuCategoryNotFoundException("미유효 식당 카테고리 번호 : " + categoryId));

		// 식당에 맞는 메뉴 카테고리인지 확인
		if (!menuCategory.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId())) {
			throw new MenuNotBelongToRestaurantException("해당 메뉴는 식당에 존재하지 않음. : " + menuCategory.getCategoryName());
		}

		String menuImage = menu.getImage();

		if (multipartFile != null) {
			// 기존 메뉴 사진 삭제
			if (menu.getImage() != null) {
				fileUtil.deleteFile(menu.getImage());
				log.info("deleted file : " + menu.getImage());
			}

			// 새로운 메뉴 사진 등록
			menuImage = fileUtil.uploadFile(multipartFile);
			log.info("uplaoded file : " + menu.getImage());
		}

		// 메뉴 엔티티 수정 후 저장
		menu.update(menuCategory, menuEditRequestDto.getMenuName(), menuEditRequestDto.getMenuPrice(),
			menuImage, menuEditRequestDto.getMenuDescription());
		menuRepository.save(menu);
	}

	/**
	 * 메뉴 삭제 메소드
	 *
	 * @param menuId 메뉴 id
	 */
	@Override
	@Transactional
	public void removeMenu(Long menuId) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 메뉴 id 검증
		Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuId)
			.orElseThrow(() -> new MenuNotFoundException("해당 id의 메뉴를 찾을 수 없습니다. 메뉴 id : " + menuId));

		// 식당 존재 여부 및 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(menu.getRestaurant().getRestaurantId(),
				user)
			.orElseThrow(() -> new NotAuthorizedException("메뉴 삭제 권한 없음."));

		// 메뉴 삭제
		menu.delete();
		menuRepository.save(menu);
	}
}
