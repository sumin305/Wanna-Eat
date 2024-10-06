import { clientInstance, authClientInstance } from 'utils/http-client';

// reservationUrl 유효성 검사
export const validateReservationUrl = async (reservationUrl) => {
  try {
    const result = await clientInstance.post(
      'api/public/reservations/validation',
      {
        reservationUrl: reservationUrl,
      }
    );
    return result;
  } catch (error) {
    console.error('유효성 검사 실패:', error);
    return error;
  }
};

// 모든 주문 정보 불러오는 함수
export const getOrderData = async (reservationUrl, chatPage, chatSize) => {
  try {
    const result = await clientInstance.get(
      `api/public/share-data/${reservationUrl}?chatPage=${chatPage}&chatSize=${chatSize}`
    );
    console.log('모든 데이터:', result.data);
    return result.data;
  } catch (error) {
    console.log('데이터 불러오기 실패', error);
  }
};

// 모든 메뉴 정보 불러오는 함수
export const getMenuData = async (restaurantId) => {
  try {
    const result = await clientInstance.get(
      `/api/public/restaurants/${restaurantId}/menus`
    );
    console.log('모든 메뉴 데이터:', result.data);
    return result.data;
  } catch (error) {
    console.log('데이터 불러오기 실패', error);
  }
};
