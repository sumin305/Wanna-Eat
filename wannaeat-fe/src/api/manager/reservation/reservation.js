import { authClientInstance } from 'utils/http-client';

// 일자별 예약 현황 조회
export const getReservationInfoByDay = async (date, page, size) => {
  return await authClientInstance
    .get(`/api/restaurants/reservation?date=${date}&page=${page}&size=${size}`)
    .then((result) => result)
    .catch((error) => error);
};

// 월 별 예약 건수 조회
export const getReservationInfoByMonth = async (year, month) => {
  return await authClientInstance
    .get(
      '/api/restaurants/statistics' +
        '/reservation-count?' +
        `year=${year}&month=${month}`
    )
    .then((result) => result)
    .catch((error) => error);
};

// 예약 상세 조회
export const getReservationDetail = async (reservationId) => {
  return await authClientInstance
    .get(`/api/manager/reservation/${reservationId}`)
    .then((result) => result)
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
