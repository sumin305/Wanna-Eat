package com.waterdragon.wannaeat.domain.alarm.domain;

import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.MoveCategory;
import com.waterdragon.wannaeat.domain.user.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "alarms")
public class Alarm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "alarm_id")
	private Long alarmId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Enumerated(EnumType.STRING)
	@Column(name = "alarm_type", nullable = false)
	private AlarmType type;

	@Column(name = "alarm_message", nullable = false)
	private String message;

	@Enumerated(EnumType.STRING)
	@Column(name = "move_category", nullable = false)
	private MoveCategory moveCategory;

	@Column(name = "move_category_id", nullable = false)
	private Long moveCategoryId;

	// 생성자, getter, setter

}
