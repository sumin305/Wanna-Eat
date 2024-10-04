package com.waterdragon.wannaeat.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.user.domain.UserToken;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

	Optional<UserToken> findByRefreshToken(String refreshToken);

}
