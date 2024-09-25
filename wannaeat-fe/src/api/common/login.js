import { createAuthWithRefreshClientInstance } from '../../utils/http-client';

export const getToken = async (accessToken, refreshToken) => {
  const instance = createAuthWithRefreshClientInstance(accessToken);
  return await instance
    .get('/api/users/reissue')
    .then((result) => {
      const authToken = result.headers['authorization-wannaeat'];
      if (authToken) {
        // 로컬 스토리지에 저장
        localStorage.setItem('Authorization-wannaeat', authToken);
        const base64Payload = authToken.split('.')[1];

        console.log('Authorization-wannaeat token stored:', authToken);

        const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
        const decodedJWT = JSON.parse(
          decodeURIComponent(
            window
              .atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          )
        );
        console.log('decodedJWT', decodedJWT);
      } else {
        console.log('Authorization-wannaeat header not found');
      }

      return result.data;
    })
    .catch((error) => error);
};
