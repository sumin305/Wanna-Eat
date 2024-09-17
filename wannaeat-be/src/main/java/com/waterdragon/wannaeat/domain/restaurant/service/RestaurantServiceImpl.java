package com.waterdragon.wannaeat.domain.restaurant.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuDetailReponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantCategory;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantImage;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidBreakStartEndTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantCategoryException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantOpenCloseTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantCategoryRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantImageRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.global.exception.error.FileRemoveFailureException;
import com.waterdragon.wannaeat.global.exception.error.FileUploadFailureException;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;
import com.waterdragon.wannaeat.global.util.FileUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

	private final UserRepository userRepository;
	private final RestaurantRepository restaurantRepository;
	private final RestaurantCategoryRepository restaurantCategoryRepository;
	private final RestaurantImageRepository restaurantImageRepository;
	private final MenuRepository menuRepository;
	private final FileUtil fileUtil;
	private final AuthUtil authUtil;

	/**
	 * 매장 등록 메소드
	 *
	 * @param restaurantRegisterRequestDto 매장 기본 정보
	 * @return void 매장 등록 결과
	 */
	@Override
	@Transactional
	public void registerRestaurant(RestaurantRegisterRequestDto restaurantRegisterRequestDto) {

		// 인증 회원객체
		User user = authUtil.getAuthenticatedUser();

		// 사업자 등록번호 중복 체크
		String businessNumber = restaurantRegisterRequestDto.getRestaurantBusinessNumber();
		restaurantRepository.findByBusinessNumber(businessNumber)
			.ifPresent((existingRestaurant) -> {
				throw new DuplicateBusinessNumberException("사업자 등록번호 중복 : " + businessNumber);
			});

		// 미유효 식당 카테고리 체크
		Long categoryId = restaurantRegisterRequestDto.getRestaurantCategoryId();
		RestaurantCategory restaurantCategory = restaurantCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new InvalidRestaurantCategoryException("미유효 식당 카테고리 번호 : " + categoryId));

		// Restaurant 엔티티 생성 후 저장
		Restaurant restaurant = Restaurant.builder()
			.user(user)
			.businessNumber(restaurantRegisterRequestDto.getRestaurantBusinessNumber())
			.ownerName(restaurantRegisterRequestDto.getRestaurantOwnerName())
			.address(restaurantRegisterRequestDto.getRestaurantAddress())
			.phone(restaurantRegisterRequestDto.getRestaurantPhone())
			.name(restaurantRegisterRequestDto.getRestaurantName())
			.category(restaurantCategory)
			.build();
		restaurantRepository.save(restaurant);
	}

	/**
	 * 매장 상세 조회 메소드 (메뉴 포함)
	 *
	 * @param restaurantId 매장 id
	 * @return RestaurantDetailResponseDto 매장 상세 조회 결과
	 */
	@Override
	public RestaurantDetailResponseDto getDetailRestaurantByRestaurantId(Long restaurantId) {

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 매장 찾을 수 없음. restaurantId : " + restaurantId));

		// 식당 메뉴 목록 불러오기
		MenuListResponseDto menuListResponseDto = getRestaurantMenuList(restaurant);

		return RestaurantDetailResponseDto.builder()
			.restaurantBusinessNumber(restaurant.getBusinessNumber())
			.restaurantOwnerName(restaurant.getOwnerName())
			.restaurantAddress(restaurant.getAddress())
			.restaurantPhone(restaurant.getPhone())
			.restaurantName(restaurant.getName())
			.restaurantCategoryName(restaurant.getCategory().getCategoryName())
			.restaurantOpenTime(restaurant.getOpenTime())
			.restaurantCloseTime(restaurant.getCloseTime())
			.breakStartTime(restaurant.getBreakStartTime())
			.breakEndTime(restaurant.getBreakEndTime())
			.maxReservationTime(restaurant.getMaxReservationTime())
			.minMemberCount(restaurant.getMinMemberCount())
			.maxMemberCount(restaurant.getMaxMemberCount())
			.depositPerMember(restaurant.getDepositPerMember())
			.restaurantDescription(restaurant.getDescription())
			.latitude(restaurant.getLatitude())
			.longitude(restaurant.getLongitude())
			.menuListResponseDto(menuListResponseDto)
			.build();
	}

	/**
	 * 매장별 메뉴 목록 조회 메소드
	 *
	 * @param restaurantId 매장 id
	 * @return MenuListResponseDto 카테고리별 메뉴 리스트 반환
	 */
	@Override
	public MenuListResponseDto getListMenusByRestaurantId(Long restaurantId) {

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 매장 찾을 수 없음. restaurantId : " + restaurantId));

		return getRestaurantMenuList(restaurant);
	}

	/**
	 * 매장 수정 메소드
	 *
	 * @param restaurantEditRequestDto 매장 수정 정보
	 * @return void 매장 수정 결과
	 */
	@Override
	@Transactional
	public void editRestaurant(Long restaurantId, RestaurantEditRequestDto restaurantEditRequestDto,
		List<MultipartFile> multipartFiles) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(restaurantId, user)
			.orElseThrow(() -> new NotAuthorizedException("식당 수정 권한 없음."));

		// 사업자 등록번호 중복 체크 (내 식당은 빼고)
		String businessNumber = restaurantEditRequestDto.getRestaurantBusinessNumber();
		restaurantRepository.findByBusinessNumberAndRestaurantIdNot(businessNumber, restaurant.getRestaurantId())
			.ifPresent((existingRestaurant) -> {
				throw new DuplicateBusinessNumberException("사업자 등록번호 중복 : " + businessNumber);
			});

		// 미유효 식당 카테고리 체크
		Long categoryId = restaurantEditRequestDto.getRestaurantCategoryId();
		RestaurantCategory restaurantCategory = restaurantCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new InvalidRestaurantCategoryException("미유효 식당 카테고리 번호 : " + categoryId));

		// 식당 시간 순서 체크
		if (restaurantEditRequestDto.getRestaurantCloseTime()
			.isBefore(restaurantEditRequestDto.getRestaurantOpenTime())) {
			throw new InvalidRestaurantOpenCloseTimeException("매장 마감 시간은 오픈 시간 이후여야 합니다.");
		}

		// 브레이크타임 시간 순서 체크
		if (restaurantEditRequestDto.getBreakEndTime().isBefore(restaurantEditRequestDto.getBreakStartTime())) {
			throw new InvalidBreakStartEndTimeException("브레이크타임 종료 시간은 브레이크타임 시작 시간 이후여야 합니다.");
		}

		// Restaurant 엔티티 수정 후 저장
		restaurant.update(
			restaurantCategory,
			restaurantEditRequestDto.getRestaurantBusinessNumber(),
			restaurantEditRequestDto.getRestaurantOwnerName(),
			restaurantEditRequestDto.getRestaurantName(),
			restaurantEditRequestDto.getRestaurantAddress(),
			restaurantEditRequestDto.getRestaurantPhone(),
			restaurantEditRequestDto.getRestaurantOpenTime(),
			restaurantEditRequestDto.getRestaurantCloseTime(),
			restaurantEditRequestDto.getBreakStartTime(),
			restaurantEditRequestDto.getBreakEndTime(),
			restaurantEditRequestDto.getMaxReservationTime(),
			restaurantEditRequestDto.getMinMemberCount(),
			restaurantEditRequestDto.getMaxMemberCount(),
			restaurantEditRequestDto.getDepositPerMember(),
			restaurantEditRequestDto.getRestaurantDescription(),
			restaurantEditRequestDto.getLatitude(),
			restaurantEditRequestDto.getLongitude());
		restaurantRepository.save(restaurant);

		// 기존 사진 삭제 (파일, db 모두)
		deleteExistingRestaurantImage(restaurant);

		// 매장 사진 등록 및 수정
		uploadNewRestaurantImages(restaurant, multipartFiles);
	}

	/**
	 * 기존 매장 사진 삭제 메소드
	 *
	 * @param restaurant 매장
	 */
	private void deleteExistingRestaurantImage(Restaurant restaurant) {

		List<RestaurantImage> existingRestaurantImages = restaurantImageRepository.findAllByRestaurant(restaurant);

		for (RestaurantImage existingRestaurantImage : existingRestaurantImages) {
			try {
				fileUtil.removeFile("restaurants", existingRestaurantImage.getImageUrl());
			} catch (IOException e) {
				throw new FileRemoveFailureException("파일 삭제 실패. 파일 이름 : " + existingRestaurantImage.getImageUrl());
			}

			restaurantImageRepository.delete(existingRestaurantImage);
		}
	}

	/**
	 * 새로운 매장 사진들 등록 메소드
	 *
	 * @param restaurant 매장
	 * @param multipartFiles 사진 파일들
	 */
	private void uploadNewRestaurantImages(Restaurant restaurant, List<MultipartFile> multipartFiles) {

		List<String> uploadedRestaurantImageFileNames = new ArrayList<>();

		try {
			for (MultipartFile file : multipartFiles) {
				String uploadedRestaurantImageFileName = fileUtil.saveFile(file, "restaurants");
				if (uploadedRestaurantImageFileName != null) {
					uploadedRestaurantImageFileNames.add(uploadedRestaurantImageFileName);

					RestaurantImage restaurantImage = RestaurantImage.builder()
						.restaurant(restaurant)
						.imageUrl(uploadedRestaurantImageFileName)
						.build();
					restaurantImageRepository.save(restaurantImage);
				}
			}
		} catch (IOException e) {

			// 파일 여러장을 올리다가 실패했을 때, 기존 올라갔던 파일 삭제 로직
			for (String fileName : uploadedRestaurantImageFileNames) {
				try {
					fileUtil.removeFile("restaurants", fileName);
				} catch (IOException ex) {
					throw new FileRemoveFailureException("파일 삭제 실패. 파일 이름 : " + fileName);
				}
			}
			throw new FileUploadFailureException("파일 업로드 실패 : " + e.getMessage());
		}
	}

	/**
	 * 매장별 메뉴 목록 조회 메소드
	 *
	 * @param restaurant 매장
	 * @return
	 */
	private MenuListResponseDto getRestaurantMenuList(Restaurant restaurant) {

		// restaurant에 해당하는 모든 메뉴 불러오기
		List<Menu> menus = menuRepository.findAllByRestaurantAndDeletedFalse(restaurant);

		// 카테고리별 메뉴 그룹화
		Map<String, List<MenuDetailReponseDto>> map = new HashMap<>();
		for (Menu menu : menus) {
			// 해당 메뉴 카테고리 추출
			String menuCategoryName = menu.getMenuCategory().getCategoryName();

			// 반환 객체 MenuDetailResponseDto 생성
			MenuDetailReponseDto menuDetailReponseDto = MenuDetailReponseDto.builder()
				.menuId(menu.getMenuId())
				.menuName(menu.getName())
				.menuPrice(menu.getPrice())
				.menuImage(menu.getImage())
				.menuDescription(menu.getDescription())
				.build();

			// 카테고리 Key 있는지 여부 확인해서 처리
			if (!map.containsKey(menuCategoryName)) {
				map.put(menuCategoryName, new ArrayList<>());
			}
			map.get(menuCategoryName).add(menuDetailReponseDto);
		}

		return MenuListResponseDto.builder()
			.menusMap(map)
			.build();
	}
}
