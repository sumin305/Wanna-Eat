import { ssafyClient } from '../../../utils/http-client';

// 사용자 계정 생성 (API Key 발급)
export const createSsafyPayAccount = async (userId) => {
  return await ssafyClient
    .post('/api/v1/member', {
      apiKey: process.env.REACT_APP_SSAFY_PAY_API_KEY,
      userId: userId,
    })
    .then((result) => {
      const userKey = result.data.userKey;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userKey', userKey);
      console.log('userKey: ', userKey);
      return result;
    })
    .catch((error) => error);
};

// 사용자 계정 조회
export const getSsafyPayAccount = async (userId) => {
  return await ssafyClient
    .post('/api/v1/member/search', {
      apiKey: process.env.REACT_APP_SSAFY_PAY_API_KEY,
      userId: userId,
    })
    .then((result) => {
      const userKey = result.data.userKey;
      localStorage.setItem('userKey', userKey);
      console.log('userKey: ', userKey);
      return result;
    })
    .catch((error) => error);
};
