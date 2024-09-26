import { authClientInstance } from '../../utils/http-client';

export const getToken = async () => {
  return await authClientInstance
    .get('/api/users/reissue')
    .then((result) => result)
    .catch((error) => error);
};
