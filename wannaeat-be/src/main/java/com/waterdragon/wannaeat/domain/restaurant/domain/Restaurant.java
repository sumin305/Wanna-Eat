package com.waterdragon.wannaeat.domain.restaurant.domain;

import java.time.LocalTime;
import java.util.List;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.menu.domain.MenuCategory;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.restaurantlike.domain.RestaurantLike;
import com.waterdragon.wannaeat.domain.user.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "restaurants")
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "restaurant_id")
	private Long restaurantId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "restaurant_category_id", nullable = false)
	private RestaurantCategory category;

	@Column(name = "restaurant_business_number", nullable = false, unique = true)
	private String businessNumber;

	@Column(name = "restaurant_owner_name", nullable = false)
	private String ownerName;

	@Column(name = "restaurant_name", nullable = false)
	private String name;

	@Column(name = "restaurant_address", nullable = false)
	private String address;

	@Column(name = "restaurant_phone", nullable = false)
	private String phone;

	@Column(name = "restaurant_open_time")
	private LocalTime openTime;

	@Column(name = "restaurant_close_time")
	private LocalTime closeTime;

	@Column(name = "break_start_time")
	private LocalTime breakStartTime;

	@Column(name = "break_end_time")
	private LocalTime breakEndTime;

	@Column(name = "max_reservation_time")
	private Integer maxReservationTime;

	@Column(name = "min_member_cnt")
	private Integer minMemberCount;

	@Column(name = "max_member_cnt")
	private Integer maxMemberCount;

	@Column(name = "deposit_per_member")
	private Integer depositPerMember;

	@Column(name = "restaurant_description")
	private String description;

	@Column(name = "latitude")
	private Double latitude;

	@Column(name = "longitude")
	private Double longitude;

	@Column(name = "merchant_id")
	private Long merchantId;

	@OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
	private List<Menu> menus;

	@OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
	private List<RestaurantImage> images;

	@OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
	private List<RestaurantLike> restaurantLikes;

	@OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
	private List<Reservation> reservations;

	@OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
	private List<MenuCategory> menuCategories;

	public void update(RestaurantCategory category, String businessNumber, String ownerName,
		String name, String address, String phone, LocalTime openTime, LocalTime closeTime,
		LocalTime breakStartTime, LocalTime breakEndTime, Integer maxReservationTime, Integer minMemberCount,
		Integer maxMemberCount, Integer depositPerMember, String description, Double latitude, Double longitude) {

		this.category = category;
		this.businessNumber = businessNumber;
		this.ownerName = ownerName;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.openTime = openTime;
		this.closeTime = closeTime;
		this.breakStartTime = breakStartTime;
		this.breakEndTime = breakEndTime;
		this.maxReservationTime = maxReservationTime;
		this.minMemberCount = minMemberCount;
		this.maxMemberCount = maxMemberCount;
		this.depositPerMember = depositPerMember;
		this.description = description;
		this.latitude = latitude;
		this.longitude = longitude;
	}

}