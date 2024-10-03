import { clientInstance, authClientInstance } from '../../utils/http-client';

export const getReservationDetail = async (reservationId) => {
    return await authClientInstance
        .get(`/api/manager/reservation/${reservationId}`)
        .then((result) => result.data)  
        .catch((error) => {
            
        });
};

// 서빙 처리 API 호출 함수
export const serveOrder = async (reservationId, orderIdList) => {
    try {
        const response = await authClientInstance.post(`/api/reservation/${reservationId}/orders/serve`, {
            orderIdList: orderIdList  // 배열 형식으로 전달
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;  // 서빙 완료 후의 데이터 반환
    } catch (error) {
        console.error('Error occurred while serving order:', error);
        throw error;  // 에러를 던져 호출하는 곳에서 처리할 수 있게 함
    }
};
