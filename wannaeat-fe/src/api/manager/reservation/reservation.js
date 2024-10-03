import { authClientInstance } from 'utils/http-client';

export const getReservationInfoByMonth = async () => {
  const restaurantId = localStorage.getItem('restaurantId');
  return await authClientInstance
    .get('/api/restaurants/' + restaurantId + '/reservation-counts')
    .then((result) => result.data)
    .catch((error) => error); // 데이터를 반환
};
