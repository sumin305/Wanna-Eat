package com.waterdragon.wannaeat.domain.order.service;

import org.springframework.stereotype.Service;

import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;
import com.waterdragon.wannaeat.domain.order.exception.error.OrderNotFoundException;
import com.waterdragon.wannaeat.domain.order.exception.error.TotalCntLowerThanPaidCntException;
import com.waterdragon.wannaeat.domain.order.repository.OrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;

	/**
	 * 결제된 수량만큼 paid_cnt 수정 메소드
	 * 
	 * @param orderPaidCntEditRequestDto orderId, paidMenuCnt
	 */
	@Override
	@Transactional
	public void editOrderPaidCnt(OrderPaidCntEditRequestDto orderPaidCntEditRequestDto) {

		// 주문 존재여부 확인
		Order order = orderRepository.findByOrderId(orderPaidCntEditRequestDto.getOrderId())
			.orElseThrow(() -> new OrderNotFoundException("해당 id의 주문이 존재하지 않습니다. orderId : " + orderPaidCntEditRequestDto.getOrderId()));
		
		// 결제된 수량이 남은 미결제 수량보다 적거나 같은지 확인
		if (orderPaidCntEditRequestDto.getPaidMenuCnt() > order.getTotalCnt() - order.getPaidCnt()) {
			throw new TotalCntLowerThanPaidCntException("결제된 수량" + orderPaidCntEditRequestDto.getPaidMenuCnt() + "이"
				+ "남은 미결제 수량" + (order.getTotalCnt() - order.getPaidCnt()) + "보다 많습니다.");
		}
		
		// 결제 수량 paid_cnt 업데이트
		order.update(orderPaidCntEditRequestDto.getPaidMenuCnt());
		orderRepository.save(order);
	}
}
