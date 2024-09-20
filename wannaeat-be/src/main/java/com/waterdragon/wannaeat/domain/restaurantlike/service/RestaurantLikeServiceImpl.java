package com.waterdragon.wannaeat.domain.restaurantlike.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurantlike.domain.RestaurantLike;
import com.waterdragon.wannaeat.domain.restaurantlike.exception.error.AlreadyLikeException;
import com.waterdragon.wannaeat.domain.restaurantlike.repository.RestaurantLikeRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantLikeServiceImpl implements RestaurantLikeService {

	private final AuthUtil authUtil;
	private final RestaurantRepository restaurantRepository;
	private final RestaurantLikeRepository restaurantLikeRepository;

	/**
	 * 찜 등록 메소드
	 *
	 * @param restaurantId 매장 id
	 */
	@Override
	@Transactional
	public void registerRestaurantLike(Long restaurantId) {

		// 인증된 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 매장 찾을 수 없음. restaurantId : " + restaurantId));

		// 이미 찜한 매장
		restaurantLikeRepository.findByUserAndRestaurant(user, restaurant)
			.ifPresent(like -> {
				throw new AlreadyLikeException("이미 매장 찜이 등록되어있습니다.");
			});

		// 찜 등록
		RestaurantLike restaurantLike = RestaurantLike.builder()
			.user(user)
			.restaurant(restaurant)
			.build();
		restaurantLikeRepository.save(restaurantLike);
	}
}
