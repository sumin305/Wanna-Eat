import { clientInstance } from 'utils/http-client';

// export const getReservationData = async (reservationUrl, chatPage, chatSize) => {
//     try {
//         const result = await clientInstance.get(
//             `api/public/share-data/${reservationUrl}?chatPage=${chatPage}&chatSize=${chatSize}`
//         );
//         console.log('')
//     }
// }

export const getChatlist = async (reservationUrl, chatPage, chatSize) => {
  try {
    const result = await clientInstance.get(
      `/api/public/share-data/${reservationUrl}?chatPage=${chatPage}&chatSize=${chatSize}`
    );
    console.log('채팅 데이터 :', result.data);
    return result.data;
  } catch (error) {
    console.log('채팅 불러오기 실패', error);
  }
};
