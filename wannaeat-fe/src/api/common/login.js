import { authWithRefreshClientInstance } from '../../utils/http-client';

export const getToken = async () => {
  return await authWithRefreshClientInstance
    .get('/users/reissue')
    .then((result) => result)
    .catch((error) => error);
};
