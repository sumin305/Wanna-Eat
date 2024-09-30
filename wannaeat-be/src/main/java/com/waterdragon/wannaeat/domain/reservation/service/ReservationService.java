package com.waterdragon.wannaeat.domain.reservation.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.dto.request.QrGenerateRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationEditRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;

public interface ReservationService {

	UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto);

	ReservationDetailResponseDto registerReservation(ReservationRegisterRequestDto reservationRegisterRequestDto);

	Page<ReservationDetailResponseDto> getListReservation(Pageable pageable);

	List<ReservationDetailResponseDto> getListReservationByDate(LocalDate date);

	List<ReservationCountResponseDto> getListReservationCount(int year, int month);

	void editReservation(ReservationEditRequestDto reservationEditRequestDto);

	void registerReservationTable(Reservation reservation, List<Integer> tableNumbers);

	List<Integer> getListNotReservedTableNumber(Long restaurantId, LocalDate localDate, LocalTime startTime,
		LocalTime endTime);

	Object generateEnterQrcode(QrGenerateRequestDto qrGenerateRequestDto);

	String generateRandomString();
}
