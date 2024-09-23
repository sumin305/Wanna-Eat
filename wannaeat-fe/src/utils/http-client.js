import axios from 'axios';
import Cookies from 'js-cookie';

const createClientInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.REACT_APP_REST_API_URL,
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
  });
  return instance;
};

export const clientInstance = createClientInstance();
