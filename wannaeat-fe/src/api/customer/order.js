import { clientInstance } from 'utils/http-client';

// reservationUrl 유효성 검사
export const validateReservationUrl = async (reservationUrl) => {
  try {
    const result = await clientInstance.post(
      'api/public/reservations/validation',
      {
        reservationUrl: reservationUrl,
      }
    );
    return result;
  } catch (error) {
    console.error('유효성 검사 실패:', error);
    return error;
  }
};
