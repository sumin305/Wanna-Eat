package com.waterdragon.wannaeat.domain.restaurant.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "restaurant_categories")
public class RestaurantCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "restaurant_category_id")
	private Long categoryId;

	@Column(name = "restaurant_category_name", nullable = false)
	private String categoryName;

	@Column(name = "restaurant_category_image", nullable = false)
	private String categoryImage;

	@OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
	private List<Restaurant> restaurants;

}
