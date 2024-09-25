import axios from 'axios';
import Cookies from 'js-cookie';

const createClientInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_REST_API_URL,
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

const createAuthClientInstance = (accessToken) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });

  return instance;
};

const createAuthWithRefreshClientInstance = (accessToken) => {
  const refreshToken = Cookies.get('refreshToken');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Authorization-refresh': `Bearer ${refreshToken}`,
      'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });

  return instance;
};

export const clientInstance = createClientInstance();
export { createAuthClientInstance, createAuthWithRefreshClientInstance };
