import { authClientInstance, clientInstance } from '../../utils/http-client';

// 검색 조건별 매장 목록 조회 api
export const getRestaurants = async (searchCondition) => {
  // 객체 형식의 searchCondition을 queryString으로 변환
  const queryString = new URLSearchParams(searchCondition);
  return await authClientInstance
    .get('/api/public/restaurants/' + queryString)
    .then((result) => result.data)
    .catch((error) => error);
};

// 매장 정보 상세 조회 api
export const getRestaurantInfo = async (restaurantId) => {
  return await clientInstance
    .get('/api/public/restaurants/' + restaurantId)
    .then((result) => result)
    .catch((error) => error);
};

// 매장 메뉴 목록 조회 api
export const getRestaurantMenus = async (restaurantId) => {
  return await authClientInstance
    .get('/api/public/restaurants/' + restaurantId + '/menus')
    .then((result) => result.data)
    .catch((error) => error);
};

// 매장 카테고리 목록 조회 api
export const getRestaurantCategories = async () => {
  return await authClientInstance
    .get('/api/public/restaurants/categories')
    .then((result) => result)
    .catch((error) => error);
};
