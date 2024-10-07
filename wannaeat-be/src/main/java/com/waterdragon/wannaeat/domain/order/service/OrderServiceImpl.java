package com.waterdragon.wannaeat.domain.order.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.service.AlarmService;
import com.waterdragon.wannaeat.domain.cart.domain.Cart;
import com.waterdragon.wannaeat.domain.cart.domain.CartMenu;
import com.waterdragon.wannaeat.domain.cart.exception.error.CartNotFoundException;
import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.exception.error.MenuNotFoundException;
import com.waterdragon.wannaeat.domain.menu.repository.MenuRepository;
import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderRegisterRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderServeRequestDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderDetailResponseDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderListResponseDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderRegisterResponseDto;
import com.waterdragon.wannaeat.domain.order.dto.response.OrderServeResponseDto;
import com.waterdragon.wannaeat.domain.order.exception.error.OrderAlreadyServedException;
import com.waterdragon.wannaeat.domain.order.exception.error.OrderNotFoundException;
import com.waterdragon.wannaeat.domain.order.exception.error.TotalCntLowerThanPaidCntException;
import com.waterdragon.wannaeat.domain.order.repository.OrderRepository;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;
import com.waterdragon.wannaeat.domain.reservation.dto.response.ReservationMenuResponseDto;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.exception.error.ReservationParticipantNotFoundException;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationParticipantRepository;
import com.waterdragon.wannaeat.domain.reservation.repository.ReservationRepository;
import com.waterdragon.wannaeat.domain.socket.domain.enums.SocketType;
import com.waterdragon.wannaeat.global.redis.service.RedisService;
import com.waterdragon.wannaeat.global.util.FcmUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private static final String CART_KEY_PREFIX = "cart_";
	private final RedisService redisService;
	private final AlarmService alarmService;
	private final ReservationParticipantRepository reservationParticipantRepository;
	private final ReservationRepository reservationRepository;
	private final MenuRepository menuRepository;
	private final SimpMessageSendingOperations sendingOperations;
	private final FcmUtil fcmUtil;

	/**
	 * 결제된 수량만큼 paid_cnt 수정 메소드
	 *
	 * @param orderPaidCntEditRequestDto orderId, paidMenuCnt
	 */
	@Override
	@Transactional
	public void editOrderPaidCnt(OrderPaidCntEditRequestDto orderPaidCntEditRequestDto) {

		// Order 불러오기
		Order order = orderRepository.findByOrderIdWithLock(orderPaidCntEditRequestDto.getOrderId())
			.orElseThrow(() -> new OrderNotFoundException(
				"해당 id의 주문이 존재하지 않습니다. orderId : " + orderPaidCntEditRequestDto.getOrderId()));

		// 혹시나 결제된 수량이 남은 미결제 수량보다 적거나 같은지 확인 (Controller에서 1차적으로 결제 전에 막긴 하지만)
		if (orderPaidCntEditRequestDto.getPaidMenuCnt() > order.getTotalCnt() - order.getPaidCnt()) {
			throw new TotalCntLowerThanPaidCntException("결제된 수량" + orderPaidCntEditRequestDto.getPaidMenuCnt() + "이"
				+ "남은 미결제 수량" + (order.getTotalCnt() - order.getPaidCnt()) + "보다 많습니다.");
		}

		// 결제 수량 paid_cnt 업데이트
		order.updatePaidCnt(orderPaidCntEditRequestDto.getPaidMenuCnt());
		orderRepository.save(order);
	}

	/**
	 * 주문 넣기
	 *
	 * @param orderRegisterRequestDto 예약 url 정보
	 */
	@Override
	@Transactional
	public void registerOrder(OrderRegisterRequestDto orderRegisterRequestDto) {

		boolean prepareRequest = orderRegisterRequestDto.getPrepareRequest().equals(Boolean.TRUE);
		String reservationUrl = orderRegisterRequestDto.getReservationUrl();

		// url로 Reservation 조회하는 시점에 비관적 락 사용 (같은 url이라면 다음 트랜잭션은 여기서 대기)
		Reservation reservation = reservationRepository.findByReservationUrlWithLock(reservationUrl)
			.orElseThrow(() -> new ReservationNotFoundException("해당 예약은 존재하지 않거나 퇴실처리 되었습니다. 예약 url : " + reservationUrl));

		String cartKey = CART_KEY_PREFIX + reservationUrl;
		Object cachedObject = redisService.getValues(cartKey);

		ObjectMapper objectMapper = new ObjectMapper();
		Cart cart = objectMapper.convertValue(cachedObject, Cart.class);

		// Cart 존재 안함 (동시에 들어온 2번째 트랜잭션이라면 Cart가 삭제되고 존재하지 않아서 예외 던지면서 종료)
		if (cart == null) {
			throw new CartNotFoundException("장바구니가 현재 존재하지 않습니다. 예약 url : " + reservationUrl);
		}

		// 각 Cart 데이터를 orders 테이블에 저장
		for (Map.Entry<Long, Map<Long, CartMenu>> entry : cart.getCartElements().entrySet()) {
			Long orderParticipantId = entry.getKey();
			Map<Long, CartMenu> menuMap = entry.getValue();

			ReservationParticipant reservationParticipant = reservationParticipantRepository.findByReservationParticipantId(
					orderParticipantId)
				.orElseThrow(() -> new ReservationParticipantNotFoundException(
					"해당 예약 참가자 id의 참가자가 존재하지 않습니다. orderParticipantId : " + orderParticipantId));

			// 각 메뉴에 대해서 처리
			for (Map.Entry<Long, CartMenu> menuEntry : menuMap.entrySet()) {
				Long menuId = menuEntry.getKey();
				CartMenu cartMenu = menuEntry.getValue();

				Menu menu = menuRepository.findByMenuIdAndDeletedFalse(menuId)
					.orElseThrow(() -> new MenuNotFoundException("해당 메뉴가 존재하지 않습니다. 메뉴 id : " + menuId));

				// 기존에 해당 예약의 해당 예약 참가자의 해당 메뉴 주문 내역이 있는지 확인
				Optional<Order> existingOrderOpt = orderRepository.findByReservationAndMenuAndReservationParticipant(
					reservation, menu, reservationParticipant);

				Order order;
				if (existingOrderOpt.isPresent()) {
					order = existingOrderOpt.get();
					order.updateTotalCnt(cartMenu.getMenuCnt());
				} else {
					// 주문이 없다면 새로 생성
					order = Order.builder()
						.reservation(reservation)
						.menu(menu)
						.reservationParticipant(reservationParticipant)
						.totalCnt(cartMenu.getMenuCnt())
						.prepareRequestCnt(prepareRequest ? cartMenu.getMenuCnt() : 0)
						.servedCnt(0)
						.paidCnt(0)
						.build();
				}

				// 주문 저장
				orderRepository.save(order);

				alarmService.registerAlarm(reservation, menu, AlarmType.ORDER_ADDED);
			}
		}

		fcmUtil.sendFcm(reservation.getRestaurant().getUser(), AlarmType.ORDER_ADDED);

		// Redis에서 장바구니 제거
		redisService.deleteValues(cartKey);

		// 주문되었음 알림 보내기
		OrderRegisterResponseDto orderRegisterResponseDto = OrderRegisterResponseDto.builder()
			.socketType(SocketType.ORDER)
			.message("장바구니 모든 내역이 주문 처리되었습니다. 주문서를 갱신하시겠습니까?")
			.build();

		sendingOperations.convertAndSend("/topic/reservations/" + reservation.getReservationUrl(),
			orderRegisterResponseDto);
	}

	/**
	 * 예약 Url로 주문 목록 가져오기
	 *
	 * @param reservationUrl
	 * @return
	 */
	@Override
	public OrderListResponseDto getListOrderByReservationUrl(String reservationUrl) {

		Reservation reservation = reservationRepository.findByReservationUrl(reservationUrl)
			.orElseThrow(() -> new ReservationNotFoundException("예약 url의 예약이 존재하지 않습니다. 예약 url : " + reservationUrl));

		List<Order> orders = orderRepository.findAllByReservation(reservation);

		List<OrderDetailResponseDto> orderDetailResponseDtos = orders.stream()
			.map(order -> OrderDetailResponseDto.builder()
				.orderId(order.getOrderId())
				.reservationId(order.getReservation().getReservationId())
				.menuId(order.getMenu().getMenuId())
				.menuName(order.getMenu().getName())
				.menuPrice(order.getMenu().getPrice())
				.menuImage(order.getMenu().getImage())
				.reservationParticipantId(order.getReservationParticipant().getReservationParticipantId())
				.reservationParticipantNickname(order.getReservationParticipant().getReservationParticipantNickName())
				.totalCnt(order.getTotalCnt())
				.paidCnt(order.getPaidCnt())
				.build())
			.collect(Collectors.toList());

		// OrderListResponseDto로 반환
		return OrderListResponseDto.builder()
			.orderDetailResponseDtos(orderDetailResponseDtos)
			.build();
	}

	/**
	 * 사업자용 서빙 메서드
	 *
	 * @param orderServeRequestDto 주문 ID 리스트가 담긴 요청 DTO
	 * @return OrderServeResponseDto 서빙 처리 결과
	 */
	@Override
	public OrderServeResponseDto serveOrder(Long reservationId, OrderServeRequestDto orderServeRequestDto) {

		// AtomicBoolean을 사용하여 결제 상태를 트래킹
		AtomicBoolean allPaymentsCompleted = new AtomicBoolean(true);

		// 주문 ID 리스트를 Long 타입으로 변환
		List<Long> orderIdList = orderServeRequestDto.getOrderIdList().stream()
			.map(Long::valueOf)
			.collect(Collectors.toList());

		// 각 주문에 대해 서빙 처리
		orderIdList.forEach(orderId -> {
			Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new OrderNotFoundException("주문이 존재하지 않습니다. 주문 Id : " + orderId));
			int servedCnt = order.getServedCnt();
			int totalCnt = order.getTotalCnt();

			// 서빙할 수 있는 주문인지 확인
			if (servedCnt < totalCnt) {
				// plusServedCnt 메서드 호출하여 서빙 처리
				order.plusServedCnt();

				// 주문 업데이트
				orderRepository.save(order);
			} else {
				throw new OrderAlreadyServedException("서빙이 완료 된 주문입니다. 주문 Id : " + orderId);
			}
		});

		// 예약 정보 조회
		Reservation reservation = reservationRepository.findById(reservationId)
			.orElseThrow(() -> new ReservationNotFoundException("존재하지 않는 예약입니다."));

		// 주문 리스트 조회
		List<Order> orderList = reservation.getOrders();

		// 주문 리스트를 메뉴 이름으로 그룹화하여 합침
		Map<String, ReservationMenuResponseDto> menuMap = new HashMap<>();

		orderList.forEach(order -> {
			String menuName = order.getMenu().getName();
			List<Integer> orderIdListAll = IntStream.range(0, order.getTotalCnt() - order.getServedCnt())
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
				existingDto.getOrderIdList().addAll(orderIdListAll);
			} else {
				// 새로운 메뉴 추가
				ReservationMenuResponseDto newDto = ReservationMenuResponseDto.builder()
					.menuName(menuName)
					.notServedCnt(notServedCnt) // 서빙되지 않은 수량
					.servedCnt(order.getServedCnt()) // 서빙된 수량
					.orderIdList(orderIdListAll)
					.build();
				menuMap.put(menuName, newDto);
			}
		});

		return OrderServeResponseDto.builder()
			.allPaymentsCompleted(allPaymentsCompleted.get()) // AtomicBoolean의 값을 boolean으로 전달
			.reservationMenuList(new ArrayList<>(menuMap.values())) // 메뉴 리스트
			.build();

	}
}
