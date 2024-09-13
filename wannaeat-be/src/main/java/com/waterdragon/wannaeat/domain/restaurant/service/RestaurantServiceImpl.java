package com.waterdragon.wannaeat.domain.restaurant.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantCategory;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantCategoryException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantCategoryRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

	private final UserRepository userRepository;
	private final RestaurantRepository restaurantRepository;
	private final RestaurantCategoryRepository restaurantCategoryRepository;

	/**
	 * 매장 등록 메소드
	 *
	 * @param restaurantRegisterRequestDto 매장 기본 정보
	 * @return void 매장 등록 결과
	 */
	@Override
	@Transactional
	public void registerRestaurant(RestaurantRegisterRequestDto restaurantRegisterRequestDto) {

		User user = userRepository.findByUserIdAndDeletedFalse((long)1).get();

		String businessNumber = restaurantRegisterRequestDto.getRestaurantBusinessNumber();
		restaurantRepository.findByBusinessNumber(businessNumber)
			.ifPresent((existingRestaurant) -> {
				throw new DuplicateBusinessNumberException("사업자 등록번호 중복 : " + businessNumber);
			});

		Long categoryId = restaurantRegisterRequestDto.getRestaurantCategoryId();
		RestaurantCategory restaurantCategory = restaurantCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new InvalidRestaurantCategoryException("미유효 식당 카테고리 번호 : " + categoryId));

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
}
