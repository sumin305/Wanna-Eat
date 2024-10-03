import { clientInstance, authClientInstance } from '../../utils/http-client';

export const getAlarms = async () => {
    return await clientInstance
      .get('/api/public/alarms', {})
      .then((result) => result)
      .catch((error) => error);
  };