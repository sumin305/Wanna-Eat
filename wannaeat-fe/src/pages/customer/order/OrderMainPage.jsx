import { useEffect } from 'react';
import useWebSocketStore from 'stores/common/useWebSocketStore';
import { useNavigate } from 'react-router-dom';

const OrderDetailPage = () => {
  const { connectWebSoket, disconnectWebSocket } = useWebSocketStore();
  const nav = useNavigate();

  const clickGotoChat = () => {
    nav('/customer/chat');
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
      <div>주문하기 메인페이지</div>
      <button onClick={clickGotoChat}>채팅으로 이동</button>
      <div>버튼아 보여라</div>
      <div>버튼</div>
    </>
  );
};

export default OrderDetailPage;
