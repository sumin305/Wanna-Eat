package com.waterdragon.wannaeat.domain.restaurant.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.menu.dto.response.MenuListResponseDto;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.menu.service.MenuService;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationTable;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationTableRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantCategory;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantFilter;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantImage;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;
import com.waterdragon.wannaeat.domain.restaurant.domain.Table;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantEditRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantCategoryDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantCategoryListResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantMapDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantMapListResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.SsafyRestaurantResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.DuplicateBusinessNumberException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.FailureRegistRestaurantToSsafyException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidBreakStartEndTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterReservationDateException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidFilterTimeSequenceException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidMerchantNameException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidRestaurantOpenCloseTimeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.InvalidUserLocationException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantAlreadyExistException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantCategoryNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.TimeRequestWithoutDateException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantCategoryRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantCustomRepositoryImpl;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantImageRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantStructureRepository;
import com.waterdragon.wannaeat.domain.restaurantlike.repository.RestaurantLikeRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.domain.user.domain.enums.Role;
import com.waterdragon.wannaeat.global.exception.error.FileUploadMoreThanTenException;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;
import com.waterdragon.wannaeat.global.util.S3Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

	@Value("${ssafypay.api-key}")
	private String API_KEY;

	@Value("${ssafypay.merchant-register-merchant-url}")
	private String MERCHANT_REGISTER_URL;

	@Value("${ssafypay.category-id}")
	private String CATEGORY_ID;

	// 시간 형식을 정의 ("HH:mm" 형식)
	private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

	private final RestaurantRepository restaurantRepository;
	private final RestaurantCategoryRepository restaurantCategoryRepository;
	private final RestaurantImageRepository restaurantImageRepository;
	private final MenuRepository menuRepository;
	private final S3Util fileUtil;
	private final AuthUtil authUtil;
	private final RestaurantCustomRepositoryImpl restaurantCustomRepositoryImpl;
	private final ReservationTableRepository reservationTableRepository;
	private final RestaurantStructureRepository restaurantStructureRepository;
	private final ReservationRepository reservationRepository;
	private final MenuService menuService;
	private final RestaurantLikeRepository restaurantLikeRepository;

	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * 매장 등록 메소드
	 *
	 * @param restaurantRegisterRequestDto 매장 기본 정보
	 * @return void 매장 등록 결과
	 */
	@Override
	@Transactional
	public void registerRestaurant(RestaurantRegisterRequestDto restaurantRegisterRequestDto) {

		// 인증 회원객체
		User user = authUtil.getAuthenticatedUser();

		if (user.getRole() != Role.MANAGER) {
			throw new NotAuthorizedException("식당은 사업자만 등록할 수 있습니다.");
		}

		if (user.getRestaurant() != null) {
			throw new RestaurantAlreadyExistException("한 아이디 당 하나의 식당만 등록 가능합니다.");
		}

		// 사업자 등록번호 중복 체크
		String businessNumber = restaurantRegisterRequestDto.getRestaurantBusinessNumber();
		restaurantRepository.findByBusinessNumber(businessNumber)
			.ifPresent((existingRestaurant) -> {
				throw new DuplicateBusinessNumberException("사업자 등록번호 중복 : " + businessNumber);
			});

		// 미유효 식당 카테고리 체크
		Long categoryId = restaurantRegisterRequestDto.getRestaurantCategoryId();
		RestaurantCategory restaurantCategory = restaurantCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new RestaurantCategoryNotFoundException("미유효 식당 카테고리 번호 : " + categoryId));

		String restaurantName = restaurantRegisterRequestDto.getRestaurantName();
		//SsafyPay에 가맹점 등록
		SsafyRestaurantResponseDto ssafyRestaurantResponseDto = registerSsafyRestaurant(restaurantName);

		// 등록된 가맹점 코드 가져오기
		Long merchantId = getMerchantId(restaurantName, ssafyRestaurantResponseDto);

		// Restaurant 엔티티 생성 후 저장
		Restaurant restaurant = Restaurant.builder()
			.user(user)
			.businessNumber(restaurantRegisterRequestDto.getRestaurantBusinessNumber())
			.ownerName(restaurantRegisterRequestDto.getRestaurantOwnerName())
			.address(restaurantRegisterRequestDto.getRestaurantAddress())
			.phone(restaurantRegisterRequestDto.getRestaurantPhone())
			.name(restaurantRegisterRequestDto.getRestaurantName())
			.category(restaurantCategory)
			.merchantId(merchantId)
			.build();
		restaurantRepository.save(restaurant);
	}

	/**
	 * 조건별 매장 목록 조회
	 *
	 * @param categoryId 카테고리 id
	 * @param keyword 검색어
	 * @param reservationDate 예약 일자
	 * @param startTime 예약 시작 시간
	 * @param endTime 예약 끝 시간
	 * @param memberCount 예약 인원 수
	 * @param latitude 사용자 위도
	 * @param longitude 사용자 경도
	 * @return RestaurantMapListResponseDto 해당하는 매장 거리순 최대 30개 반환
	 */
	@Override
	public RestaurantMapListResponseDto getListRestaurantsByFilter(
		Long categoryId,
		String keyword,
		LocalDate reservationDate,
		LocalTime startTime,
		LocalTime endTime,
		Integer memberCount,
		Double latitude,
		Double longitude) {

		// GPS 입력은 필수
		if (latitude == null || longitude == null) {
			throw new InvalidUserLocationException("사용자 위도, 경도 값 없음.");
		}

		// RestaurantFilter 생성
		RestaurantFilter filter = RestaurantFilter.builder()
			.categoryId(categoryId)
			.keyword(keyword)
			.reservationDate(reservationDate)
			.startTime(startTime)
			.endTime(endTime)
			.memberCount(memberCount)
			.latitude(latitude)
			.longitude(longitude)
			.build();

		// 날짜, 시간 예외 처리
		if (filter.getReservationDate() != null) {
			// 오늘 이전의 날짜로 요청
			if (filter.getReservationDate().isBefore(LocalDate.now())) {
				throw new InvalidFilterReservationDateException("필터링 날짜는 오늘 이후여야 합니다.");
			}

			// 둘 다 시간이 있는 경우에
			if (filter.getStartTime() != null && filter.getEndTime() != null) {
				if (filter.getEndTime().isBefore(filter.getStartTime())) {
					throw new InvalidFilterTimeSequenceException("요청 시간 순서가 잘못되었습니다.");
				}
			}

		} else { // 날짜 입력 없는 경우
			// 날짜 입력 없는데, 시간 입력이 있는 경우
			if (filter.getStartTime() != null || filter.getEndTime() != null) {
				throw new TimeRequestWithoutDateException("날짜 없이 시간 필터링 요청은 불가능합니다.");
			}
		}

		// 카테고리, 식당 이름, 메뉴 필터링
		List<Restaurant> restaurants = restaurantCustomRepositoryImpl.findRestaurantsByFilter(filter);

		// 예약 가능한 테이블이 있는 식당 필터링 (날짜 입력 있는 경우에만)
		if (filter.getReservationDate() != null) {
			restaurants = restaurants.stream()
				.filter(restaurant -> checkAvailableTables(filter, restaurant))
				.toList();
		}

		// 거리 순 30개 제한해서 return
		List<RestaurantMapDetailResponseDto> restaurantMapDetailResponseDtos = restaurants.stream()
			.sorted(Comparator.comparingDouble(restaurant -> calculateDistance(
				filter.getLatitude(), filter.getLongitude(),
				restaurant.getLatitude(), restaurant.getLongitude())))
			.limit(30)
			.map(this::toRestaurantMapDetailResponseDto)
			.toList();

		// RestaurantMapListResponseDto로 반환
		return RestaurantMapListResponseDto.builder()
			.restaurantMapDetailResponseDtos(restaurantMapDetailResponseDtos)
			.build();
	}

	// 해당 식당에 대해서 빈(가능한) 테이블 확인 메소드
	private boolean checkAvailableTables(RestaurantFilter filter, Restaurant restaurant) {

		// MongoDB에서 해당 식당의 모든 테이블 가져오기 (인원 수 크거나 같은 애들만)
		List<Table> tables = getTablesFromMongoDB(restaurant.getRestaurantId());

		// startTime, endTime 가공 작업
		LocalTime startTime = filter.getStartTime();
		LocalTime endTime = filter.getEndTime();

		// 오늘 날짜인지 확인
		if (filter.getReservationDate().isEqual(LocalDate.now())) {
			// startTime이 없거나 과거 시간일 경우 현재 시간으로 설정, 그렇지 않으면 필터 값을 사용
			if (startTime == null) {
				startTime = LocalTime.now();
			} else if (startTime.isBefore(LocalTime.now())) {
				throw new InvalidFilterTimeSequenceException("지금보다 이전의 시작시각으로 필터링할 수 없습니다.");
			}

			// endTime이 없으면 레스토랑 종료 시간 또는 23:59로 설정, 과거 시간일 경우 예외 발생
			if (endTime == null) {
				endTime = (restaurant.getCloseTime() != null) ? restaurant.getCloseTime() : LocalTime.of(23, 59);
			} else if (endTime.isBefore(LocalTime.now())) {
				throw new InvalidFilterTimeSequenceException("지금보다 이전의 끝시각으로 필터링 할 수 없습니다.");
			}
		} else {
			// startTime이 없으면 00:00으로 설정
			startTime = (startTime == null) ? LocalTime.of(0, 0) : startTime;

			// endTime이 없으면 레스토랑 종료 시간 또는 23:59로 설정
			if (endTime == null) {
				endTime = (restaurant.getCloseTime() != null) ? restaurant.getCloseTime() : LocalTime.of(23, 59);
			}
		}

		// 내가 필터링 주문한 시간대에 대해서, 예약 정보가 있는 테이블들 몽땅 가져오기
		List<ReservationTable> reservedTables = reservationTableRepository.findReservedTables(
			restaurant.getRestaurantId(),
			filter.getReservationDate(),
			startTime,
			endTime
		);

		// 예약된 테이블들을 기준으로 tableId를 key로 하는 Map 생성
		Map<Integer, boolean[]> tableAvailabilityMap = new HashMap<>();

		// 시간 단위로 배열 생성 (startTime ~ endTime, 분 단위)
		int totalMinutes = (int)java.time.Duration.between(startTime, endTime).toMinutes();

		// 테이블 별로 초기화된 배열 생성
		for (Table table : tables) {
			tableAvailabilityMap.put(table.getTableId(), new boolean[totalMinutes]); // boolean 배열은 기본값이 false로 초기화됨
		}

		// 예약된 테이블의 예약 시간에 해당하는 리스트에 'true'로 색칠
		for (ReservationTable reservationTable : reservedTables) {

			LocalTime reservationStartTime = reservationTable.getReservation().getStartTime();
			LocalTime reservationEndTime = reservationTable.getReservation().getEndTime();
			int startMinuteIndex = (int)java.time.Duration.between(startTime, reservationStartTime).toMinutes();
			int endMinuteIndex = (int)java.time.Duration.between(startTime, reservationEndTime).toMinutes();

			// 예약 시간이 전체 범위를 벗어나면 조정
			startMinuteIndex = Math.max(0, startMinuteIndex);
			endMinuteIndex = Math.min(totalMinutes, endMinuteIndex);

			// 해당 예약 테이블이 요청에 대해 예약 가능한 테이블인지 확인
			if (!tableAvailabilityMap.containsKey(reservationTable.getTableId()))
				continue;
			// 예약된 시간에 대해 색칠
			boolean[] timeSlots = tableAvailabilityMap.get(reservationTable.getTableId());
			for (int i = startMinuteIndex; i < endMinuteIndex; i++) {
				timeSlots[i] = true; // 예약된 시간대를 true로 설정
			}

		}

		// 브레이크 타임에 대해 색칠 (breakStartTime ~ breakEndTime)
		if (restaurant.getBreakStartTime() != null && restaurant.getBreakEndTime() != null) {
			int breakStartMinuteIndex = (int)java.time.Duration.between(startTime, restaurant.getBreakStartTime())
				.toMinutes();
			int breakEndMinuteIndex = (int)java.time.Duration.between(startTime, restaurant.getBreakEndTime())
				.toMinutes();

			// 브레이크 타임이 전체 범위를 벗어나면 조정
			breakStartMinuteIndex = Math.max(0, breakStartMinuteIndex);
			breakEndMinuteIndex = Math.min(totalMinutes, breakEndMinuteIndex);

			// 모든 테이블에 대해 브레이크 타임을 색칠
			for (boolean[] timeSlots : tableAvailabilityMap.values()) {
				for (int i = breakStartMinuteIndex; i < breakEndMinuteIndex; i++) {
					timeSlots[i] = true; // 브레이크 타임을 true로 설정
				}
			}
		}

		// 모든 테이블에 대해 예약되지 않은 시간대가 있는지 확인
		for (Map.Entry<Integer, boolean[]> entry : tableAvailabilityMap.entrySet()) {
			boolean[] timeSlots = entry.getValue();
			boolean isAvailable = false;

			// 배열에서 예약되지 않은 시간대(false)가 있는지 확인
			for (boolean slot : timeSlots) {
				if (!slot) { // false가 있으면 예약 가능한 테이블로 판단
					isAvailable = true;
					break;
				}
			}

			if (isAvailable) {
				return true;
			}
		}

		// 예약 가능한 테이블이 없으면 false 반환
		return false;
	}

	// MongoDB에서 해당 식당의 테이블 목록 조회 메소드 (인원 수 크거나 같은 테이블만)
	private List<Table> getTablesFromMongoDB(Long restaurantId) {
		// 우선 모든 테이블을 불러옴
		List<Table> tables = restaurantStructureRepository.findByRestaurantId(restaurantId)
			.map(RestaurantStructure::getTables)
			.orElse(Collections.emptyList());

		return tables;
	}

	// Restaurant -> RestaurantMapDetailResponseDto 변환 메소드
	private RestaurantMapDetailResponseDto toRestaurantMapDetailResponseDto(Restaurant restaurant) {
		return RestaurantMapDetailResponseDto.builder()
			.restaurantId(restaurant.getRestaurantId())
			.restaurantName(restaurant.getName())
			.latitude(restaurant.getLatitude())
			.longitude(restaurant.getLongitude())
			.build();
	}

	// 피타고라스 거리 계산
	private double calculateDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
		return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
	}

	/**
	 * 매장 상세 조회 메소드 (메뉴 포함)
	 *
	 * @param restaurantId 매장 id
	 * @return RestaurantDetailResponseDto 매장 상세 조회 결과
	 */
	@Override
	public RestaurantDetailResponseDto getDetailRestaurantByRestaurantId(Long restaurantId) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 식당 존재여부 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantNotFoundException("해당 매장 찾을 수 없음. restaurantId : " + restaurantId));

		// 식당 좋아요 여부 확인
		boolean isLiking = restaurantLikeRepository.findByUserAndRestaurant(user, restaurant).isPresent();

		// 식당 메뉴 목록 불러오기
		MenuListResponseDto menuListResponseDto = menuService.getListMenuByRestaurantId(restaurantId);

		return RestaurantDetailResponseDto.builder()
			.restaurantBusinessNumber(restaurant.getBusinessNumber())
			.restaurantOwnerName(restaurant.getOwnerName())
			.restaurantAddress(restaurant.getAddress())
			.restaurantPhone(restaurant.getPhone())
			.restaurantName(restaurant.getName())
			.restaurantCategoryName(restaurant.getCategory().getCategoryName())
			.restaurantOpenTime(formatTime(restaurant.getOpenTime()))
			.restaurantCloseTime(formatTime(restaurant.getCloseTime()))
			.breakStartTime(formatTime(restaurant.getBreakStartTime()))
			.breakEndTime(formatTime(restaurant.getBreakEndTime()))
			.maxReservationTime(restaurant.getMaxReservationTime())
			.minMemberCount(restaurant.getMinMemberCount())
			.maxMemberCount(restaurant.getMaxMemberCount())
			.depositPerMember(restaurant.getDepositPerMember())
			.restaurantDescription(restaurant.getDescription())
			.latitude(restaurant.getLatitude())
			.longitude(restaurant.getLongitude())
			.merchantId(restaurant.getMerchantId())
			.menuListResponseDto(menuListResponseDto)
			.restaurantLike(isLiking)
			.build();
	}

	/**
	 * 전체 매장 카테고리 목록 조회 메소드
	 *
	 * @return RestaurantCategoryListResponseDto 매장 카테고리 목록
	 */
	@Override
	public RestaurantCategoryListResponseDto getListRestaurantCategories() {

		// RestaurantCategory 엔티티 목록 조회
		List<RestaurantCategory> categories = restaurantCategoryRepository.findAll();

		// List<RestaurantCategoryDetailResponseDto>로 반환
		List<RestaurantCategoryDetailResponseDto> restaurantCategoryListResponseDtos = categories.stream()
			.map(category -> RestaurantCategoryDetailResponseDto.builder()
				.restaurantCategoryId(category.getCategoryId())
				.restaurantCategoryName(category.getCategoryName())
				.restaurantCategoryImage(category.getCategoryImage())
				.build())
			.toList();

		// RestaurantCategoryListResponseDto로 변환
		return RestaurantCategoryListResponseDto.builder()
			.restaurantCategories(restaurantCategoryListResponseDtos)
			.build();
	}

	/**
	 * 매장 수정 메소드
	 *
	 * @param restaurantEditRequestDto 매장 수정 정보
	 * @return void 매장 수정 결과
	 */
	@Override
	@Transactional
	public void editRestaurant(Long restaurantId, RestaurantEditRequestDto restaurantEditRequestDto,
		List<MultipartFile> multipartFiles) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 식당 존재여부 및 유저에 해당하는 식당인지 확인
		Restaurant restaurant = restaurantRepository.findByRestaurantIdAndUser(restaurantId, user)
			.orElseThrow(() -> new NotAuthorizedException("식당 수정 권한 없음."));

		// 사업자 등록번호 중복 체크 (내 식당은 빼고)
		String businessNumber = restaurantEditRequestDto.getRestaurantBusinessNumber();
		restaurantRepository.findByBusinessNumberAndRestaurantIdNot(businessNumber, restaurant.getRestaurantId())
			.ifPresent((existingRestaurant) -> {
				throw new DuplicateBusinessNumberException("사업자 등록번호 중복 : " + businessNumber);
			});

		// 미유효 식당 카테고리 체크
		Long categoryId = restaurantEditRequestDto.getRestaurantCategoryId();
		RestaurantCategory restaurantCategory = restaurantCategoryRepository.findByCategoryId(categoryId)
			.orElseThrow(() -> new RestaurantCategoryNotFoundException("미유효 식당 카테고리 번호 : " + categoryId));

		// 식당 시간 순서 체크
		if (restaurantEditRequestDto.getRestaurantCloseTime()
			.isBefore(restaurantEditRequestDto.getRestaurantOpenTime())) {
			throw new InvalidRestaurantOpenCloseTimeException("매장 마감 시간은 오픈 시간 이후여야 합니다.");
		}

		// 브레이크타임 시간 순서 체크
		if (restaurantEditRequestDto.getBreakEndTime().isBefore(restaurantEditRequestDto.getBreakStartTime())) {
			throw new InvalidBreakStartEndTimeException("브레이크타임 종료 시간은 브레이크타임 시작 시간 이후여야 합니다.");
		}

		// Restaurant 엔티티 수정 후 저장
		restaurant.update(
			restaurantCategory,
			restaurantEditRequestDto.getRestaurantBusinessNumber(),
			restaurantEditRequestDto.getRestaurantOwnerName(),
			restaurantEditRequestDto.getRestaurantName(),
			restaurantEditRequestDto.getRestaurantAddress(),
			restaurantEditRequestDto.getRestaurantPhone(),
			restaurantEditRequestDto.getRestaurantOpenTime(),
			restaurantEditRequestDto.getRestaurantCloseTime(),
			restaurantEditRequestDto.getBreakStartTime(),
			restaurantEditRequestDto.getBreakEndTime(),
			restaurantEditRequestDto.getMaxReservationTime(),
			restaurantEditRequestDto.getMinMemberCount(),
			restaurantEditRequestDto.getMaxMemberCount(),
			restaurantEditRequestDto.getDepositPerMember(),
			restaurantEditRequestDto.getRestaurantDescription(),
			restaurantEditRequestDto.getLatitude(),
			restaurantEditRequestDto.getLongitude());
		restaurantRepository.save(restaurant);

		if (multipartFiles != null && !multipartFiles.isEmpty()) {
			// 기존 사진 삭제 (파일, db 모두)
			deleteExistingRestaurantImage(restaurant);

			// 매장 사진 등록 및 수정
			uploadNewRestaurantImages(restaurant, multipartFiles);
		}

	}

	// 기존 매장 사진 삭제 메소드
	private void deleteExistingRestaurantImage(Restaurant restaurant) {

		List<RestaurantImage> existingRestaurantImages = restaurantImageRepository.findAllByRestaurant(restaurant);

		for (RestaurantImage existingRestaurantImage : existingRestaurantImages) {
			fileUtil.deleteFile(existingRestaurantImage.getImageUrl());
			restaurantImageRepository.delete(existingRestaurantImage);
		}
	}

	// 새로운 매장 사진 등록 메소드
	private void uploadNewRestaurantImages(Restaurant restaurant, List<MultipartFile> multipartFiles) {

		if (multipartFiles.size() > 10) {
			throw new FileUploadMoreThanTenException("파일을 10개 이상 업로드할 수 없습니다.");
		}

		for (MultipartFile file : multipartFiles) {
			String uploadedRestaurantImageFileName = fileUtil.uploadFile(file);
			log.info("uploaded file : " + uploadedRestaurantImageFileName);

			RestaurantImage restaurantImage = RestaurantImage.builder()
				.restaurant(restaurant)
				.imageUrl(uploadedRestaurantImageFileName)
				.build();
			restaurantImageRepository.save(restaurantImage);
		}
	}

	// 시간(LocalTime)을 "HH:mm" 형식으로 포맷하는 메소드
	private String formatTime(LocalTime time) {
		return time != null ? time.format(TIME_FORMATTER) : null;
	}

	@Override
	public SsafyRestaurantResponseDto registerSsafyRestaurant(String restaurantName) {
		// 오늘 날짜를 "yyyyMMdd" 형식으로 변환 (예: 20240408)
		String transmissionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		// 현재 시각을 "HHmmss" 형식으로 변환 (예: 135601)
		String transmissionTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
		// 20자리 난수
		String randomString = generateUUIDBasedNumber(20);

		// 요청할 API의 URL
		String url = MERCHANT_REGISTER_URL;

		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json"); // 요청의 Content-Type을 JSON으로 설정

		// 요청 본문 데이터 설정
		Map<String, Object> requestBody = new HashMap<>();
		Map<String, String> header = new HashMap<>();
		header.put("apiName", "createMerchant");
		header.put("transmissionDate", transmissionDate);
		header.put("transmissionTime", transmissionTime);
		header.put("institutionCode", "00100");
		header.put("fintechAppNo", "001");
		header.put("apiServiceCode", "createMerchant");
		header.put("institutionTransactionUniqueNo", randomString);
		header.put("apiKey", API_KEY);

		requestBody.put("Header", header);
		requestBody.put("categoryId", CATEGORY_ID);
		requestBody.put("merchantName", restaurantName);

		// HttpEntity에 헤더와 본문 데이터 설정
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

		// POST 요청 보내기
		ResponseEntity<SsafyRestaurantResponseDto> response = restTemplate.exchange(
			url,
			HttpMethod.POST,
			requestEntity,
			SsafyRestaurantResponseDto.class
		);

		if (!response.getBody().getHeader().getResponseCode().equals("H0000")) {
			throw new FailureRegistRestaurantToSsafyException(
				"SsafyPay 가맹점 등록 실패:" + response.getBody().getHeader().getResponseCode());
		}

		return response.getBody();
	}

	@Override
	public Long getMerchantId(String restaurantName, SsafyRestaurantResponseDto response) {
		SsafyRestaurantResponseDto.ResponseRec responseRec = response.getRecs().get(response.getRecs().size() - 1);
		if (!responseRec.getMerchantName().equals(restaurantName))
			throw new InvalidMerchantNameException("등록하려는 식당명과 가맹점 명이 일치하지 않습니다.");
		return responseRec.getMerchantId();
	}

	// 20자리 난수 생성 메소드
	public String generateUUIDBasedNumber(int length) {
		// UUID 생성
		UUID uuid = UUID.randomUUID();

		// UUID의 숫자 부분을 추출하고 숫자만 남긴다.
		String numericUUID = uuid.toString().replaceAll("[^0-9]", "");

		// 만약 UUID에서 나온 숫자가 부족하면 UUID를 다시 생성해서 합칠 수 있습니다.
		while (numericUUID.length() < length) {
			uuid = UUID.randomUUID();
			numericUUID += uuid.toString().replaceAll("[^0-9]", "");
		}

		// 20자리로 자르기
		return numericUUID.substring(0, length);
	}
}
