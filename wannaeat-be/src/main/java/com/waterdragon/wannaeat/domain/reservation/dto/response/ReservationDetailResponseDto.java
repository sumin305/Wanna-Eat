package com.waterdragon.wannaeat.domain.reservation.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationDetailResponseDto {

	private Long reservationId;

	private Long restaurantId;

	private String restaurantName;

	private LocalDate reservationDate;

	private LocalTime reservationStartTime;

	private LocalTime reservationEndTime;

	private Integer memberCnt;

	private List<Integer> tableList;

	private LocalDateTime registTime;

	private boolean cancelled;

	private String reservationUrl;

	public static ReservationDetailResponseDto transferToReservationDetailResponseDto(Reservation reservation) {

		return ReservationDetailResponseDto.builder()
			.reservationId(reservation.getReservationId())
			.restaurantId(reservation.getRestaurant().getRestaurantId())
			.restaurantName(builder().restaurantName)
			.reservationDate(reservation.getReservationDate())
			.reservationStartTime(reservation.getStartTime())
			.reservationEndTime(reservation.getEndTime())
			.memberCnt(reservation.getMemberCnt())
			.tableList(reservation.getReservationTables().stream()
				.map(ReservationTable::getTableId)  // 각 ReservationTable의 tableId를 추출
				.collect(Collectors.toList()))  // List<Integer>로 변환)
			.registTime(reservation.getRegistTime())
			.cancelled(reservation.isCancelled())
			.reservationUrl(reservation.getReservationUrl())
			.build();
	}

	public static ReservationDetailResponseDto transferToReservationDetailResponseDto(Reservation reservation,
		List<Integer> tableList) {

		return ReservationDetailResponseDto.builder()
			.reservationId(reservation.getReservationId())
			.restaurantId(reservation.getRestaurant().getRestaurantId())
			.restaurantName(builder().restaurantName)
			.reservationDate(reservation.getReservationDate())
			.reservationStartTime(reservation.getStartTime())
			.reservationEndTime(reservation.getEndTime())
			.memberCnt(reservation.getMemberCnt())
			.tableList(tableList)
			.registTime(reservation.getRegistTime())
			.cancelled(reservation.isCancelled())
			.reservationUrl(reservation.getReservationUrl())
			.build();
	}
}
