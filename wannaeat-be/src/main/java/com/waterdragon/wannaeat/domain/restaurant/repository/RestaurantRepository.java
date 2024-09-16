package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.User;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	Optional<Restaurant> findByRestaurantIdAndUser(Long restaurantId, User user);

	Optional<Restaurant> findByBusinessNumber(String businessNumber);

	Optional<Restaurant> findByBusinessNumberAndRestaurantIdNot(String businessNumber, Long restaurantId);
}
