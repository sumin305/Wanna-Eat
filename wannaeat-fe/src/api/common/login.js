import { createAuthWithRefreshClientInstance } from '../../utils/http-client';

export const getToken = async (accessToken, refreshToken) => {
  const instance = createAuthWithRefreshClientInstance(accessToken);
  return await instance
    .get('/api/users/reissue')
    .then((result) => result)
    .catch((error) => error);
};
