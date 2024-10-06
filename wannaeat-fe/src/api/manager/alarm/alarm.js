import { clientInstance, authClientInstance } from 'utils/http-client';

export const getAlarms = async () => {
    return await authClientInstance
      .get('/api/alarms')
      .then((result) => result)
      .catch((error) => error);
  };