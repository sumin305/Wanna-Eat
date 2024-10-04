package com.waterdragon.wannaeat.domain.restaurant.domain;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Document(collection = "restaurants")
public class RestaurantStructure {

	@Id
	private ObjectId id;

	private Long restaurantId;

	private Size size; // 매장 크기
	private int floorCnt; // 매장 층수

	private List<Table> tables; // 테이블 정보
	private List<Toilet> toilets; // 화장실 정보
	private List<Counter> counters; // 계산대 정보
	private List<Kitchen> kitchens; // 주방 정보
}
