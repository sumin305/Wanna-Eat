import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { validateReservationUrl } from 'api/customer/order';
import useChatStore from 'stores/customer/useChatStore';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import OrderMainBox from 'component/customer/order/OrderMainBox';
import useHeaderStore from 'stores/common/useHeaderStore';

const OrderMainPage = () => {
  const { isConnected, setIsConnected, stompClient, setStompClient } =
    useChatStore();
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setActiveIcons,
    setIsShowBackIcon,
  } = useHeaderStore();

  // 웹소켓 초기 연결
  useEffect(() => {
    setIsCarrot(true);
    setPageName('주문 내역');
    setIsShowLogo(false);
    setActiveIcons([3]);
    setIsShowBackIcon(true);

    const validateAndConnect = async () => {
      const response = await validateReservationUrl(reservationUrl);

      // reservationUrl 유효성 검사 실행 후 유효한 경우
      if (response.status === 200) {
        // stompClient가 없는 경우에만 소켓 연결 시도
        if (!stompClient) {
          initializeConnection();
        } else {
          console.log('이미 소켓이 연결되어 있습니다.');
        }
      } else {
        // 유효하지 않은 reservationUrl일 경우
        console.log(response.response.data.message);
        nav('/customer/order/notexist', {
          state: { message: response.response.data.message },
        });
      }
    };

    validateAndConnect();
  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log('연결되었음!');
    }
  }, [isConnected]);

  const initializeConnection = () => {
    const socket = new SockJS('http://localhost:8080/api/public/ws');
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log('소켓연결');

        // 구독
        client.subscribe(
          `/topic/reservations/${reservationUrl}`,
          (response) => {
            const content = JSON.parse(response.body);
            console.log('Received message: ', content);
          }
        );

        setStompClient(client);
        setIsConnected(true);
      },
      (error) => {
        console.log('소켓 연결 오류:', error);
        setIsConnected(false);
      }
    );
  };

  const clickGotoChat = () => {
    nav(`/customer/order/chat/${reservationUrl}`);
  };

  console.log('웹소켓연결확인:', stompClient);
  console.log('웹소켓연결확인:', isConnected);

  return (
    <>
      <div>주문하기 메인페이지</div>
      <button onClick={clickGotoChat}>채팅으로 이동</button>
      <OrderMainBox />
      <div>버튼아 보여라</div>
      <div>버튼</div>
    </>
  );
};

export default OrderMainPage;
