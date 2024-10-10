package com.waterdragon.wannaeat.domain.restaurantlike.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurantlike.domain.RestaurantLike;
import com.waterdragon.wannaeat.domain.user.domain.User;

public interface RestaurantLikeRepository extends JpaRepository<RestaurantLike, Long> {

	Optional<RestaurantLike> findByUserAndRestaurant(User user, Restaurant restaurant);

	List<RestaurantLike> findByUser(User user);
}
