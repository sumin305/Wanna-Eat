import { useEffect } from 'react';
import useWebSocketStore from 'stores/common/useWebSocketStore';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { connectWebSoket, disconnectWebSocket } = useWebSocketStore();
  const nav = useNavigate();

  const clickGotoOrder = () => {
    nav('/customer/order');
  };

  // 웹소켓 연결
  useEffect(() => {
    connectWebSoket(`${process.env.REACT_APP_REST_API_URL}/api/public/ws`);

    // 컴포넌트 언마운트될 때 웹소켓 연결 해제
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <>
      <div>채팅방</div>
      <button onClick={clickGotoOrder}>주문하기로 이동</button>
      <div>버튼아 보여라</div>
      <div>버튼</div>
    </>
  );
};

export default ChatPage;
