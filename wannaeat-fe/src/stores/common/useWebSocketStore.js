import { create } from 'zustand';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const useWebSocketStore = create((set, get) => ({
  stompClient: '',

  // 웹소켓 연결하기
  connectWebSoket: (url) => {
    const socket = new SockJS(url); // SockJS로 서버에 연결
    const stompClient = Stomp.over(socket); // stomp 프로토콜 사용
    stompClient.connect({}, () => {
      set({ stompClient });
      console.log('웹소켓 연결 성공');
      // stompClient.subscribe(
      //   `${process.env.REACT_APP_REST_API_URL}/topic/reservations`,
      //   (response) => {
      //     console.log(response);
      //     console.log(JSON.parse(response.body));
      //   }
      // );
    });
  },

  // 웹소켓 연결 해제
  disconnectWebSocket: () => {
    const stompClient = get().stompClient;
    if (stompClient) {
      stompClient.disconnect(() => {
        set({ stompClient: '' });
        console.log('웹소켓 연결 해제');
      });
    }
  },

  // 구독하기
  subscribe: (destination, callback) => {
    const { stompClient } = useWebSocketStore.getState();
    if (stompClient) {
      stompClient.subscribe(destination, (message) => {
        callback(JSON.parse(message.body));
      });
    }
  },
}));

export default useWebSocketStore;
