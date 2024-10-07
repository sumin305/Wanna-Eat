import { authClientInstance } from '../../utils/http-client';

// 나의 예약 목록 조회
export const getMyReservation = async () => {
  return await authClientInstance
    .get('/api/users/reservations')
    .then((result) => result.data)
    .catch((error) => error);
};

// 예약 상세 조회
export const getReservationDetail = async (reservationId) => {
  return await authClientInstance
    .get(`/api/users/reservations/${reservationId}`)
    .then((result) => result)
    .catch((error) => error);
};

// 예약 취소
export const cancelReservation = async (reservationId) => {
  return await authClientInstance
    .delete('/api/reservations/' + reservationId)
    .then((result) => result)
    .catch((error) => error);
};

// 최우선 방문 예정 식당 조회
export const getPriorityVisitingRestaurant = async () => {
  return await authClientInstance
    .get('/api/users/reservations/recent')
    .then((result) => result)
    .catch((error) => error);
};

// 날짜별 예약 가능 테이블 목록 조회
export const getReservationTableByDate = async (
  restaurantId,
  date,
  startTime,
  endTime
) => {
  return await authClientInstance
    .get(
      `/api/restaurants/${restaurantId}/reservations/available-tables?date=${date}&startTime=${startTime}&endTime=${endTime}`
    )
    .then((result) => result)
    .catch((error) => error);
};

// 상위 5개 예약
export const getTop5Reservations = async () => {
  return await authClientInstance
    .get('/api/users/reservations/statistics')
    .then((result) => result)
    .catch((error) => error);
};
