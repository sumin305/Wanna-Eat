import { clientInstance } from '../../utils/http-client';

export const getRestaurants = async (restaurantId) => {
  return await clientInstance
    .get('/api/public/restaurants/' + restaurantId + '/menus')
    .then((result) => result)
    .catch((error) => error);
};
