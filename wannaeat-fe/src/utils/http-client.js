import axios from 'axios';
import useAlert from './alert';
import { useNavigate } from 'react-router-dom';

// 로컬 변수로 accessToken 설정
let accessToken = '';
// accessToken 설정
const setAccessToken = (newAccessToken) => {
  accessToken = newAccessToken;
};

// ssafy 금융 API 요청
const createSsafyClientInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SSAFY_PAY_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: false,
  });
  return instance;
};

// 일반 요청
const createClientInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: false,
  });
  return instance;
};

// 소켓 연결 시 요청
const createSocketClientInstance = () => {
  const url = window.location.pathname.split('/');
  const cookieStr =
    url[url.length - 1] +
    '=' +
    localStorage.getItem('reservationParticipantId');
  console.log('cookieStr', cookieStr);

  const instance = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });

  return instance;
};

// access만 보낼때
const createAuthClientInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization-wannaeat': accessToken,
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: false,
  });
  return instance;
};

// refresh도 보낼때
const createAuthWithRefreshClientInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization-wannaeat': accessToken,
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });
  return instance;
};

export const ssafyClient = createSsafyClientInstance();
export const socketClient = createSocketClientInstance();
export const clientInstance = createClientInstance();
export const authClientInstance = createAuthClientInstance();
export const authWithRefreshClientInstance =
  createAuthWithRefreshClientInstance();

// authClientInstance - 요청 (request) interceptor
authClientInstance.interceptors.request.use(
  (request) => {
    // access token 헤더에 저장
    request.headers['Authorization-wannaeat'] = accessToken;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// authClientInstance - 응답 (response) interceptor
authClientInstance.interceptors.response.use(
  // 성공 시, 정상적으로 결과 반환
  (response) => {
    return response;
  },

  // 실패  (401 에러)
  async (error) => {
    console.log(error);
    const { response, config } = error;
    console.log('authClientInstance 응답 실패');

    // 인증 실패 시
    console.log(response);
    if (error.status === 401) {
      console.log('interceptor에서 reissue 재요청');
      console.log(config);
      localStorage.setItem('isReissueRequested', false);

      // RefreshToken으로 AccessToken Reissue 요청
      if (!localStorage.getItem('isReissueRequested')) {
        const reissueResponse =
          await authWithRefreshClientInstance.get('/api/users/reissue');
        //  AccessToken Reissue 성공
        if (reissueResponse.status === 200) {
          localStorage.setItem('isReissueRequested', true);
          setAccessToken(reissueResponse.headers['authorization-wannaeat']);
          config.headers['authorization-wannaeat'] = accessToken;
          return await authClientInstance(config);
        } else {
          console.log('AccessToken Reissue 실패');
          return;
        }
      } else {
        console.log('AccessToken Reissue 실패');
        alert('로그인 해주세요');
        window.location.href = '/';
        return;
      }
    } else {
      console.log('인증 성공');
    }
    return Promise.reject(error);
  }
);

// authWithRefreshClientInstance - 응답 (response) interceptor
authWithRefreshClientInstance.interceptors.response.use(
  // 성공 시, 정상적으로 결과 반환
  (response) => {
    if (response.headers.get('authorization-wannaeat')) {
      setAccessToken(
        'Bearer ' + response.headers.get('authorization-wannaeat')
      );
      console.log(accessToken);
    } else {
      console.log('access token 없음');
      console.log(response.headers.get('authorization-wannaeat'));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
