package com.waterdragon.wannaeat.domain.restaurant.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantCategory;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantImage;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidBreakTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantCategoryException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantTimeException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantCategoryRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantImageRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
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
	 * 매장 수정 메소드
	 *
	 * @param restaurantEditRequestDto 매장 수정 정보
	 * @return void 매장 수정 결과
	 */
	@Override
	@Transactional
	public void editRestaurant(Long restaurantId, RestaurantEditRequestDto restaurantEditRequestDto, List<MultipartFile> multipartFiles) {
		
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
		if (restaurantEditRequestDto.getRestaurantCloseTime().isBefore(restaurantEditRequestDto.getRestaurantOpenTime())) {
			throw new InvalidRestaurantTimeException("매장 마감 시간은 오픈 시간 이후여야 합니다.");
		}
		
		// 브레이크타임 시간 순서 체크
		if (restaurantEditRequestDto.getBreakEndTime().isBefore(restaurantEditRequestDto.getBreakStartTime())) {
			throw new InvalidBreakTimeException("브레이크타임 종료 시간은 브레이크타임 시작 시간 이후여야 합니다.");
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
		List<RestaurantImage> existingRestaurantImages = restaurantImageRepository.findAllByRestaurant(restaurant);

		for (RestaurantImage existingRestaurantImage : existingRestaurantImages) {
			try {
				fileUtil.removeFile("restaurants", existingRestaurantImage.getImageUrl());
			} catch (IOException e) {
				log.error("기존 이미지 삭제 작업중 실패 : {}", existingRestaurantImage.getImageUrl(), e);
			}

			restaurantImageRepository.delete(existingRestaurantImage);
		}

		// 매장 사진 등록 및 수정
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
					log.error("파일 삭제 작업 중 실패 : {}", fileName, ex);
				}
			}
			throw new FileUploadFailureException("파일 업로드 실패 : " + e.getMessage());
		}

	}
}
