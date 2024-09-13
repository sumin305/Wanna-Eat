package com.waterdragon.wannaeat.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUserIdAndDeletedFalse(Long id);
}
