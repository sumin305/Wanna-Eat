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

	private String restaurantImage;

	private Long userId;

	private String userName;

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
			.restaurantName(reservation.getRestaurant().getName())
			.restaurantImage(
				(reservation.getRestaurant().getImages() != null && !reservation.getRestaurant().getImages().isEmpty())
					? reservation.getRestaurant().getImages().get(0).getImageUrl()  // 첫 번째 이미지를 사용
					: null)  // 이미지가 없으면 null 반환
			.userId(reservation.getUser() != null ? reservation.getUser().getUserId() : null)
			.userName(reservation.getUser() != null ? reservation.getUser().getNickname() : "비회원")
			.reservationDate(reservation.getReservationDate())
			.reservationStartTime(reservation.getStartTime())
			.reservationEndTime(reservation.getEndTime())
			.memberCnt(reservation.getMemberCnt())
			.tableList(reservation.getReservationTables().stream()
				.map(ReservationTable::getTableId)  // 각 ReservationTable의 tableId를 추출
				.collect(Collectors.toList()))  // List<Integer>로 변환
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
			.restaurantName(reservation.getRestaurant().getName())
			.restaurantImage(
				(reservation.getRestaurant().getImages() != null && !reservation.getRestaurant().getImages().isEmpty())
					? reservation.getRestaurant().getImages().get(0).getImageUrl()  // 첫 번째 이미지를 사용
					: null)  // 이미지가 없으면 null 반환
			.userId(reservation.getUser() != null ? reservation.getUser().getUserId() : null)
			.userName(reservation.getUser() != null ? reservation.getUser().getNickname() : "비회원")
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
