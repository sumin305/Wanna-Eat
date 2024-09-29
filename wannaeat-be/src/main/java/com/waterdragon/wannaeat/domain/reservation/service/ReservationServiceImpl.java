package com.waterdragon.wannaeat.domain.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationTableRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantStructureRepository;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final RestaurantStructureRepository restaurantStructureRepository;
	@Value("${redirectURL}")
	private String REDIRECT_URL;

	@Value("${RESERVATION_URL}")
	private String RESERVATION_URL;

	private final ReservationRepository reservationRepository;
	private final RestaurantRepository restaurantRepository;
	private final UserRepository userRepository;
	private final ReservationTableRepository reservationTableRepository;

	@Override
	public UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto) {

		log.info("예약 url : " + urlValidationRequestDto.getReservationUrl());
		Reservation reservation = reservationRepository.findByReservationUrl(
				urlValidationRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 예약은 만료되었거나, 퇴실 완료 처리 되었습니다. reservationUrl : " + urlValidationRequestDto.getReservationUrl()));

		return UrlValidationResponseDto.builder()
			.reservationId(reservation.getReservationId())
			.build();
	}

	/**
	 * 예약 테이블 등록 메소드
	 *
	 * @param reservation 대상 예약
	 * @param tableNumbers 예약 테이블 목록
	 */
	@Override
	@Transactional
	public void registerReservationTable(Reservation reservation, List<Integer> tableNumbers) {
		for (Integer tableNumber : tableNumbers) {
			reservationTableRepository.saveAndFlush(ReservationTable.builder()
				.reservation(reservation)
				.tableId(tableNumber)
				.build());
			log.info("테이블등록" + tableNumber);
		}
	}

}
