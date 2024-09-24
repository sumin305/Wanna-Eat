package com.waterdragon.wannaeat.domain.alarm.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waterdragon.wannaeat.domain.alarm.domain.Alarm;
import com.waterdragon.wannaeat.domain.user.domain.User;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

	Optional<List<Alarm>> findByUser(User user);

}
