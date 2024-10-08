package com.waterdragon.wannaeat.domain.statistic.service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;
import com.waterdragon.wannaeat.domain.restaurant.domain.Table;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantStructureNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantStructureRepository;
import com.waterdragon.wannaeat.domain.statistic.dto.response.MainStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.MenuStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.PeekStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.ReservationCountPerDayResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.ReservationCountStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.RevenuePerDayResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.RevenueStatisticResponseDto;
import com.waterdragon.wannaeat.domain.statistic.dto.response.UserRestaurantVisitStatisticResponseDto;
import com.waterdragon.wannaeat.domain.user.domain.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

	private final ReservationRepository reservationRepository;
	private final MenuRepository menuRepository;
	private final RestaurantStructureRepository restaurantStructureRepository;

	/**
	 * 메인 통계를 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @return 메인 통계
	 */
	@Override
	public MainStatisticResponseDto getStatisticsByMain(Restaurant restaurant) {
		List<Reservation> reservations = getReservationsByMonths(restaurant, 12);

		Map<Integer, Long> monthStatistics = getMonthlyStatsByMonths(reservations);
		Map<String, Long> dayStatistics = getDayOfWeekStatsByMonths(reservations);
		Map<String, Long> hourStatistics = getHourlyStatsByMonths(restaurant, reservations);

		if(!monthStatistics.isEmpty()){
			monthStatistics = filterTop3ByValueByIntegerMap(monthStatistics);
		}
		if(!dayStatistics.isEmpty()){
			dayStatistics = filterTop3ByValueByStringMap(dayStatistics);
		}
		if(!hourStatistics.isEmpty()){
			hourStatistics = filterTop3ByValueByStringMap(hourStatistics);
		}

		Map<String, Long> revenues = getRevenueByLastFiveDays(restaurant);
		List<MenuStatisticResponseDto> menuStatistics = getPopularMenusByLastThreeMonths(restaurant);

		List<MenuStatisticResponseDto> topMenuStatistics = getTop3PopularMenus(menuStatistics);

		List<MenuStatisticResponseDto> bottomMenuStatistics = getBottom3PopularMenus(menuStatistics);

		return MainStatisticResponseDto.builder()
			.monthStatistics(monthStatistics)
			.dayStatistics(dayStatistics)
			.hourStatistics(hourStatistics)
			.revenues(revenues)
			.topMenuStatistics(topMenuStatistics)
			.bottomMenuStatistics(bottomMenuStatistics)
			.build();
	}

	/**
	 * 월별 피크 통계를 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 피크 통계
	 */
	@Override
	public PeekStatisticResponseDto getStatisticsByPeek(Restaurant restaurant, int year, int month) {
		List<Reservation> reservations = reservationRepository.findNotCancelledReservationsByRestaurantAndYearAndMonth(
			restaurant,
			year, month);

		Map<String, Long> dayStatistics = getDayOfWeekStatsByMonths(reservations);
		Map<String, Long> hourStatistics = getHourlyStatsByMonths(restaurant, reservations);

		double turnoverRate = getTurnoverRate(restaurant, reservations);

		int averageUsageTime = getAverageUsageTime(reservations);

		return PeekStatisticResponseDto.builder()
			.dayStatistics(dayStatistics)
			.hourStatistics(hourStatistics)
			.turnoverRate(turnoverRate)
			.averageUsageTime(averageUsageTime)
			.build();

	}

	/**
	 * 월별 매출 통계를 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 월별 매출 통계
	 */
	@Override
	public RevenueStatisticResponseDto getStatisticsByRevenue(Restaurant restaurant, int year, int month) {
		List<Reservation> reservations = reservationRepository.findNotCancelledReservationsByRestaurantAndYearAndMonth(
			restaurant,
			year, month);
		Map<LocalDate, RevenuePerDayResponseDto> dailySalesMap = new HashMap<>();
		long totalRevenue = 0;

		// 각 예약별로 일자별 매출과 예약 건수를 계산
		for (Reservation reservation : reservations) {
			LocalDate reservationDate = reservation.getReservationDate();
			RevenuePerDayResponseDto dailyData = dailySalesMap.getOrDefault(reservationDate,
				new RevenuePerDayResponseDto(0L, 0));

			// 예약에 연결된 Orders의 매출 계산
			long dailyRevenue = reservation.getOrders().stream()
				.mapToLong(order -> {
					Menu menu = order.getMenu();
					return (long)menu.getPrice() * order.getTotalCnt();
				})
				.sum();

			// 매출과 예약 건수를 누적
			dailyData = RevenuePerDayResponseDto.builder()
				.revenue(dailyData.getRevenue() + dailyRevenue)
				.reservationCnt(dailyData.getReservationCnt() + 1)
				.build();

			dailySalesMap.put(reservationDate, dailyData);
			totalRevenue += dailyRevenue; // 전체 매출 합산
		}

		// LocalDate 순으로 정렬
		Map<LocalDate, RevenuePerDayResponseDto> sortedDailySalesMap = dailySalesMap.entrySet().stream()
			.sorted(Map.Entry.comparingByKey()) // LocalDate로 정렬
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				Map.Entry::getValue,
				(oldValue, newValue) -> oldValue,
				LinkedHashMap::new // 순서를 유지하는 LinkedHashMap으로 변환
			));

		return RevenueStatisticResponseDto.builder()
			.totalRevenue(totalRevenue)
			.revenues(sortedDailySalesMap)
			.build();
	}

	/**
	 * 해당 연월의 날짜별 예약, 취소 카운트를 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @param year 검색 연도
	 * @param month 검색 월
	 * @return 날짜별 예약, 취소 카운트 목록
	 */
	@Override
	public ReservationCountStatisticResponseDto getReservationCountStatistics(Restaurant restaurant, int year,
		int month) {
		List<Reservation> reservations = reservationRepository.findReservationsByRestaurantAndYearAndMonth(restaurant,
			year, month);

		Map<LocalDate, ReservationCountPerDayResponseDto> dailyReservationCountMap = new HashMap<>();

		// 각 예약별로 일자별 예약 수와 취소된 예약 수 계산
		for (Reservation reservation : reservations) {
			LocalDate reservationDate = reservation.getReservationDate();
			ReservationCountPerDayResponseDto dailyData = dailyReservationCountMap.getOrDefault(reservationDate,
				new ReservationCountPerDayResponseDto(0L, 0));

			// 예약 상태에 따라 reserved 또는 cancelled 값 증가
			if (reservation.isCancelled()) {
				dailyData = ReservationCountPerDayResponseDto.builder()
					.reserved(dailyData.getReserved()) // 취소된 예약은 예약된 수에 영향을 주지 않음
					.cancelled(dailyData.getCancelled() + 1) // 취소된 예약 수 증가
					.build();
			} else {
				dailyData = ReservationCountPerDayResponseDto.builder()
					.reserved(dailyData.getReserved() + 1) // 예약된 수 증가
					.cancelled(dailyData.getCancelled()) // 취소된 예약 수는 유지
					.build();
			}

			dailyReservationCountMap.put(reservationDate, dailyData);
		}

		// LocalDate 순으로 정렬
		Map<LocalDate, ReservationCountPerDayResponseDto> sortedReservationCountMap = dailyReservationCountMap.entrySet()
			.stream()
			.sorted(Map.Entry.comparingByKey()) // LocalDate로 정렬
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				Map.Entry::getValue,
				(oldValue, newValue) -> oldValue,
				LinkedHashMap::new // 순서를 유지하는 LinkedHashMap으로 변환
			));

		return ReservationCountStatisticResponseDto.builder()
			.reservationCounts(sortedReservationCountMap)
			.build();
	}

	/**
	 * 사용자가 가장 많이 방문한 식당 5개를 리턴하는 메소드
	 *
	 * @param user 사용자 정보
	 * @return 가장 많이 방문한 식당 목록
	 */
	@Override
	public List<UserRestaurantVisitStatisticResponseDto> getRestaurantVisitStatisticsByUser(User user) {

		List<Reservation> reservations = getReservationsByUserAndLastYear(user);

		Map<Restaurant, Long> statistics = reservations.stream()
			.collect(Collectors.groupingBy(Reservation::getRestaurant, Collectors.counting()));

		// 통계를 DTO로 변환하고, 방문 횟수 기준으로 내림차순 정렬, 상위 5개만 리턴
		return statistics.entrySet().stream()
			.map(entry -> {
				Restaurant restaurant = entry.getKey();
				Long visitCount = entry.getValue();

				return UserRestaurantVisitStatisticResponseDto.builder()
					.restaurantId(restaurant.getRestaurantId()) // 레스토랑 ID
					.restaurantName(restaurant.getName()) // 레스토랑 이름
					.restaurantImage(restaurant.getImages() != null && !restaurant.getImages().isEmpty()
						? restaurant.getImages().get(0).getImageUrl()
						: null) // 이미지 리스트가 비어있으면 null
					.restaurantVisitCount(visitCount.intValue()) // 방문 횟수
					.restaurantCategory(restaurant.getCategory().getCategoryName()) // 레스토랑 카테고리
					.build();
			})
			.sorted(Comparator.comparing(UserRestaurantVisitStatisticResponseDto::getRestaurantVisitCount)
				.reversed()) // 방문 횟수 기준으로 정렬 (내림차순)
			.limit(5) // 상위 5개만 선택
			.collect(Collectors.toList()); // List<UserRestaurantVisitStatisticResponseDto>로 변환
	}

	/**
	 * n개월치 예약 데이터를 받아 피크 월을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 피크타임 순으로 정렬된 요일 목록
	 */
	@Override
	public Map<Integer, Long> getMonthlyStatsByMonths(List<Reservation> reservations) {
		return reservations.stream()
			.collect(Collectors.groupingBy(
				reservation -> reservation.getReservationDate().getMonthValue(), // 월을 숫자(1~12)로 그룹화
				Collectors.counting() // 각 월별 예약 수 카운트
			))
			.entrySet().stream()
			.sorted(Map.Entry.<Integer, Long>comparingByValue().reversed()) // 예약 수에 따라 정렬
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1,
				LinkedHashMap::new)); // 결과를 LinkedHashMap에 담아서 순서를 유지
	}

	/**
	 * n개월치 예약 데이터를 받아 피크 요일을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 피크타임 순으로 정렬된 요일 목록
	 */
	@Override
	public Map<String, Long> getDayOfWeekStatsByMonths(List<Reservation> reservations) {
		// 요일을 한글로 변환한 기본 맵 (월~일)
		Map<String, Long> dayOfWeekMap = new LinkedHashMap<>();
		dayOfWeekMap.put("월", 0L);
		dayOfWeekMap.put("화", 0L);
		dayOfWeekMap.put("수", 0L);
		dayOfWeekMap.put("목", 0L);
		dayOfWeekMap.put("금", 0L);
		dayOfWeekMap.put("토", 0L);
		dayOfWeekMap.put("일", 0L);

		// 예약 데이터를 요일별로 카운트하여 맵을 업데이트
		reservations.stream()
			.collect(Collectors.groupingBy(
				reservation -> convertDayOfWeekToKorean(reservation.getReservationDate().getDayOfWeek()), // 요일을 한글로 변환
				Collectors.counting() // 각 요일별 예약 수 카운트
			))
			.forEach((day, count) -> dayOfWeekMap.merge(day, count, Long::sum)); // 값이 있으면 더하고, 없으면 추가

		return dayOfWeekMap;
	}

	/**
	 * n개월치 예약 데이터를 받아 30분 단위의 시간대별 피크타임을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 피크타임 순으로 정렬된 시간 목록
	 */
	@Override
	public Map<String, Long> getHourlyStatsByMonths(Restaurant restaurant, List<Reservation> reservations) {
		// 기본 값 초기화
		Map<String, Long> hourlyStatsMap = new LinkedHashMap<>();

		// restaurant의 startTime과 endTime을 기본값으로 추가
		hourlyStatsMap.put(getHalfHourSlot(restaurant.getOpenTime()), 0L);
		hourlyStatsMap.put(getHalfHourSlot(restaurant.getCloseTime()), 0L);

		// 예약 데이터를 바탕으로 시간대별로 그룹화하여 카운트
		reservations.stream()
			.collect(Collectors.groupingBy(
				reservation -> getHalfHourSlot(reservation.getStartTime()), // 30분 단위로 그룹화
				Collectors.counting() // 각 시간대별 예약 수 카운트
			))
			.forEach((timeSlot, count) -> hourlyStatsMap.merge(timeSlot, count, Long::sum)); // 기존 값에 추가

		// 시간 순서로 정렬
		return hourlyStatsMap.entrySet().stream()
			.sorted(Comparator.comparing(entry -> LocalTime.parse(entry.getKey()))) // 시간을 기준으로 정렬
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				Map.Entry::getValue,
				(e1, e2) -> e1,
				LinkedHashMap::new)); // 순서 유지
	}

	/**
	 * 최근 5일간의 매출 내역을 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @return 5일간의 매출 내역 목록
	 */
	@Override
	public Map<String, Long> getRevenueByLastFiveDays(Restaurant restaurant) {
		LocalDate today = LocalDate.now();
		LocalDate endDate = today.minusDays(1); // 어제
		LocalDate startDate = today.minusDays(5); // 5일 전

		// 날짜 포맷 설정 (MM-dd)
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");

		// 최근 5일간의 Reservation을 가져옴
		List<Reservation> reservations = reservationRepository.findReservationsForRestaurantWithinDateRange(restaurant,
			startDate, endDate);

		// 날짜별로 매출을 0으로 초기화
		Map<String, Long> salesMap = new HashMap<>();
		for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
			salesMap.put(date.format(formatter), 0L); // MM-dd 형식으로 변환하여 저장
		}

		// 예약 정보를 바탕으로 매출 계산
		for (Reservation reservation : reservations) {
			String reservationDate = reservation.getReservationDate().format(formatter); // MM-dd 형식으로 변환

			// 예약에 연결된 Orders 처리
			long totalSalesForDay = reservation.getOrders().stream()
				.mapToLong(order -> {
					// 메뉴 정보 가져오기
					Menu menu = menuRepository.findById(order.getMenu().getMenuId()).orElseThrow();
					return (long)menu.getPrice() * order.getTotalCnt(); // 메뉴 가격 * 주문 수량
				})
				.sum();

			// 날짜별 매출을 Map에 추가
			salesMap.merge(reservationDate, totalSalesForDay, Long::sum);
		}

		// 날짜 순으로 정렬하여 반환
		return salesMap.entrySet().stream()
			.sorted(Map.Entry.comparingByKey()) // 날짜 순으로 정렬
			.collect(
				Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new)); // 순서 유지
	}

	/**
	 * 최근 3개월치의 인기 메뉴 통계를 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @return 인기 메뉴 통계 목록
	 */
	@Override
	public List<MenuStatisticResponseDto> getPopularMenusByLastThreeMonths(Restaurant restaurant) {
		LocalDate today = LocalDate.now();
		LocalDate endDate = today.minusDays(today.getDayOfMonth()); // 이번 달의 첫 날 이전
		LocalDate startDate = endDate.minusMonths(3).withDayOfMonth(1); // 3개월 전 1일

		// 최근 3개월간의 Reservation 가져오기
		List<Reservation> reservations = reservationRepository.findReservationsForRestaurantWithinDateRange(restaurant,
			startDate, endDate);

		// 메뉴별 주문 수량 합산을 위한 Map
		Map<Long, Long> menuOrderCountMap = new HashMap<>();

		// 각 예약에 연결된 Orders 처리
		for (Reservation reservation : reservations) {
			for (Order order : reservation.getOrders()) {
				Long menuId = order.getMenu().getMenuId();
				Long orderCnt = (long)order.getTotalCnt();
				menuOrderCountMap.merge(menuId, orderCnt, Long::sum);
			}
		}

		// 메뉴별로 주문 수량을 기준으로 정렬 후, DTO로 변환
		return menuOrderCountMap.entrySet().stream()
			.map(entry -> {
				Long menuId = entry.getKey();
				Long orderCnt = entry.getValue();
				Menu menu = menuRepository.findById(menuId)
					.orElseThrow(() -> new IllegalArgumentException("Menu not found"));
				return new MenuStatisticResponseDto(menu.getMenuId(), menu.getName(), menu.getImage(), orderCnt);
			})
			.sorted(Comparator.comparingLong(MenuStatisticResponseDto::getOrderCnt).reversed()) // 주문 수량 기준으로 내림차순 정렬
			.collect(Collectors.toList());
	}

	/**
	 * 정렬된 인기메뉴 리스트에서 상위 3개를 리턴하는 메소드
	 *
	 * @param menuStatistics 정렬된 인기 메뉴 리스트
	 * @return 상위 3개의 메뉴
	 */
	@Override
	public List<MenuStatisticResponseDto> getTop3PopularMenus(List<MenuStatisticResponseDto> menuStatistics) {
		// 상위 3개의 인기 메뉴 반환
		return menuStatistics.stream()
			.limit(3) // 상위 3개를 가져옴
			.collect(Collectors.toList());
	}

	/**
	 * 정렬된 인기메뉴 리스트에서 하위 3개를 리턴하는 메소드
	 *
	 * @param menuStatistics 정렬된 인기 메뉴 리스트
	 * @return 하위 3개의 메뉴
	 */
	@Override
	public List<MenuStatisticResponseDto> getBottom3PopularMenus(List<MenuStatisticResponseDto> menuStatistics) {
		int menuSize = menuStatistics.size();

		if (menuSize <= 3) {
			// 메뉴가 3개 이하일 경우, 그대로 역순으로 반환
			List<MenuStatisticResponseDto> bottomMenus = new ArrayList<>(menuStatistics);
			Collections.reverse(bottomMenus); // 역순으로 뒤집음
			return bottomMenus;
		}

		// 하위 3개를 추출하고 역순으로 정렬
		List<MenuStatisticResponseDto> bottomMenus = menuStatistics.stream()
			.skip(menuSize - 3) // 하위 3개를 가져옴
			.collect(Collectors.toList());

		// 리스트를 역순으로 뒤집음
		Collections.reverse(bottomMenus);

		return bottomMenus;
	}

	/**
	 * 최근 n개월 치의 예약 데이터를 가져오는 메소드
	 *
	 * @param restaurant 정보를 가져올 식당
	 * @param month 받아올 개월 수
	 * @return 예약 목록
	 */
	@Override
	public List<Reservation> getReservationsByMonths(Restaurant restaurant, int month) {
		LocalDate endDate = LocalDate.now().withDayOfMonth(1).minusDays(1);  // 이번 달 제외한 저번 달의 마지막 날
		LocalDate startDate = endDate.minusMonths(month).withDayOfMonth(1);     // 12개월 전 1일

		return reservationRepository.findReservationsForRestaurantWithinDateRange(restaurant, startDate, endDate);
	}

	/**
	 * 사용자의 최근 1년간의 예약 데이터를 가져오는 메소드
	 *
	 * @return 예약 목록
	 */
	@Override
	public List<Reservation> getReservationsByUserAndLastYear(User user) {
		LocalDate today = LocalDate.now();
		LocalDate startDate = today.minusMonths(12).withDayOfMonth(1);     // 12개월 전 1일

		return reservationRepository.findReservationsByUserAndDate(user, startDate);
	}

	/**
	 * 테이블의 회전율을 계산하여 리턴하는 메소드
	 *
	 * @param restaurant 식당 정보
	 * @param reservations 예약 목록
	 * @return 회전율
	 */
	@Override
	public double getTurnoverRate(Restaurant restaurant, List<Reservation> reservations) {
		RestaurantStructure restaurantStructure = restaurantStructureRepository.findByRestaurantId(
				restaurant.getRestaurantId())
			.orElseThrow(() -> new RestaurantStructureNotFoundException("매장 구조 정보가 존재하지 않습니다."));

		List<Table> restaurantTables = restaurantStructure.getTables();
		// 해당 매장의 테이블 수
		int totalTableCount = restaurantTables.size();

		// 해당 월의 예약된 테이블 수
		int reservedTableCount = getTotalReservationTableCount(reservations);

		// 해당 월의 예약을 받은 날 수
		int reservedDate = getUniqueReservationDatesCount(reservations);

		double turnoverRate = (double)reservedTableCount / totalTableCount / reservedDate;

		// 소수점 첫째 자리까지 반올림 (ex: 0.12345 -> 0.1)
		return Math.round(turnoverRate * 10) / 10.0;

	}

	/**
	 * 평균 테이블 이용 시간
	 *
	 * @param reservations 예약 목록
	 * @return 평균 테이블 이용 시간
	 */
	@Override
	public int getAverageUsageTime(List<Reservation> reservations) {
		long totalMinutes = 0;

		// 각 예약의 이용 시간 계산 (분 단위)
		for (Reservation reservation : reservations) {
			LocalTime startTime = reservation.getStartTime();
			LocalTime endTime = reservation.getEndTime();

			// startTime과 endTime의 차이(분)를 계산
			long minutes = Duration.between(startTime, endTime).toMinutes();
			totalMinutes += minutes;
		}

		// 예약의 총 개수로 나누어 평균 이용 시간 계산
		return reservations.isEmpty() ? 0 : (int)(totalMinutes / reservations.size());
	}

	/**
	 * 예약 목록 중 고유 예약 일자 수를 리턴하는 메소드
	 * @param reservations 예약 목록
	 * @return 고유 예약 일자 수
	 */
	@Override
	public int getUniqueReservationDatesCount(List<Reservation> reservations) {
		Set<LocalDate> uniqueDates = new HashSet<>();

		// 예약 목록에서 고유한 날짜를 추출
		for (Reservation reservation : reservations) {
			uniqueDates.add(reservation.getReservationDate());
		}

		// 고유한 날짜의 수 반환
		return uniqueDates.size();
	}

	/**
	 * 예약 목록의 예약 테이블 수의 합을 리턴하는 메소드
	 *
	 * @param reservations 예약 목록
	 * @return 예약 테이블 수 합
	 */
	@Override
	public int getTotalReservationTableCount(List<Reservation> reservations) {
		int totalTableCount = 0;

		// 각 예약별로 연결된 ReservationTable 수를 합산
		for (Reservation reservation : reservations) {
			totalTableCount += reservation.getReservationTables().size(); // 각 예약에 연결된 테이블 수를 더함
		}

		return totalTableCount;
	}

	/**
	 * 상위 3개의 Map 데이터만 가져오는 메소드
	 *
	 * @param originalMap Integer, Long 형태의 Map
	 * @return 상위 3개의 key-value
	 */
	public static Map<Integer, Long> filterTop3ByValueByIntegerMap(Map<Integer, Long> originalMap) {
		return originalMap.entrySet()
			.stream()
			.sorted(Map.Entry.<Integer, Long>comparingByValue().reversed())
			.limit(3)
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				Map.Entry::getValue,
				(e1, e2) -> e1,
				LinkedHashMap::new
			));
	}

	/**
	 * 상위 3개의 Map 데이터만 가져오는 메소드
	 *
	 * @param originalMap String, Long 형태의 Map
	 * @return 상위 3개의 key-value
	 */
	public static Map<String, Long> filterTop3ByValueByStringMap(Map<String, Long> originalMap) {
		return originalMap.entrySet()
			.stream()
			.sorted(Map.Entry.<String, Long>comparingByValue().reversed())
			.limit(3)
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				Map.Entry::getValue,
				(e1, e2) -> e1,
				LinkedHashMap::new
			));
	}

	/**
	 * 시간을 30분 단위의 문자열로 변환하는 메소드
	 *
	 * @param time 변환할 시간
	 * @return 변환된 시간 정보
	 */
	@Override
	public String getHalfHourSlot(LocalTime time) {
		LocalTime halfHourSlot = time.truncatedTo(ChronoUnit.HOURS) // 시간을 먼저 00분으로 맞춘 후
			.plusMinutes(time.getMinute() >= 30 ? 30 : 0); // 30분 기준으로 그룹화
		return halfHourSlot.toString(); // 결과를 "HH:mm" 형식으로 반환
	}

	/**
	 * 요일을 한국어 약어로 변환하는 메소드
	 *
	 * @param dayOfWeek 요일 정보 (DayOfWeek)
	 * @return 한국어 약어 형식의 요일
	 */
	@Override
	public String convertDayOfWeekToKorean(DayOfWeek dayOfWeek) {
		return switch (dayOfWeek) {
			case MONDAY -> "월";
			case TUESDAY -> "화";
			case WEDNESDAY -> "수";
			case THURSDAY -> "목";
			case FRIDAY -> "금";
			case SATURDAY -> "토";
			case SUNDAY -> "일";
		};
	}
}
