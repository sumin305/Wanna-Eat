package com.waterdragon.wannaeat.domain.order.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.waterdragon.wannaeat.domain.order.dto.request.OrderPaidCntEditRequestDto;

public interface OrderService {

	void editOrderPaidCnt(OrderPaidCntEditRequestDto orderPaidCntEditRequestDto);
}
