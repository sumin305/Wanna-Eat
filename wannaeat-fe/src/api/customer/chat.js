import { socketClient } from 'utils/http-client';

// 채팅 불러오기
export const getChatlist = async (reservationUrl, chatPage, chatSize) => {
  try {
    const result = await socketClient.get(
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

// 채팅 목록 불러오기
export const getChats = async (reservationUrl) => {
  return await socketClient
    .get('/api/public/chats/' + reservationUrl)
    .then((result) => result)
    .catch((error) => error);
};
