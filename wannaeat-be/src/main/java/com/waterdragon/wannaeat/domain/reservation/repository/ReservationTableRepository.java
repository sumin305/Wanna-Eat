package com.waterdragon.wannaeat.domain.reservation.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;

import io.lettuce.core.dynamic.annotation.Param;

public interface ReservationTableRepository extends JpaRepository<ReservationTable, Long> {

	@Query("SELECT rt FROM ReservationTable rt " +
		"JOIN rt.reservation r " +
		"WHERE r.restaurant.restaurantId = :restaurantId " +
		"AND r.reservationDate = :reservationDate " +
		"AND ((r.endTime > :startTime AND r.startTime < :endTime) " +  // 겹치는 경우 필터링
		"OR (r.endTime = :startTime) " +  // 기존 예약의 종료 시간이 내 예약의 시작 시간과 같을 때 허용
		"OR (r.startTime = :endTime)) " + // 기존 예약의 시작 시간이 내 예약의 종료 시간과 같을 때 허용
		"AND r.cancelled = false")
		// 해당 식당의 검색 startTime ~ 검색 endTime의 모든 예약 테이블 정보들을 모두 불러온다. 겹치는 애들도 다 불러옴.
	List<ReservationTable> findReservedTables(
		@Param("restaurantId") Long restaurantId,
		@Param("reservationDate") LocalDate reservationDate,
		@Param("startTime") LocalTime startTime,
		@Param("endTime") LocalTime endTime
	);
}
