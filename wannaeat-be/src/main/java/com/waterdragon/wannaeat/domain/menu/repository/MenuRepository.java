package com.waterdragon.wannaeat.domain.menu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	Optional<Menu> findByMenuIdAndDeletedFalse(Long MenuId);

	List<Menu> findAllByRestaurantAndDeletedFalse(Restaurant restaurant);
}
