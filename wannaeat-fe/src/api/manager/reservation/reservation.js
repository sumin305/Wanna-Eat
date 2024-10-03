import { authClientInstance } from 'utils/http-client';

// 일자별 예약 현황 조회
export const getReservationInfoByDay = async (date) => {
  const restaurantId = localStorage.getItem('restaurantId');

  return await authClientInstance
    .get(`/api/restaurants/6/reservation?date=${date}`)
    .then((result) => result)
    .catch((error) => error);
};

// 월 별 예약 건수 조회
export const getReservationInfoByMonth = async () => {
  const restaurantId = localStorage.getItem('restaurantId');

  return await authClientInstance
    .get('/api/restaurants/' + restaurantId + '/reservation-counts')
    .then((result) => result.data)
    .catch((error) => error);
};
