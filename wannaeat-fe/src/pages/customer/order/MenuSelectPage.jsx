import { useEffect } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import { useNavigate, useParams } from 'react-router-dom';
import { validateReservationUrl } from 'api/customer/order';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useChatStore from 'stores/customer/useChatStore';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import MenuSelectBox from 'component/customer/order/MenuSelectBox';

const MenuSelectPage = () => {
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const { isConnected, setIsConnected, stompClient, setStompClient } =
    useChatStore();

  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setIsShowBackIcon,
    setActiveIcons,
  } = useHeaderStore();

  // 웹소켓 초기 연결
  useEffect(() => {
    setIsCarrot(true);
    setPageName('메뉴선택');
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
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

  const initializeConnection = () => {
    const socket = new SockJS('http://localhost:8080/api/public/ws');
    const client = Stomp.over(socket);

    // 웹소켓 연결
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

  const clickGotoOrder = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  return (
    <>
      <div>메뉴 선택 페이지</div>
      <MenuSelectBox />
      <WEButton onClick={clickGotoOrder}>주문내역보기</WEButton>
    </>
  );
};

export default MenuSelectPage;
