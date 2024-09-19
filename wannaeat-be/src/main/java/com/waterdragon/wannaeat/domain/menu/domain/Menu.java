package com.waterdragon.wannaeat.domain.menu.domain;

import java.util.List;

import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;

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
@Table(name = "menus")
public class Menu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id")
	private Long menuId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "restaurant_id")
	private Restaurant restaurant;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "menu_cagtegory_id", nullable = false)
	private MenuCategory menuCategory;

	@Column(name = "menu_name", nullable = false)
	private String name;

	@Column(name = "menu_price", nullable = false)
	private int price;

	@Column(name = "menu_image")
	private String image;

	@Column(name = "menu_description")
	private String description;

	@Column(name = "deleted", nullable = false)
	private boolean deleted = false;

	@OneToMany(mappedBy = "menu", fetch = FetchType.LAZY)
	private List<Order> orders;

	public void update(MenuCategory menuCategory, String name, int price, String image, String description) {
		this.menuCategory = menuCategory;
		this.name = name;
		this.price = price;
		this.image = image;
		this.description = description;
	}
}
