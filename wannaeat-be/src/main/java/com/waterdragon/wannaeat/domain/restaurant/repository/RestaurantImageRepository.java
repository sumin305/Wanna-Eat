package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantImage;

public interface RestaurantImageRepository extends JpaRepository<RestaurantImage, Long> {

	List<RestaurantImage> findAllByRestaurant(Restaurant restaurant);
}
