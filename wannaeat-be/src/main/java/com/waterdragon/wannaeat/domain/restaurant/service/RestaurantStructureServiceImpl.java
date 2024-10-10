package com.waterdragon.wannaeat.domain.restaurant.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.restaurant.domain.Element;
import com.waterdragon.wannaeat.domain.restaurant.domain.ItemType;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantStructure;
import com.waterdragon.wannaeat.domain.restaurant.domain.Table;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.ElementRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.RestaurantStructureRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.request.TableRegisterRequestDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.ElementDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.RestaurantStructureDetailResponseDto;
import com.waterdragon.wannaeat.domain.restaurant.dto.response.TableDetailResponseDto;
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
	 * @param requestDto 매장 구조도 등록 정보
	 */
	@Override
	@Transactional
	public void registerRestaurantStructure(RestaurantStructureRegisterRequestDto requestDto) {

		// 인증 회원 객체
		User user = authUtil.getAuthenticatedUser();

		// 권한 확인
		Restaurant restaurant = restaurantRepository.findByUser(user)
			.orElseThrow(() -> new NotAuthorizedException("매장 구조 등록 권한 없음"));

		// 기존 구조도 삭제
		deleteExistingStructure(restaurant.getRestaurantId());

		// 유효성 검증
		validateRestaurantStructure(requestDto);

		// 엔티티 변환 후 저장
		RestaurantStructure restaurantStructure = convertToEntity(requestDto, restaurant.getRestaurantId());
		restaurantStructureRepository.save(restaurantStructure);
	}

	/**
	 * 매장 구조도 정보 조회
	 *
	 * @param restaurantId 매장 id
	 * @return RestaurantStructureDetailResponseDto 매장 구조도
	 */
	@Override
	public RestaurantStructureDetailResponseDto getDetailRestaurantStructureByRestaurantId(Long restaurantId) {
		// restaurantId로 RestaurantStructure 조회
		RestaurantStructure restaurantStructure = restaurantStructureRepository.findByRestaurantId(restaurantId)
			.orElseThrow(() -> new RestaurantStructureNotFoundException("해당 매장의 매장 구조도가 존재하지 않습니다."));

		// Table 리스트를 TableDetailResponseDto로 변환
		List<TableDetailResponseDto> tableDetailResponseDtos = restaurantStructure.getTables().stream()
			.map(table -> TableDetailResponseDto.builder()
				.tableId(table.getTableId())
				.assignedSeats(table.getAssignedSeats())
				.itemId(table.getItemId())
				.itemType(table.getItemType().getItemType())  // Enum에서 문자열로 변환
				.x(table.getX())
				.y(table.getY())
				.floor(table.getFloor())
				.build())
			.collect(Collectors.toList());

		// Element 리스트를 ElementDetailResponseDto로 변환
		List<ElementDetailResponseDto> elementDetailResponseDtos = restaurantStructure.getElements().stream()
			.map(element -> ElementDetailResponseDto.builder()
				.itemId(element.getItemId())
				.itemType(element.getItemType().getItemType())  // Enum에서 문자열로 변환
				.x(element.getX())
				.y(element.getY())
				.floor(element.getFloor())
				.build())
			.collect(Collectors.toList());

		// 최종 RestaurantStructureDetailResponseDto 반환
		return RestaurantStructureDetailResponseDto.builder()
			.restaurantId(restaurantStructure.getRestaurantId())
			.size(restaurantStructure.getSize())
			.floorCnt(restaurantStructure.getFloorCnt())
			.tableDetailResponseDtos(tableDetailResponseDtos)
			.elementDetailResponseDtos(elementDetailResponseDtos)
			.build();
	}

	// 기존 구조도 삭제 메소드
	@Transactional
	public void deleteExistingStructure(Long restaurantId) {
		restaurantStructureRepository.findByRestaurantId(restaurantId)
			.ifPresent(existingStructure -> {
				restaurantStructureRepository.delete(existingStructure);
				log.info("기존 RestaurantStructure 삭제: restaurantId = {}", restaurantId);
			});
	}

	// 매장 구조 유효성 검사
	@Transactional
	public void validateRestaurantStructure(RestaurantStructureRegisterRequestDto requestDto) {
		int floorCnt = requestDto.getFloorCnt();
		Set<Integer> tableIdSet = new HashSet<>();  // Table ID 중복 체크

		// 테이블 유효성 검사
		requestDto.getTableRegisterRequestDtos().forEach(table -> {
			validateCoordinatesAndFloor(table.getX(), table.getY(), table.getFloor(), floorCnt);
			validateTableId(table, tableIdSet);
		});

		// 일반 엘리먼트 유효성 검사
		requestDto.getElementRegisterRequestDtos().forEach(element -> {
			validateCoordinatesAndFloor(element.getX(), element.getY(), element.getFloor(), floorCnt);
		});
	}

	// 좌표와 층수 유효성 검증 통합
	@Transactional
	public void validateCoordinatesAndFloor(Double x, Double y, Integer floor, int floorCnt) {
		if (x < 0 || x > 500 || y < 0 || y > 500) {
			throw new RestaurantElementOutOfRangeException("x와 y 좌표는 0 이상 500 이하이어야 합니다.");
		}
		if (floor <= 0 || floor > floorCnt) {
			throw new RestaurantElementOutOfRangeException("층수는 1 이상, 최대 " + floorCnt + " 이하여야 합니다.");
		}
	}

	// 테이블 ID 유효성 검사
	@Transactional
	public void validateTableId(TableRegisterRequestDto table, Set<Integer> tableIdSet) {
		Integer tableId = table.getTableId();
		if (!tableIdSet.add(tableId)) {
			throw new TableIdDuplicateException("테이블 ID가 중복되었습니다: " + tableId);
		}
	}

	// RestaurantStructureRegisterRequestDto -> RestaurantStructure 엔티티 변환
	private RestaurantStructure convertToEntity(RestaurantStructureRegisterRequestDto dto, Long restaurantId) {
		List<Table> tables = dto.getTableRegisterRequestDtos().stream()
			.map(this::convertTableDtoToEntity)
			.collect(Collectors.toList());

		List<Element> elements = dto.getElementRegisterRequestDtos().stream()
			.map(this::convertElementDtoToEntity)
			.collect(Collectors.toList());

		return RestaurantStructure.builder()
			.restaurantId(restaurantId)
			.size(dto.getSize())
			.floorCnt(dto.getFloorCnt())
			.tables(tables)
			.elements(elements)
			.build();
	}

	// Table DTO -> Table 엔티티 변환
	private Table convertTableDtoToEntity(TableRegisterRequestDto dto) {
		return Table.builder()
			.itemId(dto.getItemId())
			.itemType(ItemType.valueOf(dto.getItemType().toUpperCase()))
			.x(dto.getX())
			.y(dto.getY())
			.floor(dto.getFloor())
			.tableId(dto.getTableId())
			.assignedSeats(dto.getAssignedSeats())
			.build();
	}

	// Element DTO -> Element 엔티티 변환
	private Element convertElementDtoToEntity(ElementRegisterRequestDto dto) {
		return Element.builder()
			.itemId(dto.getItemId())
			.itemType(ItemType.valueOf(dto.getItemType().toUpperCase()))
			.x(dto.getX())
			.y(dto.getY())
			.floor(dto.getFloor())
			.build();
	}
}
