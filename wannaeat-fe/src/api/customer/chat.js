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
    if (result && result.data) {
      console.log('채팅 데이터 :', result.data);
      return result.data;
    } else {
      console.log('데이터가 존재하지 않습니다.');
      return null;
    }
  } catch (error) {
    console.log('채팅 불러오기 실패', error);
  }
};
