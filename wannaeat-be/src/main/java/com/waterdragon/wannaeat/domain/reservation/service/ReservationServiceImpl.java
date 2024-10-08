package com.waterdragon.wannaeat.domain.reservation.service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.service.AlarmService;
import com.waterdragon.wannaeat.domain.cart.exception.error.ReservationParticipantNotMatchReservationException;
import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.order.repository.OrderRepository;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;
import com.waterdragon.wannaeat.domain.reservation.dto.request.QrGenerateRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.ReservationRegisterRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.request.UrlValidationRequestDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.CurrentReservedTableResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerMainDataResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ManagerReservationSummaryResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.RecentReservationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationCountResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationDetailResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationMenuResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationSummaryResponseDto;
import com.waterdragon.wannaeat.domain.reservation.dto.response.UrlValidationResponseDto;
import com.waterdragon.wannaeat.domain.reservation.exception.error.AlreadyCancelledReservationException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.DuplicateReservationTableException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.FailureGenerateQrCodeException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.InvalidQrTokenException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.QrTokenNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationOrderExistException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationParticipantNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.UnpaidOrderExistsException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationParticipantRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationTableRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;
import com.waterdragon.wannaeat.domain.restaurant.domain.Table;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterTimeSequenceException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantStructureNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantStructureRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.domain.user.repository.UserRepository;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.redis.service.RedisService;
import com.waterdragon.wannaeat.global.util.AuthUtil;
import com.waterdragon.wannaeat.global.util.FcmUtil;
import com.waterdragon.wannaeat.global.util.QrUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final RestaurantStructureRepository restaurantStructureRepository;
	private final AuthUtil authUtil;
	private final QrUtil qrUtil;
	private final RedisService redisService;
	private final AlarmService alarmService;
	private final OrderRepository orderRepository;
	private final FcmUtil fcmUtil;
	@Value("${redirectURL}")
	private String REDIRECT_URL;

	@Value("${RESERVATION_URL}")
	private String RESERVATION_URL;

	@Value("${ENTER_RESTAURANT_URL}")
	private String ENTER_RESTAURANT_URL;

	@Value("${spring.qr-expiration-millis}")
	private int qrCodeExpirationMillis;

	private final ReservationRepository reservationRepository;
	private final RestaurantRepository restaurantRepository;
	private final UserRepository userRepository;
	private final ReservationTableRepository reservationTableRepository;
	private final ReservationParticipantRepository reservationParticipantRepository;

	@Override
	@Transactional
	public UrlValidationResponseDto validateUrl(UrlValidationRequestDto urlValidationRequestDto,
		String participantIdFromCookie) {

		log.info("예약 url : " + urlValidationRequestDto.getReservationUrl());
		Reservation reservation = reservationRepository.findByReservationUrl(
				urlValidationRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 예약은 만료되었거나, 퇴실 완료 처리 되었습니다. reservationUrl : " + urlValidationRequestDto.getReservationUrl()));

		ReservationParticipant reservationParticipant;

		if (participantIdFromCookie != null) {
			Long reservationParticipantId = Long.parseLong(participantIdFromCookie);
			reservationParticipant = reservationParticipantRepository.findByReservationParticipantId(
					reservationParticipantId)
				.orElseThrow(() -> new ReservationParticipantNotFoundException("해당 참가자가 존재하지 않습니다."));

			if (!reservation.getReservationId().equals(reservationParticipant.getReservation().getReservationId())) {
				throw new ReservationParticipantNotMatchReservationException(
					"해당 예약의 참가자가 아닙니다. 예약 id : " + reservation.getReservationId() + "예약 참가자 id : "
						+ reservationParticipant.getReservationParticipantId());
			}
		} else {
			// 쿠키가 없다면 새로운 참가자 생성
			String[] prefixData = {"이상한", "까부는", "춤추는", "노래하는", "신난", "슬픈"};
			String[] suffixData = {"엘레나", "리오넬", "크레이지", "다리우스", "루비", "세바스찬"};

			// 랜덤으로 앞,뒤 선택
			String randomPrefix = prefixData[new Random().nextInt(prefixData.length)];
			String randomSuffix = suffixData[new Random().nextInt(suffixData.length)];

			// UUID 생성 후 4~6자리만 사용
			String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 6); // 6자리 UUID 사용

			// "앞 + 뒤 + UUID" 형식의 닉네임 생성
			String fullNickname = randomPrefix + " " + randomSuffix + uuid;

			reservationParticipant = ReservationParticipant.builder()
				.reservation(reservation)
				.reservationParticipantNickName(fullNickname) // DB에는 전체 닉네임을 저장
				.build();

			// DB에 저장
			reservationParticipant = reservationParticipantRepository.save(reservationParticipant);
		}

		return UrlValidationResponseDto.builder()
			.reservationId(reservation.getReservationId())
			.reservationParticipantId(reservationParticipant.getReservationParticipantId())
			.reservationParticipantNickname(reservationParticipant.getReservationParticipantNickName())
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

		if (breakStartTime != null && breakEndTime != null) {
			// 예약 시간이 브레이크타임에 포함되는 경우 예외 발생
			if ((startTime.isBefore(breakEndTime) && endTime.isAfter(breakStartTime)) ||
				(startTime.isAfter(breakStartTime) && startTime.isBefore(breakEndTime))) {
				throw new InvalidFilterTimeSequenceException("브레이크타임 중에는 예약할 수 없습니다.");
			}
		}

		// 식당 테이블 체크 : 유효한 테이블인지 확인
		RestaurantStructure restaurantStructure = restaurantStructureRepository.findByRestaurantId(
				restaurant.getRestaurantId())
			.orElseThrow(() -> new RestaurantStructureNotFoundException("매장 구조 정보가 존재하지 않습니다."));

		// 예약 테이블을 필터링하는 쿼리 실행
		List<ReservationTable> reservedTables = reservationTableRepository.findReservedTables(
			restaurant.getRestaurantId(),
			reservationRegisterRequestDto.getReservationDate(),
			reservationRegisterRequestDto.getReservationStartTime(),
			reservationRegisterRequestDto.getReservationEndTime());

		// 예약된 테이블이 있을 경우 예외 처리
		if (!reservedTables.isEmpty()) {
			throw new DuplicateReservationTableException("이미 예약된 테이블입니다.");
		}

		User user = userRepository.findByUserId(reservationRegisterRequestDto.getUserId()).orElse(null);

		Reservation reservation = reservationRepository.saveAndFlush(
			Reservation.builder()
				.restaurant(restaurant)
				.user(user)
				.reservationDate(reservationRegisterRequestDto.getReservationDate())
				.startTime(reservationRegisterRequestDto.getReservationStartTime())
				.endTime(reservationRegisterRequestDto.getReservationEndTime())
				.memberCnt(reservationRegisterRequestDto.getMemberCnt())
				.reservationUrl(generateRandomString())
				.build());

		registerReservationTable(reservation, reservationRegisterRequestDto.getTableList());

		alarmService.registerAlarm(reservation, AlarmType.RESERVATION_CONFIRMED);

		fcmUtil.sendFcm(reservation.getUser(), AlarmType.RESERVATION_CONFIRMED);
		fcmUtil.sendFcm(reservation.getRestaurant().getUser(), AlarmType.RESERVATION_CONFIRMED);

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
	 * 예약 가능한 테이블 번호 목록을 조회하는 메소드
	 *
	 * @param restaurantId 식당 아이디
	 * @param localDate 예약일
	 * @param startTime 이용 시작 시간
	 * @param endTime 이용 종료 시간
	 * @return 예약 가능한 테이블 번호 목록
	 */
	@Override
	public List<Integer> getListNotReservedTableNumber(Long restaurantId, LocalDate localDate, LocalTime startTime,
		LocalTime endTime) {
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다."));

		// 예약 날짜가 과거일 경우 예외 처리
		if (localDate.isBefore(LocalDate.now())) {
			throw new InvalidFilterTimeSequenceException("예약 날짜는 과거일 수 없습니다.");
		}

		// 예약 날짜가 오늘인 경우, 시작 시간이 현재 시간 이전일 경우 예외 처리
		if (localDate.isEqual(LocalDate.now()) && startTime.isBefore(LocalTime.now())) {
			throw new InvalidFilterTimeSequenceException("예약 시작 시간은 현재 시간보다 이전일 수 없습니다.");
		}

		// 예약 종료 시간이 시작 시간보다 빠른 경우 예외 처리
		if (endTime.isBefore(restaurant.getOpenTime())) {
			throw new InvalidFilterTimeSequenceException("요청 시간 순서가 잘못되었습니다.");
		}

		// 식당 영업 시간 체크
		if (startTime.isBefore(restaurant.getOpenTime()) || endTime.isAfter(restaurant.getCloseTime())) {
			throw new InvalidFilterTimeSequenceException("식당 영업시간이 아닙니다.");
		}

		// 브레이크타임 체크: 예약 시간이 브레이크타임과 겹치는지 확인
		LocalTime breakStartTime = restaurant.getBreakStartTime();
		LocalTime breakEndTime = restaurant.getBreakEndTime();

		if (breakStartTime != null && breakEndTime != null) {
			// 예약 시간이 브레이크타임에 포함되는 경우 예외 발생
			if ((startTime.isBefore(breakEndTime) && endTime.isAfter(breakStartTime)) ||
				(startTime.isAfter(breakStartTime) && startTime.isBefore(breakEndTime))) {
				throw new InvalidFilterTimeSequenceException("브레이크타임 중에는 예약할 수 없습니다.");
			}
		}

		List<ReservationTable> reservedTables = reservationTableRepository.findReservedTables(
			restaurant.getRestaurantId(),
			localDate,
			startTime,
			endTime);

		RestaurantStructure restaurantStructure = restaurantStructureRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantStructureNotFoundException("매장 구조 정보가 존재하지 않습니다."));
		List<Table> tableList = restaurantStructure.getTables();

		List<Integer> tableNumbers = new java.util.ArrayList<>(tableList.stream()
			.map(Table::getTableId)  // 각 Table 객체에서 tableId 추출
			.toList());  // List<Integer>로 변환

		for (ReservationTable table : reservedTables) {
			tableNumbers.remove((Integer)table.getTableId());  // tableId를 객체로 처리하여 값으로 리스트에서 제거
		}

		return tableNumbers;
	}

	/**
	 * 비회원 식당 예약 페이지 입장을 위한 QR코드를 생성하는 메소드
	 *
	 * @param qrGenerateRequestDto 식당 아이디 정보
	 * @return 난수값 token이 저장된 QR코드
	 */
	@Override
	public Object generateEnterQrcode(QrGenerateRequestDto qrGenerateRequestDto) {
		Restaurant restaurant = restaurantRepository.findByRestaurantId(qrGenerateRequestDto.getRestaurantId())
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다."));

		final String randomString = generateRandomString();
		// Url 유효성 검사에 사용할 난수값을 Redis에 저장( key = randomString / value = restaurantId )
		redisService.setValues(randomString, restaurant.getRestaurantId(), Duration.ofDays(qrCodeExpirationMillis));
		Object qr;
		try {
			qr = qrUtil.generateQR(REDIRECT_URL + ENTER_RESTAURANT_URL + "?token=" + randomString);

		} catch (Exception e) {
			log.info("QR 생성 에러: {}", e.getMessage());
			throw new FailureGenerateQrCodeException("QR 생성 에러: {}\", e.getMessage()");
		}

		return qr;
	}

	@Override
	public Restaurant validateQr(String token) {
		if (token == null || token.isEmpty()) {
			throw new QrTokenNotFoundException("입장 코드가 존재하지 않습니다.");
		}

		// Redis에서 값을 가져오기 (Object로 받아서 타입 확인)
		Object redisValueObject = redisService.getValues(token);

		// redisValue가 null인지 확인
		if (redisValueObject == null) {
			throw new InvalidQrTokenException("인증코드가 만료되었습니다.");
		}

		// redisValue를 String으로 변환 (Integer 타입일 경우 처리)
		String redisValue;
		if (redisValueObject instanceof Integer) {
			redisValue = String.valueOf(redisValueObject);
		} else if (redisValueObject instanceof String) {
			redisValue = (String)redisValueObject;
		} else {
			throw new InvalidQrTokenException("인증코드 형식이 올바르지 않습니다.");
		}

		// restaurantId가 Long 형식으로 저장되어 있을 경우 String을 Long으로 변환
		long restaurantId;
		try {
			restaurantId = Long.parseLong(redisValue);
		} catch (NumberFormatException e) {
			throw new InvalidQrTokenException("인증코드 형식이 올바르지 않습니다.");
		}

		// restaurantId를 기반으로 식당 찾기
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 식당이 존재하지 않습니다."));

		return restaurant;
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
		Page<Reservation> reservations = reservationRepository.findByUserOrderByReservationDateDesc(user, pageable);

		// Page<Reservation>을 Page<ReservationDetailResponseDto>로 변환
		return reservations.map(ReservationDetailResponseDto::transferToReservationDetailResponseDto);
	}

	/**
	 * 고객 예약 상세 정보를 리턴하는 메소드
	 *
	 * @param reservationId 예약 아이디
	 * @return 예약 상세 정보
	 */
	@Override
	public ReservationDetailResponseDto getDetailReservationByUser(Long reservationId) {
		if (reservationId == null) {
			throw new ReservationNotFoundException("해당 예약이 존재하지 않습니다.");
		}
		User user = authUtil.getAuthenticatedUser();

		Reservation reservation = reservationRepository.findByReservationIdWithLock(reservationId)
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 예약이 존재하지 않습니다."));

		if (reservation.getUser() != user) {
			throw new NotAuthorizedException("접근 권한이 없습니다.");
		}
		return ReservationDetailResponseDto.transferToReservationDetailResponseDto(reservation);
	}

	/**
	 * 일자별 예약 현황 조회 메소드
	 *
	 * @param date 검색 일자
	 * @param pageable 페이징
	 * @return 일자별 예약 현황
	 */
	@Override
	public ManagerReservationSummaryResponseDto getListReservationByRestaurantAndDate(LocalDate date,
		Pageable pageable) {
		User user = authUtil.getAuthenticatedUser();
		Restaurant restaurant = restaurantRepository.findByUser(user)
			.orElseThrow(() -> new RestaurantNotFoundException("식당이 존재하지 않습니다."));

		// 예약 리스트 가져오기
		Page<Reservation> reservations = reservationRepository.findByRestaurantAndReservationDateAndCancelledIsFalse(
			restaurant, date, pageable);

		// Page<Reservation>을 List<ReservationSummaryResponseDto>로 변환
		List<ReservationSummaryResponseDto> reservationSummaryList = reservations.stream()
			.map(reservation -> ReservationSummaryResponseDto.builder()
				.reservationId(reservation.getReservationId())
				.userName(reservation.getUser() != null ? reservation.getUser().getNickname() :
					"비회원") // 사용자의 이름이 없으면 "비회원"으로 설정
				.reservationStartTime(reservation.getStartTime())
				.reservationEndTime(reservation.getEndTime())
				.memberCnt(reservation.getMemberCnt())
				.tableList(reservation.getReservationTables().stream()
					.map(ReservationTable::getTableId) // 테이블의 좌석 번호 추출
					.collect(Collectors.toList()))
				.build())
			.collect(Collectors.toList());

		// ManagerReservationSummaryResponseDto 빌드 및 반환
		return ManagerReservationSummaryResponseDto.builder()
			.reservationDate(date) // 파라미터로 받은 날짜
			.reservations(reservationSummaryList) // 변환된 예약 리스트
			.build();
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
	 * @param reservationId 취소 예약 아이디
	 */
	@Override
	public void removeReservation(Long reservationId) {
		if (reservationId == null) {
			throw new ReservationNotFoundException("해당 예약이 존재하지 않습니다.");
		}
		User user = authUtil.getAuthenticatedUser();

		Reservation reservation = reservationRepository.findByReservationIdWithLock(reservationId)
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 예약이 존재하지 않습니다."));

		if (reservation.isCancelled()) {
			throw new AlreadyCancelledReservationException("이미 취소된 예약입니다.");
		}

		if (!user.equals(reservation.getUser()) && !user.equals(reservation.getRestaurant().getUser())) {
			throw new NotAuthorizedException("권한이 없습니다.");
		}

		List<Order> orders = orderRepository.findAllByReservation(reservation);

		if (!orders.isEmpty()) {
			throw new ReservationOrderExistException("해당 예약의 주문이 존재하여 취소할 수 없습니다.");
		}

		List<ReservationTable> reservationTables = reservation.getReservationTables();
		log.info(reservationTables.toString());
		// 예약 객체에서 테이블 리스트를 비움
		reservation.getReservationTables().clear();

		// 예약 테이블 삭제
		reservationTableRepository.deleteAll(reservationTables);

		// 예약 정보 수정 후 저장
		reservation.remove();
		reservationRepository.save(reservation);

		alarmService.registerAlarm(reservation, AlarmType.RESERVATION_CANCELED);

		fcmUtil.sendFcm(reservation.getRestaurant().getUser(), AlarmType.RESERVATION_CANCELED);
	}

	/**
	 * 식사 후 퇴실하는 메소드
	 *
	 * @param urlValidationRequestDto 예약 URL 정보
	 */
	@Override
	public void editReservation(UrlValidationRequestDto urlValidationRequestDto) {
		Reservation reservation = reservationRepository.findByReservationUrlWithLock(
				urlValidationRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"유효하지 않거나, 이미 퇴실한 URL 입니다."));

		List<Order> orders = orderRepository.findIncompleteOrdersByReservation(reservation);

		if (!orders.isEmpty()) {
			throw new UnpaidOrderExistsException("미결제된 주문이 존재합니다.");
		}

		reservation.edit();
		reservationRepository.save(reservation);

		alarmService.registerAlarm(reservation, AlarmType.EXIT_COMPLETED);
		fcmUtil.sendFcm(reservation.getRestaurant().getUser(), reservation, AlarmType.EXIT_COMPLETED);

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

	/**
	 * 사업자용 예약 상세조회
	 *
	 * @param reservationId 예약 ID
	 * @return ManagerReservationDetailResponseDto 예약 상세 정보
	 */
	@Override
	public ManagerReservationDetailResponseDto getReservationListByManager(Long reservationId) {

		// AtomicBoolean을 사용하여 람다 내에서 값 변경 가능
		AtomicBoolean allPaymentsCompleted = new AtomicBoolean(true);

		// 예약 정보 조회
		Reservation reservation = reservationRepository.findById(reservationId)
			.orElseThrow(() -> new ReservationNotFoundException("존재하지 않는 예약입니다."));

		// 주문 리스트 조회
		List<Order> orderList = reservation.getOrders();

		// 주문 리스트를 메뉴 이름으로 그룹화하여 합침
		Map<String, ReservationMenuResponseDto> menuMap = new HashMap<>();

		orderList.forEach(order -> {
			String menuName = order.getMenu().getName();
			List<Integer> orderIdList = IntStream.range(0, order.getTotalCnt() - order.getServedCnt())
				.mapToObj(i -> order.getOrderId().intValue())
				.collect(Collectors.toList());

			// 서빙되지 않은 수량 계산: totalCnt - servedCnt
			int notServedCnt = order.getTotalCnt() - order.getServedCnt();

			// 결제 상태 확인 (모든 주문의 paidCnt가 totalCnt와 같지 않으면 결제 미완료로 판단)
			if (order.getPaidCnt() < order.getTotalCnt()) {
				allPaymentsCompleted.set(false);  // AtomicBoolean을 사용하여 값 설정
			}

			if (menuMap.containsKey(menuName)) {
				// 기존 메뉴에 데이터 추가
				ReservationMenuResponseDto existingDto = menuMap.get(menuName);
				existingDto.setNotServedCnt(existingDto.getNotServedCnt() + notServedCnt);
				existingDto.setServedCnt(existingDto.getServedCnt() + order.getServedCnt());
				existingDto.getOrderIdList().addAll(orderIdList);
			} else {
				// 새로운 메뉴 추가
				ReservationMenuResponseDto newDto = ReservationMenuResponseDto.builder()
					.menuName(menuName)
					.notServedCnt(notServedCnt) // 서빙되지 않은 수량
					.servedCnt(order.getServedCnt()) // 서빙된 수량
					.orderIdList(orderIdList)
					.build();
				menuMap.put(menuName, newDto);
			}
		});

		// 테이블 번호 리스트 추출 (Integer 타입으로 처리)
		List<Integer> tableList = reservation.getReservationTables().stream()
			.map(ReservationTable::getTableId) // tableId는 int 타입으로 처리
			.collect(Collectors.toList());

		// ManagerReservationDetailResponseDto 생성 및 반환
		return ManagerReservationDetailResponseDto.builder()
			.reservationDate(reservation.getReservationDate().toString()) // 예약 날짜
			.reservationStartTime(reservation.getStartTime().toString()) // 시작 시간
			.reservationEndTime(reservation.getEndTime().toString()) // 종료 시간
			.memberCnt(reservation.getMemberCnt()) // 인원 수
			.memberName(reservation.getUser().getNickname()) // 예약자 이름
			.allPaymentsCompleted(allPaymentsCompleted.get()) // AtomicBoolean의 값을 boolean으로 전달
			.tableList(tableList) // 테이블 리스트 (List<Integer>)
			.reservationMenuList(new ArrayList<>(menuMap.values())) // 메뉴 리스트
			.build();
	}

	/**
	 * 최우선 방문 예약을 리턴하는 메소드
	 * 최우선 방문 예약이 없는 경우, 현재 이용중인 예약을 리턴
	 *
	 * @return 최우선 방문 예약
	 */
	@Override
	public RecentReservationResponseDto getRecentReservation() {
		User user = authUtil.getAuthenticatedUser();
		Pageable pageable = PageRequest.of(0, 1);
		LocalDate today = LocalDate.now();
		LocalTime now = LocalTime.now();

		Reservation reservation;

		Page<Reservation> upcomingReservation = reservationRepository.findFirstUpcomingReservation(user, today, now,
			pageable);

		// 방문 예정인 식당 찾아서 리턴
		if (upcomingReservation.hasContent()) {
			reservation = upcomingReservation.getContent().get(0); // 가장 첫 번째 예약 반환
			return RecentReservationResponseDto.builder()
				.status("방문 예정")
				.reservationId(reservation.getReservationId())
				.restaurantName(reservation.getRestaurant().getName())
				.reservationDate(reservation.getReservationDate())
				.reservationStartTime(reservation.getStartTime())
				.reservationEndTime(reservation.getEndTime())
				.memberCnt(reservation.getMemberCnt())
				.build();
		}

		// 방문 예정 식당이 없다면, 현재 방문중인 식당 찾아서 리턴
		Page<Reservation> ongoingReservation = reservationRepository.findFirstOngoingReservation(user, today, now,
			pageable);
		if (ongoingReservation.hasContent()) {
			reservation = ongoingReservation.getContent().get(0);
			return RecentReservationResponseDto.builder()
				.status("방문중")
				.reservationId(reservation.getReservationId())
				.restaurantName(reservation.getRestaurant().getName())
				.reservationDate(reservation.getReservationDate())
				.reservationStartTime(reservation.getStartTime())
				.reservationEndTime(reservation.getEndTime())
				.memberCnt(reservation.getMemberCnt())
				.build();
		}

		// 두 쿼리에서 모두 결과가 없으면 null 반환
		return null;
	}

	@Override
	public ManagerMainDataResponseDto getManagerMainData() {
		User user = authUtil.getAuthenticatedUser();
		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("권한이 없습니다.");
		}

		Restaurant restaurant = restaurantRepository.findByUser(user)
			.orElseThrow(() -> new RestaurantNotFoundException("식당이 존재하지 않습니다."));

		LocalDate today = LocalDate.now();

		LocalTime now = LocalTime.now();

		List<Reservation> todayReservations = reservationRepository.findByRestaurantAndReservationDateAndCancelledFalse(
			restaurant, today);

		List<Reservation> currentReservations = reservationRepository.findByRestaurantAndReservationDateAndCancelledFalseAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
			restaurant, today, now, now);

		List<CurrentReservedTableResponseDto> currentReservedTables = getListCurrentReservation(
			currentReservations);

		int totalReservationCount = todayReservations.size();

		int pastReservationCount = countReservationsBeforeNow(todayReservations);

		return ManagerMainDataResponseDto.builder()
			.currentReservedTables(currentReservedTables)
			.totalReservationCount(totalReservationCount)
			.pastReservationCount(pastReservationCount)
			.build();

	}

	@Override
	public List<CurrentReservedTableResponseDto> getListCurrentReservation(List<Reservation> reservations) {
		return reservations.stream()
			.flatMap(reservation -> reservation.getReservationTables().stream()
				.map(table -> CurrentReservedTableResponseDto.builder()
					.reservationId(reservation.getReservationId()) // 예약 ID
					.tableId(table.getTableId()) // 테이블 ID
					.reservationStartTime(reservation.getStartTime()) // 예약 시작 시간
					.reservationEndTime(reservation.getEndTime()) // 예약 종료 시간
					.build()
				)
			)
			.collect(Collectors.toList());

	}

	@Override
	public int countReservationsBeforeNow(List<Reservation> reservations) {
		LocalTime now = LocalTime.now();

		// 현재 시간 이전의 예약 startTime을 가진 예약들의 수를 카운트
		return (int)reservations.stream()
			.filter(reservation -> reservation.getStartTime().isBefore(now))
			.count();
	}

}
