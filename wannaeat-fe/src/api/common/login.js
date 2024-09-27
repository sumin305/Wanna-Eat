import { authWithRefreshClientInstance } from '../../utils/http-client';

export const getToken = async () => {
  return await authWithRefreshClientInstance
    .get('/api/users/reissue')
    .then((result) => result)
    .catch((error) => error);
};
