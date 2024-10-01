package com.waterdragon.wannaeat.domain.restaurant.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.restaurant.domain.Counter;
import com.waterdragon.wannaeat.domain.restaurant.domain.Kitchen;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;
import com.waterdragon.wannaeat.domain.restaurant.domain.Table;
import com.waterdragon.wannaeat.domain.restaurant.domain.Toilet;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantStructureRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.CounterDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.KitchenDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantStructureDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.TableDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.ToiletDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantElementOutOfRangeException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.RestaurantStructureNotFoundException;
import com.waterdragon.wannaeat.domain.restaurant.exception.error.TableIdDuplicateException;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantRepository;
import com.waterdragon.wannaeat.domain.restaurant.repository.RestaurantStructureRepository;
import com.waterdragon.wannaeat.domain.user.domain.User;
import com.waterdragon.wannaeat.global.exception.error.NotAuthorizedException;
import com.waterdragon.wannaeat.global.util.AuthUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantStructureServiceImpl implements RestaurantStructureService {

	private final RestaurantStructureRepository restaurantStructureRepository;
	private final AuthUtil authUtil;
	private final RestaurantRepository restaurantRepository;

	/**
	 * 매장 구조도 정보 등록 메소드
	 *
	 * @param restaurantStructureRegisterRequestDto 매장 구조도 등록 정보
	 */
	@Override
	@Transactional
	public void registerRestaurantStructure(
		RestaurantStructureRegisterRequestDto restaurantStructureRegisterRequestDto) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 권한 확인
		Restaurant restaurant = restaurantRepository.findByUser(user)
			.orElseThrow(() -> new NotAuthorizedException("매장 구조 등록 권한 없음"));

		// restaurantId로 기존 구조도를 확인하고, 존재하면 삭제
		restaurantStructureRepository.findByRestaurantId(restaurant.getRestaurantId())
			.ifPresent(existingStructure -> {
				restaurantStructureRepository.delete(existingStructure);
				log.info("기존 RestaurantStructure 삭제: restaurantId = {}", restaurant.getRestaurantId());
			});

		// 각각 element 좌표, 층수 유효성 검증, 테이블id 겹치는 값 있는지도 확인
		validateRestaurantStructure(restaurantStructureRegisterRequestDto);

		// 엔티티 변환
		RestaurantStructure restaurantStructure = convertToEntity(restaurantStructureRegisterRequestDto,
			restaurant.getRestaurantId());

		restaurantStructureRepository.save(restaurantStructure);
	}

	/**
	 * 매장 구조도 정보 조회 메소드
	 *
	 * @param restaurantId 매장 id
	 * @return
	 */
	@Override
	public RestaurantStructureDetailResponseDto getDetailRestaurantStructureByRestaurantId(Long restaurantId) {

		RestaurantStructure restaurantStructure = restaurantStructureRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantStructureNotFoundException("해당 매장의 매장 구조도가 존재하지 않습니다."));

		return convertToDto(restaurantStructure);
	}

	// 매장 구조 입력값 유효성 검사
	private void validateRestaurantStructure(RestaurantStructureRegisterRequestDto requestDto) {

		int floorCnt = requestDto.getFloorCnt();

		// Table ID 중복 체크를 위한 Set 생성
		Set<Integer> tableIdSet = new HashSet<>();

		// Table 유효성 검증
		requestDto.getTables().forEach(tableRequestDto -> {
			// 중복 체크
			if (!tableIdSet.add(tableRequestDto.getTableId())) {
				throw new TableIdDuplicateException("테이블 ID가 중복되었습니다: " + tableRequestDto.getTableId());
			}

			validateCoordinates(tableRequestDto.getX(), tableRequestDto.getY());
			validateFloor(tableRequestDto.getFloor(), floorCnt);
		});

		// Table 유효성 검증
		requestDto.getTables().forEach(tableRequestDto -> {
			validateCoordinates(tableRequestDto.getX(), tableRequestDto.getY());
			validateFloor(tableRequestDto.getFloor(), floorCnt);
		});

		// Toilet 유효성 검증
		requestDto.getToilets().forEach(toiletRequestDto -> {
			validateCoordinates(toiletRequestDto.getX(), toiletRequestDto.getY());
			validateFloor(toiletRequestDto.getFloor(), floorCnt);
		});

		// Counter 유효성 검증
		requestDto.getCounters().forEach(toiletRequestDto -> {
			validateCoordinates(toiletRequestDto.getX(), toiletRequestDto.getY());
			validateFloor(toiletRequestDto.getFloor(), floorCnt);
		});

		// Kitchen 유효성 검증
		requestDto.getKitchens().forEach(kitchenRequestDto -> {
			validateCoordinates(kitchenRequestDto.getX(), kitchenRequestDto.getY());
			validateFloor(kitchenRequestDto.getFloor(), floorCnt);
		});
	}

	// 좌표 유효성 검증 (x, y는 0 이상 500 이하)
	private void validateCoordinates(Double x, Double y) {
		if (x < 0 || x > 500 || y < 0 || y > 500) {
			throw new RestaurantElementOutOfRangeException("x와 y 좌표는 0 이상 500 이하이어야 합니다.");
		}
	}

	// 층수 유효성 검증 (floor는 0 이상, floorCnt 이하)
	private void validateFloor(Integer floor, int floorCnt) {
		if (floor <= 0 || floor > floorCnt) {
			throw new RestaurantElementOutOfRangeException("층수는 1 이상, 최대 " + floorCnt + " 이하여야 합니다.");
		}
	}

	// RestaurantStructureRegisterRequestDto -> RestaurantStructure
	private RestaurantStructure convertToEntity(RestaurantStructureRegisterRequestDto dto, Long restaurantId) {

		List<Table> tables = dto.getTables().stream().map(tableDto -> Table.builder()
			.tableId(tableDto.getTableId())
			.assignedSeats(tableDto.getAssignedSeats())
			.x(tableDto.getX())
			.y(tableDto.getY())
			.floor(tableDto.getFloor())
			.build()
		).collect(Collectors.toList());

		List<Toilet> toilets = dto.getToilets().stream().map(toiletDto -> Toilet.builder()
			.x(toiletDto.getX())
			.y(toiletDto.getY())
			.floor(toiletDto.getFloor())
			.build()
		).collect(Collectors.toList());

		List<Counter> counters = dto.getCounters().stream().map(counterDto -> Counter.builder()
			.x(counterDto.getX())
			.y(counterDto.getY())
			.floor(counterDto.getFloor())
			.build()
		).collect(Collectors.toList());

		List<Kitchen> kitchens = dto.getKitchens().stream().map(kitchenDto -> Kitchen.builder()
			.x(kitchenDto.getX())
			.y(kitchenDto.getY())
			.floor(kitchenDto.getFloor())
			.build()
		).collect(Collectors.toList());

		return RestaurantStructure.builder()
			.restaurantId(restaurantId)
			.size(dto.getSize())
			.floorCnt(dto.getFloorCnt())
			.tables(tables)
			.toilets(toilets)
			.counters(counters)
			.kitchens(kitchens)
			.build();
	}

	// RestaurantStructure -> RestaurantStructureDetailResponseDto
	private RestaurantStructureDetailResponseDto convertToDto(RestaurantStructure restaurantStructure) {

		List<TableDetailResponseDto> tableDtos = restaurantStructure.getTables()
			.stream()
			.map(table -> TableDetailResponseDto.builder()
				.tableId(table.getTableId())
				.assignedSeats(table.getAssignedSeats())
				.x(table.getX())
				.y(table.getY())
				.floor(table.getFloor())
				.build()
			)
			.collect(Collectors.toList());

		List<ToiletDetailResponseDto> toiletDtos = restaurantStructure.getToilets()
			.stream()
			.map(toilet -> ToiletDetailResponseDto.builder()
				.x(toilet.getX())
				.y(toilet.getY())
				.floor(toilet.getFloor())
				.build()
			)
			.collect(Collectors.toList());

		List<CounterDetailResponseDto> counterDtos = restaurantStructure.getCounters()
			.stream()
			.map(counter -> CounterDetailResponseDto.builder()
				.x(counter.getX())
				.y(counter.getY())
				.floor(counter.getFloor())
				.build()
			)
			.collect(Collectors.toList());

		List<KitchenDetailResponseDto> kitchenDtos = restaurantStructure.getKitchens()
			.stream()
			.map(kitchen -> KitchenDetailResponseDto.builder()
				.x(kitchen.getX())
				.y(kitchen.getY())
				.floor(kitchen.getFloor())
				.build()
			)
			.collect(Collectors.toList());

		return RestaurantStructureDetailResponseDto.builder()
			.restaurantId(restaurantStructure.getRestaurantId())
			.size(restaurantStructure.getSize())
			.floorCnt(restaurantStructure.getFloorCnt())
			.tables(tableDtos)
			.toilets(toiletDtos)
			.counters(counterDtos)
			.kitchens(kitchenDtos)
			.build();
	}
}
