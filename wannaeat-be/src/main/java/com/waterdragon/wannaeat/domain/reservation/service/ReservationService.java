package com.waterdragon.wannaeat.domain.reservation.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.dto.request.QrGenerateRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerReservationSummaryResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

public interface ReservationService {

	UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto,
		String participantIdFromCookie);

	ReservationDetailResponseDto registerReservation(ReservationRegisterRequestDto reservationRegisterRequestDto);

	Page<ReservationDetailResponseDto> getListReservation(Pageable pageable);

	ManagerReservationSummaryResponseDto getListReservationByRestaurantAndDate(LocalDate date, Pageable pageable);

	List<ReservationCountResponseDto> getListReservationCount(int year, int month);

	void registerReservationTable(Reservation reservation, List<Integer> tableNumbers);

	void removeReservation(Long reservationId);

	void editReservation(UrlValidationRequestDto urlValidationRequestDto);

	List<Integer> getListNotReservedTableNumber(Long restaurantId, LocalDate localDate, LocalTime startTime,
		LocalTime endTime);

	Object generateEnterQrcode(QrGenerateRequestDto qrGenerateRequestDto);

	Restaurant validateQr(String token);

	String generateRandomString();

	ManagerReservationDetailResponseDto getReservationListByManager(Long reservationId);
}
