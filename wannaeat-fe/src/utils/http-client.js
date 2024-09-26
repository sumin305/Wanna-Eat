import axios from 'axios';
import Cookies from 'js-cookie';

const createClientInstance = () => {
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

const createAuthClientInstance = () => {
  const accessToken = localStorage.getItem('Authorization-wannaeat');
  console.log('createAuthClientInstance 요청함  accessToken: ', accessToken);
  console.log(accessToken);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization-wannaeat': `Bearer ${accessToken}`,
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });

  return instance;
};

const createAuthWithAccessAndRefreshClientInstance = () => {
  const accessToken = localStorage.getItem('Authorization-wannaeat');
  const refreshToken = Cookies.get('refreshToken');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization-wannaeat': `Bearer ${accessToken}`,
      'Authorization-refresh': `Bearer ${refreshToken}`,
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });

  return instance;
};

export const clientInstance = createClientInstance();
export const authClientInstance = createAuthClientInstance();
export const authWithAccessAndRefreshClientInstance =
  createAuthWithAccessAndRefreshClientInstance();
