import { clientInstance } from '../../utils/http-client';

export const checkNickname = async (nickname) => {
  return await clientInstance
    .post('/api/public/users/check-nickname', nickname)
    .then((result) => result)
    .catch((error) => error);
};

export const sendCode = async (phoneNumber) => {
  return await clientInstance
    .post('/api/public/users/send-code', {
      socialType: 'KAKAO',
      phone: phoneNumber,
    })
    .then((result) => result)
    .catch((error) => error);
};

export const signUp = async (request) => {
  return await clientInstance
    .post('/api/public/users/signup', request)
    .then((result) => result)
    .catch((error) => error);
};
