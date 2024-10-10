package com.waterdragon.wannaeat.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.SocialType;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUserId(Long userId);

	Optional<User> findByUserIdAndDeletedFalse(Long id);

	Optional<User> findByEmail(String email);

	Optional<User> findByEmailAndSocialType(String email, SocialType socialType);

	Optional<User> findByNickname(String nickname);

	Optional<User> findByPhoneAndSocialTypeAndDeletedFalse(String phone, SocialType socialType);
}
