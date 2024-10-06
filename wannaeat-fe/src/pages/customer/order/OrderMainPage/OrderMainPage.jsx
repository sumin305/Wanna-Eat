import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import useChatStore from 'stores/customer/useChatStore';
import { validateReservationUrl, getOrderData } from 'api/customer/order';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useOrderStore from 'stores/customer/useOrderStore';
import OrderMainBox from 'component/customer/order/OrderMainBox/OrderMainBox.jsx';

const OrderMainPage = () => {
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

  const {
    isConnected,
    setIsConnected,
    stompClient,
    setStompClient,
    chatPage,
    chatSize,
  } = useChatStore();

  const { allOrdersInfo, setAllOrdersInfo } = useOrderStore();

  const {
    setReservationDate,
    setReservationStartTime,
    setReservationEndTime,
    setRestaurantId,
    setReservationId,
  } = useOrderStore();

  // 웹소켓 초기 연결
  useEffect(() => {
    setIsCarrot(true);
    setPageName('주문서');
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

  const initializeConnection = () => {
    const socket = new SockJS(
      `${process.env.REACT_APP_REST_API_URL}/api/public/ws`
    );
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

  const fetchOrdersInfo = async () => {
    const allOrdersInfo = await getOrderData(
      reservationUrl,
      chatPage,
      chatSize
    );
    console.log('메인페이지 불러온 데이터:', allOrdersInfo.data);

    setReservationDate(allOrdersInfo.data.reservationDate);
    setReservationStartTime(allOrdersInfo.data.reservationDate);
    setReservationEndTime(allOrdersInfo.data.reservationEndTime);
    setRestaurantId(allOrdersInfo.data.restaurantId);
    setReservationId(allOrdersInfo.data.reservationId);

    // 전체 메뉴 리스트 저장
    setAllOrdersInfo(allOrdersInfo.data);
    // 식당 아이디 저장
    // setRestaurantId(allOrderData.data.restaurantId);
    console.log('zustand allMenus:', allOrdersInfo);
    // console.log('zustand restaurantId:', restaurantId);
  };

  // 모든 주문 데이터 불러오기
  useEffect(() => {
    if (isConnected) {
      fetchOrdersInfo();
      console.log('allOrdersInfo', allOrdersInfo);
    }
  }, []);

  const clickGotoChat = () => {
    nav(`/customer/order/chat/${reservationUrl}`);
  };

  return (
    <>
      <button onClick={clickGotoChat}>채팅으로 이동</button>
      <button
        onClick={() => nav(`/customer/order/menu-select/${reservationUrl}`)}
      >
        메뉴선택페이지로 이동
      </button>
      <OrderMainBox reservationUrl={reservationUrl} />
    </>
  );
};

export default OrderMainPage;
