package com.waterdragon.wannaeat.domain.menu.service;

import com.waterdragon.wannaeat.domain.menu.dto.request.MenuCategoryEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuCategoryRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryListResponseDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuCategoryRegisterResponseDto;

public interface MenuCategoryService {

	MenuCategoryRegisterResponseDto registerMenuCategory(MenuCategoryRegisterRequestDto menuCategoryRegisterRequestDto);

	MenuCategoryListResponseDto getListMenuCategoryByRestaurantId(Long restaurantId);

	void editMenuCategory(Long menuCategoryId, MenuCategoryEditRequestDto menuCategoryEditRequestDto);

	void removeMenuCategory(Long menuCategoryId);
}
