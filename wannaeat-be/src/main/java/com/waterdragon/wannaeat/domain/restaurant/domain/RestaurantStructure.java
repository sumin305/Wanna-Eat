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

	private Size size;
	private int floorCnt;

	private List<Table> tables;
	private List<Element> elements;
}
