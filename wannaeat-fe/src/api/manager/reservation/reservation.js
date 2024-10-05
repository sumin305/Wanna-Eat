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

// 예약 상세 조회
export const getReservationDetail = async (reservationId) => {
  return await authClientInstance
    .get(`/api/manager/reservation/${reservationId}`)
    .then((result) => result.data)
    .catch((error) => {});
};

// 서빙 처리 API 호출 함수
export const serveOrder = async (reservationId, orderIdList) => {
  return await authClientInstance
    .post(`/api/reservation/${reservationId}/orders/serve`, {
      orderIdList: orderIdList, // 배열 형식으로 전달
    })
    .then((result) => result)
    .catch((error) => error);
};