package com.waterdragon.wannaeat.domain.alarm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.waterdragon.wannaeat.domain.alarm.domain.Alarm;
import com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto;
import com.waterdragon.wannaeat.domain.user.domain.User;

import io.lettuce.core.dynamic.annotation.Param;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

	Optional<List<Alarm>> findByUser(User user);

	@Query("SELECT new com.waterdragon.wannaeat.domain.alarm.dto.response.AlarmGetResponseDto(" +
		"a.type, " +
		"a.reservation.reservationId, " +
		"COALESCE(a.menu.name, NULL), " +
		"COALESCE(a.menu.image, 'https://wannaeat.s3.ap-northeast-2.amazonaws.com/df11e06e-2fb3-4315-8ce3-bc472362fadf-logo.png'), "
		+
		"a.reservation.memberCnt, " +  // 예약 인원 추가
		"a.registTime) " +
		"FROM Alarm a " +
		"LEFT JOIN a.menu " +
		"WHERE a.user.userId = :userId " +
		"ORDER BY a.registTime DESC")
	List<AlarmGetResponseDto> findAlarmsByUserId(@Param("userId") Long userId);
}
