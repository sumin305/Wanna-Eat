package com.waterdragon.wannaeat.domain.menu.domain;

import java.util.List;

import com.waterdragon.wannaeat.domain.restaurant.domain.RestaurantCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "menu_categories")
public class MenuCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_cagtegory_id")
	private Long categoryId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "restaurant_category_id", nullable = false)
	private RestaurantCategory restaurantCategory;

	@Column(name = "menu_category_name", nullable = false)
	private String categoryName;

	@OneToMany(mappedBy = "menuCategory", fetch = FetchType.LAZY)
	private List<Menu> menus;

	// Getters and setters
}
