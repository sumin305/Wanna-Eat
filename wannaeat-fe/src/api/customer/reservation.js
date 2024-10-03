import { authClientInstance } from '../../utils/http-client';

export const getMyReservation = async () => {
  return await authClientInstance
    .get('/api/users/reservations')
    .then((result) => result.data)
    .catch((error) => error);
};
