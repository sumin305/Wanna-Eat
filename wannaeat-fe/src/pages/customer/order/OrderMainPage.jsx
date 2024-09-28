import { useEffect } from 'react';
import useWebSocketStore from 'stores/common/useWebSocketStore';

const OrderMainPage = () => {
  const { connectWebSoket, disconnectWebSocket } = useWebSocketStore();

  // 웹소켓 연결
  useEffect(() => {
    connectWebSoket(`${process.env.REACT_APP_REST_API_URL}/api/public/ws`);

    // 컴포넌트 언마운트될 때 웹소켓 연결 해제
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return <div>주문하기 메인페이지</div>;
};

export default OrderMainPage;
