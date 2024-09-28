import { clientInstance } from 'utils/http-client';

export const validateReservationUrl = async (reservationUrl) => {
  await clientInstance
    .post('api/reservations/validation', { reservationUrl: reservationUrl })
    .then((result) => console.log(result))
    .catch((error) => error);
};
