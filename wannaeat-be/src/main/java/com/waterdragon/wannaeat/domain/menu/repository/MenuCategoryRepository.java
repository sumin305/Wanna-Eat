package com.waterdragon.wannaeat.domain.menu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.menu.domain.MenuCategory;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {

	Optional<MenuCategory> findByCategoryId(Long categoryId);

	List<MenuCategory> findAllByRestaurant(Restaurant restaurant);
}
