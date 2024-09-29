import { authClientInstance } from 'utils/http-client';

export const getMyInfo = async () => {
  await authClientInstance
    .get('/api/users')
    .then((result) => result.data)
    .catch((error) => error);
};

export const logout = async () => {
  await authClientInstance
    .post('/api/users/signout')
    .then((result) => result)
    .catch((error) => error);
};

export const editMyInfo = async (nickname) => {
  await authClientInstance
    .patch('/api/users', { nickname: nickname })
    .then((result) => result.data)
    .catch((error) => error);
};
