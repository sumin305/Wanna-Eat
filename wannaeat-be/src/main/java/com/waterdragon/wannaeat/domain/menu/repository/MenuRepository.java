package com.waterdragon.wannaeat.domain.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
