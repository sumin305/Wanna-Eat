package com.waterdragon.wannaeat.domain.cart.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.waterdragon.wannaeat.domain.cart.domain.Cart;

public interface CartRepository extends MongoRepository<Cart, Long> {
}
