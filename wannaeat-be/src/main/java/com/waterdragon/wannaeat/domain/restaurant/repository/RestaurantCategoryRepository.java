package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantCategory;

public interface RestaurantCategoryRepository extends JpaRepository<RestaurantCategory, Long> {
	Optional<RestaurantCategory> findByCategoryId(Long categoryId);

	List<RestaurantCategory> findAll();
}
