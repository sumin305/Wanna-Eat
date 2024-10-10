package com.waterdragon.wannaeat.domain.restaurant.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.waterdragon.wannaeat.domain.restaurant.domain.QRestaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantFilter;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RestaurantCustomRepositoryImpl implements RestaurantCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Restaurant> findRestaurantsByFilter(RestaurantFilter filter) {
		QRestaurant restaurant = QRestaurant.restaurant;

		BooleanBuilder builder = new BooleanBuilder();

		// 카테고리 ID 필터링
		if (filter.getCategoryId() != null) {
			builder.and(restaurant.category.categoryId.eq(filter.getCategoryId()));
		}

		// 검색어(식당 이름 또는 메뉴 이름) 필터링
		if (filter.getKeyword() != null && !filter.getKeyword().isEmpty()) {
			builder.and(restaurant.name.contains(filter.getKeyword())
				.or(restaurant.menus.any().name.contains(filter.getKeyword()))
				.or(restaurant.category.categoryName.contains(filter.getKeyword())));
		}

		// memberCount 필터링 추가 (restaurant.minMemberCount 이상, restaurant.maxMemberCount 이하
		if (filter.getMemberCount() != null) {
			// minMemberCount가 null이 아닌 경우에만 필터링
			builder.and(restaurant.minMemberCount.isNull()
				.or(restaurant.minMemberCount.loe(filter.getMemberCount())));

			// maxMemberCount가 null이 아닌 경우에만 필터링
			builder.and(restaurant.maxMemberCount.isNull()
				.or(restaurant.maxMemberCount.goe(filter.getMemberCount())));
		}

		return jpaQueryFactory
			.selectFrom(restaurant)
			.where(builder)
			.fetch();
	}
}
