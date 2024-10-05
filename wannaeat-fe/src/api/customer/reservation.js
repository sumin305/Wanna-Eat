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
