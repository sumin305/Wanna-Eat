package com.waterdragon.wannaeat.domain.menu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.menu.domain.MenuCategory;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {

	Optional<MenuCategory> findByCategoryId(Long categoryId);
}
