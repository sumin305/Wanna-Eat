package com.waterdragon.wannaeat.domain.reservation.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonSerialize
@JsonDeserialize
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRegisterRequestDto {

	@NotNull(message = "식당 아이디는 필수입니다.")
	Long restaurantId;

	@Positive(message = "아이디는 음수일 수 없습니다.")
	private Long userId;

	@NotNull(message = "예약 일자가 선택되지 않았습니다.")
	@FutureOrPresent(message = "지난 일자는 선택할 수 없습니다.")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	LocalDate reservationDate;

	@NotNull(message = "이용 시작시간이 선택되지 않았습니다.")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	LocalTime reservationStartTime;

	@NotNull(message = "이용 종료시간이 선택되지 않았습니다.")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	LocalTime reservationEndTime;

	@NotNull(message = "예약 인원은 필수 입력값입니다.") // null을 허용하지 않음
	@Min(value = 1, message = "예약 인원은 최소 1명입니다.") // 최소값 1명
	@Max(value = 50, message = "예약 인원은 최대 50명입니다.") // 최대값 50명
	private Integer memberCnt;

	@NotNull(message = "예약 테이블이 설정되지 않았습니다.")
	@NotEmpty(message = "예약 테이블 리스트가 비어있을 수 없습니다.")
	List<Integer> tableList;

}
