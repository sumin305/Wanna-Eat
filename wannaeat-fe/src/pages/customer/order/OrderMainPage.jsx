import { useEffect } from 'react';
import useWebSocketStore from 'stores/common/useWebSocketStore';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { validateReservationUrl } from 'api/customer/order';

const OrderMainPage = () => {
  const { connectWebSoket, disconnectWebSocket, subscribe } =
    useWebSocketStore();
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;

  const clickGotoChat = () => {
    nav(`/customer/order/${reservationUrl}/chat`);
  };

  // 유효성 검사 후 웹소켓 연결
  useEffect(() => {
    const validateAndConnect = async () => {
      const response = await validateReservationUrl(reservationUrl);

      console.log('유효성검사결과:', response);
      if (response.status === 200) {
        // 웹소켓 연결
        await connectWebSoket(
          `${process.env.REACT_APP_REST_API_URL}/api/public/ws`
        );

        // 구독은 stompClient가 설정된 후에 해야 함
        setTimeout(() => {
          subscribe(
            `${process.env.REACT_APP_REST_API_URL}/topic/reservations/${reservationUrl}`, // REST API URL이 아닌 상대 경로 사용
            function (response) {
              console.log('메시지 수신:', response);
            }
          );
        }, 500);
      } else {
        console.log(response.response.data.message);
        nav('/customer/order/notexist', {
          state: { message: response.response.data.message },
        });
      }
    };

    validateAndConnect();

    // 컴포넌트 언마운트될 때 웹소켓 연결 해제
    return () => {
      disconnectWebSocket();
    };
  }, [reservationUrl]);

  return (
    <>
      <div>주문하기 메인페이지</div>
      <button onClick={clickGotoChat}>채팅으로 이동</button>
      <div>버튼아 보여라</div>
      <div>버튼</div>
    </>
  );
};

export default OrderMainPage;
