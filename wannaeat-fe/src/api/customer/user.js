import { authClientInstance } from 'utils/http-client';

export const getMyInfo = async () => {
  return await authClientInstance
    .get('/api/users')
    .then((result) => result.data)
    .catch((error) => error); // 데이터를 반환
};
export const logout = async () => {
  return await authClientInstance
    .post('/api/users/signout')
    .then((result) => result)
    .catch((error) => error);
};

export const editMyInfo = async (nickname) => {
  return await authClientInstance
    .patch('/api/users', { nickname: nickname })
    .then((result) => result)
    .catch((error) => error);
};

// 결제 비밀번호 등록
export const registPassword = async (password) => {
  return await authClientInstance
    .patch('/api/users/password', { paymentPassword: password })
    .then((result) => result)
    .catch((error) => error);
};
