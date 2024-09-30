package com.waterdragon.wannaeat.domain.menu.service;

import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.dto.request.MenuEditRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.request.MenuRegisterRequestDto;
import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;

public interface MenuService {

	void registerMenu(MenuRegisterRequestDto menuRegisterRequestDto, MultipartFile multipartFile);

	MenuListResponseDto getListMenuByRestaurantId(Long restaurantId);

	void editMenu(Long menuId, MenuEditRequestDto menuEditRequestDto, MultipartFile multipartFile);

	void removeMenu(Long menuId);
}
