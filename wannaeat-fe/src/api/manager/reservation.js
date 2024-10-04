import { clientInstance, authClientInstance } from '../../utils/http-client';

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
