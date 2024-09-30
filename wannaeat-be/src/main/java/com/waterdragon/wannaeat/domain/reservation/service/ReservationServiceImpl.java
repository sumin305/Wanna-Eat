package com.waterdragon.wannaeat.domain.reservation.service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationEditRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.exception.error.AlreadyCancelledReservationException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.DuplicateReservationTableException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationTableRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterTimeSequenceException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantStructureNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantStructureRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final RestaurantStructureRepository restaurantStructureRepository;
	private final AuthUtil authUtil;
	@Value("${redirectURL}")
	private String REDIRECT_URL;

	@Value("${RESERVATION_URL}")
	private String RESERVATION_URL;

	private final ReservationRepository reservationRepository;
	private final RestaurantRepository restaurantRepository;
	private final UserRepository userRepository;
	private final ReservationTableRepository reservationTableRepository;

	@Override
	@Transactional
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
	 * 예약을 등록하는 메소드
	 *
	 * @param reservationRegisterRequestDto 예약 정보
	 * @return Reservation 등록된 예약
	 */
	@Override
	@Transactional
	public ReservationDetailResponseDto registerReservation(
		ReservationRegisterRequestDto reservationRegisterRequestDto) {
		// 식당을 비관적 락으로 가져옴
		Restaurant restaurant = restaurantRepository.findByRestaurantIdWithLock(
				reservationRegisterRequestDto.getRestaurantId())
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다."));

		LocalTime startTime = reservationRegisterRequestDto.getReservationStartTime();
		LocalTime endTime = reservationRegisterRequestDto.getReservationEndTime();

		// 예약 종료 시간이 시작 시간보다 빠른 경우 예외 처리
		if (endTime.isBefore(startTime)) {
			throw new InvalidFilterTimeSequenceException("요청 시간 순서가 잘못되었습니다.");
		}

		// 식당 영업 시간 체크
		if (startTime.isBefore(restaurant.getOpenTime()) || endTime.isAfter(restaurant.getCloseTime())) {
			throw new InvalidFilterTimeSequenceException("식당 영업시간이 아닙니다.");
		}

		// 브레이크타임 체크: 예약 시간이 브레이크타임과 겹치는지 확인
		LocalTime breakStartTime = restaurant.getBreakStartTime();
		LocalTime breakEndTime = restaurant.getBreakEndTime();

		// 예약 시간이 브레이크타임에 포함되는 경우 예외 발생
		if ((startTime.isBefore(breakEndTime) && endTime.isAfter(breakStartTime)) ||
			(startTime.isAfter(breakStartTime) && startTime.isBefore(breakEndTime))) {
			throw new InvalidFilterTimeSequenceException("브레이크타임 중에는 예약할 수 없습니다.");
		}

		// 식당 테이블 체크 : 유효한 테이블인지 확인
		Optional<RestaurantStructure> restaurantStructure = restaurantStructureRepository.findByRestaurantId(
			restaurant.getRestaurantId());
		if (restaurantStructure.isEmpty()) {
			throw new RestaurantStructureNotFoundException("매장 구조 정보가 존재하지 않습니다.");
		}

		// 예약 테이블을 필터링하는 쿼리 실행
		List<ReservationTable> reservatedTables = reservationTableRepository.findReservedTables(
			restaurant.getRestaurantId(),
			reservationRegisterRequestDto.getReservationDate(),
			reservationRegisterRequestDto.getReservationStartTime(),
			reservationRegisterRequestDto.getReservationEndTime());

		// 예약된 테이블이 있을 경우 예외 처리
		if (!reservatedTables.isEmpty()) {
			throw new DuplicateReservationTableException("이미 예약된 테이블입니다.");
		}

		log.info(reservatedTables.toString());

		User user = userRepository.findByUserId(reservationRegisterRequestDto.getUserId()).orElse(null);

		Reservation reservation = reservationRepository.saveAndFlush(
			Reservation.builder()
				.restaurant(restaurant)
				.user(user)
				.reservationDate(reservationRegisterRequestDto.getReservationDate())
				.startTime(reservationRegisterRequestDto.getReservationStartTime())
				.endTime(reservationRegisterRequestDto.getReservationEndTime())
				.memberCnt(reservationRegisterRequestDto.getMemberCnt())
				.reservationUrl(REDIRECT_URL + RESERVATION_URL + generateRandomString())
				.build());

		registerReservationTable(reservation, reservationRegisterRequestDto.getTableList());

		return ReservationDetailResponseDto.transferToReservationDetailResponseDto(reservation,
			reservationRegisterRequestDto.getTableList());
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

	/**
	 * 로그인한 고객의 예약 내역을 받아오는 메소드
	 *
	 * @param pageable 페이징 정보
	 * @return 예약 리스트 정보
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<ReservationDetailResponseDto> getListReservation(Pageable pageable) {
		User user = authUtil.getAuthenticatedUser();

		// Repository에서 페이징된 Reservation 객체들을 가져옴
		Page<Reservation> reservations = reservationRepository.findByUser(user, pageable);

		// Page<Reservation>을 Page<ReservationDetailResponseDto>로 변환
		return reservations.map(ReservationDetailResponseDto::transferToReservationDetailResponseDto);
	}

	/**
	 * 일자별 예약 현황 조회 메소드
	 *
	 * @param date 검색 일자
	 * @return 예약 목록 정보
	 */
	@Override
	public List<ReservationDetailResponseDto> getListReservationByDate(LocalDate date) {
		User user = authUtil.getAuthenticatedUser();
		Restaurant restaurant = restaurantRepository.findByUser(user)
			.orElseThrow(() -> new RestaurantNotFoundException(
				"식당이 존재하지 않습니다."));

		List<Reservation> reservations = reservationRepository.findByRestaurantAndReservationDate(restaurant, date);

		// Reservation 리스트를 ReservationDetailResponseDto 리스트로 변환
		return reservations.stream()
			.map(ReservationDetailResponseDto::transferToReservationDetailResponseDto)  // 각 Reservation 객체를 DTO로 변환
			.collect(Collectors.toList());  // List로 변환 후 리턴
	}

	/**
	 * 각 월의 일별 예약 카운트를 받아오는 메소드
	 *
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 예약 카운트 정보
	 */
	@Override
	public List<ReservationCountResponseDto> getListReservationCount(int year, int month) {
		User user = authUtil.getAuthenticatedUser();
		Restaurant restaurant = restaurantRepository.findByUser(user)
			.orElseThrow(() -> new RestaurantNotFoundException(
				"식당이 존재하지 않습니다."));

		return reservationRepository.countReservationsByDay(restaurant, year, month);

	}

	/**
	 * 예약을 취소하는 메소드
	 *
	 * @param reservationEditRequestDto 취소 예약 정보
	 */
	@Override
	public void editReservation(ReservationEditRequestDto reservationEditRequestDto) {
		User user = authUtil.getAuthenticatedUser();

		Reservation reservation = reservationRepository.findByReservationIdWithLock(
				reservationEditRequestDto.getReservationId())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 예약이 존재하지 않습니다."));

		if (reservation.isCancelled()) {
			throw new AlreadyCancelledReservationException("이미 취소된 예약입니다.");
		}

		if (user.getRole() == Role.CUSTOMER && !user.equals(reservation.getUser())) {
			throw new NotAuthorizedException("권한이 없습니다.");
		}

		if (user.getRole() == Role.MANAGER && !user.equals(reservation.getRestaurant().getUser())) {
			throw new NotAuthorizedException("권한이 없습니다.");
		}

		List<ReservationTable> reservationTables = reservation.getReservationTables();
		log.info(reservationTables.toString());
		// 예약 객체에서 테이블 리스트를 비움
		reservation.getReservationTables().clear();

		// 예약 테이블 삭제
		reservationTableRepository.deleteAll(reservationTables);

		// 예약 정보 수정 후 저장
		reservation.edit();
		log.info(reservation.toString());
		reservationRepository.save(reservation);
	}

	/**
	 * 숫자와 문자를 섞은 랜덤 문자열 생성
	 *
	 * @return 10자리 문자열
	 */
	@Override
	public String generateRandomString() {
		final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		final int STRING_LENGTH = 10;  // 원하는 문자열 길이
		final SecureRandom random = new SecureRandom();

		StringBuilder sb = new StringBuilder(STRING_LENGTH);

		for (int i = 0; i < STRING_LENGTH; i++) {
			int randomIndex = random.nextInt(CHARACTERS.length());
			sb.append(CHARACTERS.charAt(randomIndex));
		}

		return sb.toString();

	}
}
