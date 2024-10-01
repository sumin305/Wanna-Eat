package com.waterdragon.wannaeat.domain.cart.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.waterdragon.wannaeat.domain.cart.domain.Cart;
import com.waterdragon.wannaeat.domain.cart.domain.CartMenu;
import com.waterdragon.wannaeat.domain.cart.dto.request.CartRegisterRequestDto;
import com.waterdragon.wannaeat.domain.cart.dto.response.CartDetailResponseDto;
import com.waterdragon.wannaeat.domain.cart.dto.response.CartElementResponseDto;
import com.waterdragon.wannaeat.domain.cart.dto.response.CartMenuResponseDto;
import com.waterdragon.wannaeat.domain.cart.dto.response.CartResponseDto;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartMenuCntMinusException;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartMenuPlusMinusException;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartNotFoundException;
import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotBelongToRestaurantException;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotFoundException;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationParticipantNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationParticipantRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.socket.domain.enums.SocketType;
import com.waterdragon.wannaeat.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	@Value("${spring.cart-expiration-millis}")
	private int cartExpirationMillis;

	private final SimpMessageSendingOperations sendingOperations;
	private final ReservationRepository reservationRepository;
	private final ReservationParticipantRepository reservationParticipantRepository;
	private final MenuRepository menuRepository;
	private final RedisService redisService;

	private static final String CART_KEY_PREFIX = "cart_";

	/**
	 * 소켓 요청 들어왔을 때, MongoDB 장바구니 업데이트 메소드
	 *
	 * @param cartRegisterRequestDto
	 */
	@Override
	public void registerCart(CartRegisterRequestDto cartRegisterRequestDto) {

		// reservationUrl 유효성 확인
		Reservation reservation = validateReservationUrl(cartRegisterRequestDto);

		// reservationParticipantId 유효성 확인
		ReservationParticipant reservationParticipant = validateReservationParticipantId(cartRegisterRequestDto);

		// menu 유효성 확인
		Menu menu = validateMenuId(cartRegisterRequestDto);

		// restaurant에 menu 존재하는지 확인
		validateRestaurantMenu(reservation, menu);

		// 증감량 +1, -1 아닌지 확인
		if (cartRegisterRequestDto.getMenuPlusMinus() != 1 && cartRegisterRequestDto.getMenuPlusMinus() != -1) {
			throw new CartMenuPlusMinusException("증감량은 +1이거나 -1이어야 합니다.");
		}

		// Redis에서 Cart 찾기
		String cartKey = CART_KEY_PREFIX + reservation.getReservationUrl();
		// Object -> Cart 형 변환
		Object cachedObject = redisService.getValues(cartKey);
		ObjectMapper objectMapper = new ObjectMapper();
		Cart cart = objectMapper.convertValue(cachedObject, Cart.class);

		// Cart가 없으면 새로 생성
		if (cart == null) {
			cart = Cart.builder()
				.reservationId(reservation.getReservationId())
				.cartElements(new HashMap<>())
				.cartTotalPrice(0)
				.build();
		}

		// Cart에서 CartElement 가져오기 (해당 참가자의 cartElement) 가져오기
		Map<Long, Map<Long, CartMenu>> cartElements = cart.getCartElements();
		Map<Long, CartMenu> cartElement = cartElements.getOrDefault(
			reservationParticipant.getReservationParticipantId(), new HashMap<>());

		// 해당 메뉴에 대한 CartMenu 객체 수정하거나 생성해서 cartElement 만들기
		CartMenu cartMenu = cartElement.get(menu.getMenuId());
		if (cartMenu != null) {
			// 기존 메뉴가 있을 때
			int newMenuCnt = (int)(cartMenu.getMenuCnt() + cartRegisterRequestDto.getMenuPlusMinus());
			if (newMenuCnt < 0) {
				throw new CartMenuCntMinusException("메뉴의 재고수량은 음수가 될 수 없습니다.");
			}
			// 수량, 가격만 업데이트
			cartMenu.setMenuCnt(newMenuCnt);
			cartMenu.setMenuTotalPrice(newMenuCnt * cartMenu.getMenuPrice());
		} else {
			// 기존 메뉴가 없을 때
			if (cartRegisterRequestDto.getMenuPlusMinus() == -1) {
				throw new CartMenuCntMinusException("메뉴의 재고수량은 음수가 될 수 없습니다.");
			}
			// CartMenu 정보 새로 만들기
			cartMenu = CartMenu.builder()
				.menuName(menu.getName())
				.menuImage(menu.getImage())
				.menuPrice(menu.getPrice())
				.menuCnt(cartRegisterRequestDto.getMenuPlusMinus().intValue())
				.menuTotalPrice(cartRegisterRequestDto.getMenuPlusMinus().intValue() * menu.getPrice())
				.build();
			cartElement.put(menu.getMenuId(), cartMenu);
		}

		// cartElement 수정
		cartElements.put(reservationParticipant.getReservationParticipantId(), cartElement);

		// 총 가격 업데이트
		int totalPrice =
			cart.getCartTotalPrice() + (cartRegisterRequestDto.getMenuPlusMinus().intValue() * menu.getPrice());
		cart.setCartTotalPrice(totalPrice);

		// Redis에 장바구니 저장
		redisService.setValues(cartKey, cart,
			Duration.ofMillis(cartExpirationMillis)); // 추후에 주문하기 눌렀을 때 존재하는지 확인하고 삭제 필수

		// CartElementResponseDto 응답 구성 (각자닉네임(String), 뭐시켰는지(Map<Long, menuRegisterResponseDto>)
		List<CartElementResponseDto> cartElementResponseDtos = new ArrayList<>();

		for (Map.Entry<Long, Map<Long, CartMenu>> entry : cartElements.entrySet()) {
			Long orderParticipantId = entry.getKey();
			ReservationParticipant orderParticipant = reservationParticipantRepository.findByReservationParticipantId(
					orderParticipantId)
				.orElseThrow(() -> new ReservationParticipantNotFoundException(
					"장바구니의 reservationParticipantId: " + orderParticipantId + " 의 주문 인원이 존재하지 않습니다."));

			// Map<Long, CartMenu> -> Map<Long, CartMenuRegisterReponseDto>
			Map<Long, CartMenu> cartMenuMap = entry.getValue();
			Map<Long, CartMenuResponseDto> dtoMenuMap = new HashMap<>();
			int participantTotalPrice = 0;

			for (Map.Entry<Long, CartMenu> menuEntry : cartMenuMap.entrySet()) {
				CartMenu cartMenuItem = menuEntry.getValue();
				CartMenuResponseDto cartMenuResponseDto = CartMenuResponseDto.builder()
					.menuName(cartMenuItem.getMenuName())
					.menuImage(cartMenuItem.getMenuImage())
					.menuPrice(cartMenuItem.getMenuPrice())
					.menuCnt(cartMenuItem.getMenuCnt())
					.menuTotalPrice(cartMenuItem.getMenuTotalPrice())
					.build();

				participantTotalPrice += cartMenuItem.getMenuTotalPrice();

				dtoMenuMap.put(menuEntry.getKey(), cartMenuResponseDto);
			}

			// CartElementRegisterResponseDto 생성
			CartElementResponseDto cartElementResponseDto = CartElementResponseDto.builder()
				.reservationParticipantNickname(orderParticipant.getReservationParticipantNickName())
				.menuInfo(dtoMenuMap)
				.participantTotalPrice(participantTotalPrice)
				.build();

			// List<CartElementRegisterResponseDto>에 추가
			cartElementResponseDtos.add(cartElementResponseDto);
		}

		CartResponseDto cartResponseDto = CartResponseDto.builder()
			.socketType(SocketType.CART)
			.reservationId(cart.getReservationId())
			.cartElements(cartElementResponseDtos)
			.cartTotalPrice(cart.getCartTotalPrice())
			.build();

		// 현재 구독 중인 모든 유저에게 증감 정보 전송
		sendingOperations.convertAndSend("/topic/reservations/" + reservation.getReservationUrl(),
			cartResponseDto);
	}

	/**
	 * 장바구니 조회
	 *
	 * @param reservationUrl 예약 url
	 * @return CartResponseDto 장바구니
	 */
	@Override
	public CartDetailResponseDto getDetailCartByReservationUrl(String reservationUrl) {

		String cartKey = CART_KEY_PREFIX + reservationUrl;
		Object cachedObject = redisService.getValues(cartKey);
		ObjectMapper objectMapper = new ObjectMapper();
		Cart cart = objectMapper.convertValue(cachedObject, Cart.class);

		// Cart 존재 안함
		if (cart == null) {
			throw new CartNotFoundException("해당 예약 url의 장바구니가 존재하지 않습니다. 예약 url : " + reservationUrl);
		}

		List<CartElementResponseDto> cartElementResponseDtos = new ArrayList<>();

		for (Map.Entry<Long, Map<Long, CartMenu>> entry : cart.getCartElements().entrySet()) {
			// 참가자 정보 조회
			Long orderParticipantId = entry.getKey();

			ReservationParticipant orderParticipant = reservationParticipantRepository.findByReservationParticipantId(
					orderParticipantId)
				.orElseThrow(() -> new ReservationParticipantNotFoundException(
					"장바구니의 참가자 id의 참가자가 존재하지 않습니다. reservationParticipantId : " + orderParticipantId));

			// 각 참가자의 메뉴 목록을 Dto로 반환
			Map<Long, CartMenu> cartMenuMap = entry.getValue();
			Map<Long, CartMenuResponseDto> dtoMenuMap = new HashMap<>();
			int participantTotalPrice = 0;

			// CartMenu -> CartMenuResponseDto
			for (Map.Entry<Long, CartMenu> menuEntry : cartMenuMap.entrySet()) {
				CartMenu cartMenuItem = menuEntry.getValue();
				CartMenuResponseDto cartMenuResponseDto = CartMenuResponseDto.builder()
					.menuName(cartMenuItem.getMenuName())
					.menuImage(cartMenuItem.getMenuImage())
					.menuPrice(cartMenuItem.getMenuPrice())
					.menuCnt(cartMenuItem.getMenuCnt())
					.menuTotalPrice(cartMenuItem.getMenuTotalPrice())
					.build();

				participantTotalPrice += cartMenuItem.getMenuTotalPrice();

				dtoMenuMap.put(menuEntry.getKey(), cartMenuResponseDto);
			}

			// CartElementResponseDto 생성
			CartElementResponseDto cartElementResponseDto = CartElementResponseDto.builder()
				.reservationParticipantNickname(orderParticipant.getReservationParticipantNickName())
				.menuInfo(dtoMenuMap)
				.participantTotalPrice(participantTotalPrice)
				.build();

			cartElementResponseDtos.add(cartElementResponseDto);
		}

		// 최종 CartDetailResponseDto 반환
		return CartDetailResponseDto.builder()
			.reservationId(cart.getReservationId())
			.cartElements(cartElementResponseDtos)
			.cartTotalPrice(cart.getCartTotalPrice())
			.build();
	}

	private Reservation validateReservationUrl(CartRegisterRequestDto cartRegisterRequestDto) {
		return reservationRepository.findByReservationUrlWithRestaurant(
				cartRegisterRequestDto.getReservationUrl())
			.orElseThrow(() -> new ReservationNotFoundException(
				"해당 url의 예약이 존재하지 않습니다. reservationId : " + cartRegisterRequestDto.getReservationUrl()));
	}

	private ReservationParticipant validateReservationParticipantId(CartRegisterRequestDto cartRegisterRequestDto) {
		return reservationParticipantRepository.findByReservationParticipantId(
				cartRegisterRequestDto.getReservationParticipantId())
			.orElseThrow(() -> new ReservationParticipantNotFoundException(
				"해당 id의 예약 참가자가 존재하지 않습니다. : reservationParticipantId"
					+ cartRegisterRequestDto.getReservationParticipantId()));
	}

	private Menu validateMenuId(CartRegisterRequestDto cartRegisterRequestDto) {
		return menuRepository.findByMenuIdAndDeletedFalse(cartRegisterRequestDto.getMenuId())
			.orElseThrow(() -> new MenuNotFoundException(
				"해당 id의 메뉴가 존재하지 않습니다. menuId : " + cartRegisterRequestDto.getMenuId()));
	}

	private void validateRestaurantMenu(Reservation reservation, Menu menu) {
		Restaurant restaurant = reservation.getRestaurant();
		if (!menu.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId())) {
			throw new MenuNotBelongToRestaurantException(
				"해당 식당에 해당 메뉴가 존재하지 않습니다. restaurantName : " + restaurant.getName() + " menuName : " + menu.getName());
		}
	}
}
