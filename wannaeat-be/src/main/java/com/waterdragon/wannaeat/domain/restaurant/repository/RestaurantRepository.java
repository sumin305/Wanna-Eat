package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.User;

import jakarta.persistence.LockModeType;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, RestaurantCustomRepository {

	Optional<Restaurant> findByRestaurantId(Long restaurantId);

	Optional<Restaurant> findByUser(User user);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT r FROM Restaurant r WHERE r.restaurantId = :restaurantId")
	Optional<Restaurant> findByRestaurantIdWithLock(@Param("restaurantId") Long restaurantId);

	Optional<Restaurant> findByRestaurantIdAndUser(Long restaurantId, User user);

	Optional<Restaurant> findByBusinessNumber(String businessNumber);

	Optional<Restaurant> findByBusinessNumberAndRestaurantIdNot(String businessNumber, Long restaurantId);
}
