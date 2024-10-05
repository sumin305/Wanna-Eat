package com.waterdragon.wannaeat.domain.reservation.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.waterdragon.wannaeat.domain.order.domain.Order;
import com.waterdragon.wannaeat.domain.restaurant.domain.Restaurant;
import com.waterdragon.wannaeat.domain.user.domain.User;

import jakarta.persistence.CascadeType;
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
@Table(name = "reservations")
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_id")
	private Long reservationId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "restaurant_id", nullable = false)
	private Restaurant restaurant;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "reservation_date", nullable = false)
	private LocalDate reservationDate;

	@Column(name = "reservation_start_time", nullable = false)
	private LocalTime startTime;

	@Column(name = "reservation_end_time", nullable = false)
	private LocalTime endTime;

	@Column(name = "member_cnt", nullable = false)
	private int memberCnt;

	@Column(name = "reservation_url")
	private String reservationUrl;

	@Builder.Default
	@Column(name = "regist_time", nullable = false)
	private LocalDateTime registTime = LocalDateTime.now();

	@Column(name = "cancelled", nullable = false)
	private boolean cancelled = false;

	@OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<ReservationTable> reservationTables;

	@OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY)
	private List<ReservationParticipant> participants;

	@OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY)
	private List<Order> orders;

	public void remove() {
		this.reservationUrl = null;
		this.cancelled = true;
	}

	public void edit() {
		this.reservationUrl = null;
		this.endTime = LocalTime.now();
	}

}
