package com.waterdragon.wannaeat.domain.alarm.domain;

import com.waterdragon.wannaeat.domain.alarm.domain.enums.AlarmType;
import com.waterdragon.wannaeat.domain.alarm.domain.enums.MoveCategory;
import com.waterdragon.wannaeat.domain.menu.domain.Menu;
import com.waterdragon.wannaeat.domain.reservation.domain.Reservation;
import com.waterdragon.wannaeat.domain.user.domain.User;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", nullable = true)
    private Menu menu;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @Enumerated(EnumType.STRING)
    @Column(name = "alarm_type", nullable = false)
    private AlarmType type;

    @Builder.Default
    @Column(name = "regist_time", nullable = false)
    private LocalDateTime registTime = LocalDateTime.now();

}
