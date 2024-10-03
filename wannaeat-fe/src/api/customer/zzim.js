import { authClientInstance } from '../../utils/http-client';

// 내가 찜한 매장 조회 api
export const getMyZzimRestaurants = async () => {
  return await authClientInstance
    .get('/api/users/like')
    .then((result) => result)
    .catch((error) => error);
};

// 매장 찜 등록
export const addZzimRestaurant = async (restaurantId) => {
  return await authClientInstance
    .post(`/api/restaurants/${restaurantId}/like`)
    .then((result) => result)
    .catch((error) => error);
};

// 매장 찜 삭제
export const removeZzimRestaurant = async (restaurantId) => {
  return await authClientInstance
    .delete(`/api/restaurants/${restaurantId}/like`)
    .then((result) => result)
    .catch((error) => error);
};
