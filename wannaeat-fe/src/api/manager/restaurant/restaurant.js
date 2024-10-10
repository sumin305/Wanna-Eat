import { authClientInstance } from 'utils/http-client';

// 가게 등록
export const registRestaurant = async (restaurantData) => {
  return await authClientInstance
    .post('/api/restaurants', restaurantData)
    .then((result) => result)
    .catch((error) => error);
};

// 가게 정보 불러오기
export const getRestaurantData = async (restaurantId) => {
  return await authClientInstance
    .get(`/api/restaurants/${restaurantId}`)
    .then((result) => result)
    .catch((error) => error);
};

// 가게 정보 수정
export const updateRestaurant = async (restaurantId, restaurantData) => {
  return await authClientInstance
    .patch(`/api/restaurants/${restaurantId}`, restaurantData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((result) => result)
    .catch((error) => error);
};
