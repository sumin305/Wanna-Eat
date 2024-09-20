package com.waterdragon.wannaeat.domain.restaurantlike.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantImage;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantImageRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurantlike.domain.RestaurantLike;
import com.waterdragon.wannaeat.domain.restaurantlike.dto.response.UserLikeDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurantlike.dto.response.UserLikeListResponseDto;
import com.waterdragon.wannaeat.domain.restaurantlike.exception.error.AlreadyLikeException;
import com.waterdragon.wannaeat.domain.restaurantlike.exception.error.LikeNotFoundException;
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
	private final RestaurantImageRepository restaurantImageRepository;
	private final ReservationRepository reservationRepository;

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

	/**
	 * 찜한 식당 목록 조회 메소드
	 * TODO: 추후 JPQL이나 QueryDSL로 성능 개선해볼 것
	 *
	 * @return UserLikeResponseDto 조회한 매장 목록 정보
	 */
	@Override
	public UserLikeListResponseDto getListUserLikeRestaurant() {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		List<UserLikeDetailResponseDto> userLikeDetailResponseDtos = new ArrayList<>();

		// restaurant_likes 테이블에서 해당 user의 찜 식당을 모두 찾음.
		List<RestaurantLike> restaurantLikes = restaurantLikeRepository.findByUser(user);
		for (RestaurantLike restaurantLike : restaurantLikes) {
			Restaurant restaurant = restaurantLike.getRestaurant();

			Optional<RestaurantImage> restaurantImageUrlOptional = restaurantImageRepository.findTopByRestaurantOrderByImageIdAsc(restaurant);
			String restaurantImageUrl = restaurantImageUrlOptional
				.map(RestaurantImage::getImageUrl)
				.orElse("");

			int userReservationCnt = reservationRepository.countByUserAndRestaurant(user, restaurant);

			UserLikeDetailResponseDto dto = UserLikeDetailResponseDto.builder()
				.restaurantId(restaurant.getRestaurantId())
				.restaurantName(restaurant.getName())
				.restaurantDescription(restaurant.getDescription())
				.restaurantImageUrl(restaurantImageUrl)
				.restaurantLike(true) // 이미 좋아요 한 식당이므로 true 설정
				.userReservationCnt(userReservationCnt)
				.build();

			userLikeDetailResponseDtos.add(dto);
		}

		return UserLikeListResponseDto.builder()
			.userLikeDetailResponseDtos(userLikeDetailResponseDtos)
			.build();
	}

	/**
	 * 찜 삭제 메소드
	 *
	 * @param restaurantId 매장 id
	 */
	@Override
	@Transactional
	public void removeRestaurantLike(Long restaurantId) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 매장 찾을 수 없음. restaurantId : " + restaurantId));

		// 이미 찜한 매장
		RestaurantLike restaurantLike = restaurantLikeRepository.findByUserAndRestaurant(user, restaurant)
			.orElseThrow(() -> new LikeNotFoundException("해당 매장 찜 존재안함. restaurantId : " + restaurantId));

		// 찜 삭제
		restaurantLikeRepository.delete(restaurantLike);
	}
}
