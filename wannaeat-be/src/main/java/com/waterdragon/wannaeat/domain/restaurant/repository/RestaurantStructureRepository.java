package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;

public interface RestaurantStructureRepository extends MongoRepository<RestaurantStructure, Long> {

	Optional<RestaurantStructure> findByRestaurantId(Long restaurantId);
}
