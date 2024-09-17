package com.waterdragon.wannaeat.domain.menu.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.domain.MenuCategory;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.exception.error.InvalidMenuCategoryException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotBelongToRestaurantException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotFoundException;
import com.waterdragon.wannaeat.domain.menu.repository.MenuCategoryRepository;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.exception.error.FileRemoveFailureException;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;
import com.waterdragon.wannaeat.global.util.FileUtil;

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
	private final FileUtil fileUtil;
	private final MenuRepository menuRepository;

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

		// 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(menuRegisterRequestDto.getRestaurantId(),
				user)
			.orElseThrow(() -> new NotAuthorizedException("메뉴 등록 권한 없음."));

		// 미유효 메뉴 카테고리 체크
		Long categoryId = menuRegisterRequestDto.getMenuCategoryId();
		MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new InvalidMenuCategoryException("미유효 식당 카테고리 번호 : " + categoryId));

		// 식당 카테고리에 맞는 메뉴 카테고리인지 확인
		if (menuCategory.getRestaurantCategory() != restaurant.getCategory()) {
			throw new MenuNotBelongToRestaurantException("해당 메뉴는 식당에 존재하지 않음. : " + menuCategory.getCategoryName());
		}

		// 메뉴 사진 등록
		String uploadedMenuImageFileName = null;
		try {
			uploadedMenuImageFileName = fileUtil.saveFile(multipartFile, "menus");
		} catch (IOException e) {
			log.error("파일 업로드 작업 실패 : {}", multipartFile.getOriginalFilename(), e);
		}

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

		// 메뉴 존재 확인
		Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuId)
			.orElseThrow(() -> new MenuNotFoundException("메뉴id에 해당하는 메뉴 존재하지 않음. : " + menuId));

		// 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(menuEditRequestDto.getRestaurantId(),
				user)
			.orElseThrow(() -> new NotAuthorizedException("메뉴 수정 권한 없음."));

		// 미유효 메뉴 카테고리 체크
		Long categoryId = menuEditRequestDto.getMenuCategoryId();
		MenuCategory menuCategory = menuCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new InvalidMenuCategoryException("미유효 식당 카테고리 번호 : " + categoryId));

		// 식당 카테고리에 맞는 메뉴 카테고리인지 확인
		if (menuCategory.getRestaurantCategory() != restaurant.getCategory()) {
			throw new MenuNotBelongToRestaurantException("해당 메뉴는 식당에 존재하지 않음. : " + menuCategory.getCategoryName());
		}

		// 기존 메뉴 사진 삭제
		try {
			fileUtil.removeFile("menus", menu.getImage());
		} catch (IOException e) {
			throw new FileRemoveFailureException("파일 삭제 실패. 파일 이름 : " + menu.getImage());
		}

		// 새로운 메뉴 사진 등록
		String uploadedMenuImageFileName = null;
		try {
			uploadedMenuImageFileName = fileUtil.saveFile(multipartFile, "menus");
		} catch (IOException e) {
			log.error("파일 업로드 작업 실패 : {}", multipartFile.getOriginalFilename(), e);
		}

		// 메뉴 엔티티 수정 후 저장
		menu.update(menuCategory, menuEditRequestDto.getMenuName(), menuEditRequestDto.getMenuPrice(),
			uploadedMenuImageFileName, menuEditRequestDto.getMenuDescription());
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

		// 메뉴 찾기
		Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuId)
			.orElseThrow(() -> new MenuNotFoundException("해당 id의 메뉴를 찾을 수 없습니다. 메뉴 id : " + menuId));

		// 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(menu.getRestaurant().getRestaurantId(),
				user)
			.orElseThrow(() -> new NotAuthorizedException("메뉴 삭제 권한 없음."));

		// 메뉴 이미지 삭제
		String menuImageFileName = menu.getImage();
		if (menuImageFileName != null) {
			try {
				fileUtil.removeFile("menus", menuImageFileName);
			} catch (IOException e) {
				throw new FileRemoveFailureException("파일 삭제 실패. 파일 이름 : " + menuImageFileName);
			}
		}

		// 메뉴 삭제
		menuRepository.delete(menu);
	}
}
