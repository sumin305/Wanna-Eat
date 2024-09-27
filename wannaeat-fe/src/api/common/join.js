import { clientInstance, authClientInstance } from '../../utils/http-client';
export const checkNickname = async (nickname) => {
  return await authClientInstance
    .post('/public/users/check-nickname', { nickname: nickname })
    .then((result) => result)
    .catch((error) => error);
};

export const sendCode = async (phoneNumber, socialType) => {
  return await authClientInstance
    .post('/public/users/send-code', {
      socialType: socialType,
      phone: phoneNumber,
    })
    .then((result) => result)
    .catch((error) => error);
};

export const verifyCode = async (code, phone, socialType) => {
  return await authClientInstance
    .post('/public/users/verify-code', {
      socialType: socialType,
      phone: phone,
      code: code,
    })
    .then((result) => result)
    .catch((error) => error);
};

export const signUp = async (request) => {
  return await authClientInstance
    .post('/users/signup', request)
    .then((result) => result)
    .catch((error) => error);
};
