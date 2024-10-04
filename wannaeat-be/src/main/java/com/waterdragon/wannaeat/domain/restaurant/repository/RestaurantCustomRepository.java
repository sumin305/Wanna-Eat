package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.List;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantFilter;

public interface RestaurantCustomRepository {

	public List<Restaurant> findRestaurantsByFilter(RestaurantFilter filter);
}
