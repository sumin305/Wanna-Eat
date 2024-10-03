package com.waterdragon.wannaeat.domain.order.domain;

import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.reservation.domain.ReservationParticipant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Long orderId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reservation_id", nullable = false)
	private Reservation reservation;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "menu_id", nullable = false)
	private Menu menu;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reservation_participant_id", nullable = false)
	private ReservationParticipant reservationParticipant;

	@Column(name = "prepare_request_cnt", nullable = false)
	private int prepareRequestCnt;

	@Column(name = "served_cnt", nullable = false)
	private int servedCnt;

	@Column(name = "total_cnt", nullable = false)
	private int totalCnt;

	@Column(name = "paid_cnt", nullable = false)
	private int paidCnt;

	public void updatePaidCnt(int paidMenuCnt) {
		this.paidCnt += paidMenuCnt;
	}

	public void updateTotalCnt(int orderedMenuCnt) {
		this.totalCnt += orderedMenuCnt;
	}

	public void plusServedCnt() {
		this.servedCnt += 1;
	}
}