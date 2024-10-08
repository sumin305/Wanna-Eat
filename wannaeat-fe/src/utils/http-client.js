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

  // 실패
  async (error) => {
    console.log(error);
    const { response, config } = error;
    console.log('authClientInstance 응답 실패');

    // 인증 실패 (401에러) 시
    if (response.status === 401) {
      // 처음 401 에러가 발생했을 경우 isReissueRequested == false
      if (localStorage.getItem('isReissueRequested') === 'false') {
        // interceptor에서 reissue 재요청
        const reissueResponse =
          await authWithRefreshClientInstance.get('/api/users/reissue');

        //  AccessToken Reissue 성공
        if (reissueResponse.status === 200) {
          console.log('AccessToken Reissue 성공');

          const newAccessToken =
            'Bearer ' + reissueResponse.headers.get('authorization-wannaeat');
          setAccessToken(newAccessToken);
          localStorage.setItem('isReissueRequested', true);
          config.headers['authorization-wannaeat'] = newAccessToken;
          return await authClientInstance(config);
        }
        //  AccessToken Reissue 실패
        else {
          return Promise.reject(error);
        }
      } else {
        console.log('AccessToken Reissue 실패');
        localStorage.setItem('isReissueRequested', false);
        alert('로그인 해주세요');
        window.location.href = '/';
        return;
      }
    } else {
      console.log('인증 성공');
    }
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
