import {
  authClientInstance,
  authWithRefreshClientInstance,
} from '../../utils/http-client';

export const getToken = async () => {
  return await authWithRefreshClientInstance
    .get('/users/reissue')
    .then((result) => result)
    .catch((error) => error);
};

export const giveFcmToken = async (token) => {
  return await authClientInstance
    .post('api/users/alarms', { fcmToken: token })
    .then((result) => result)
    .catch((error) => error);
};
