import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateReservationUrl } from 'api/customer/order';
import useChatStore from 'stores/customer/useChatStore';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import OrderCartBox from 'component/customer/order/OrderCartBox/OrderCartBox.jsx';
import useHeaderStore from 'stores/common/useHeaderStore';
import useOrderStore from 'stores/customer/useOrderStore';
import { getOrderData } from 'api/customer/order.js';
import useCartStore from 'stores/customer/useCartStore';

const OrderCartPage = () => {
  const {
    isConnected,
    setIsConnected,
    stompClient,
    setStompClient,
    chatPage,
    chatSize,
  } = useChatStore();
  const {
    allOrdersInfo,
    allMenusInfo,
    setAllMenusInfo,
    restaurantId,
    setRestaurantId,
  } = useOrderStore();
  const { setCartElements } = useCartStore();

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
    setPageName('장바구니');
    setIsShowLogo(false);
    setActiveIcons([8, 10]);
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
            console.log('soom Received message: ', content);
            if (content.socketType === 'CART') {
              console.log('cart socket message ');
              console.dir(content.cartElements);
              setCartElements(content.cartElements);
            }
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

  console.log('웹소켓연결확인:', stompClient);
  console.log('웹소켓연결확인:', isConnected);

  const fetchMenusData = async () => {
    const allOrderData = await getOrderData(reservationUrl, chatPage, chatSize);
    console.log('메인페이지 불러온 데이터:', allOrderData.data);

    // 전체 메뉴 리스트 저장
    setAllMenusInfo(allOrderData.data);
    // 식당 아이디 저장
    // setRestaurantId(allOrderData.data.restaurantId);
    console.log('zustand allMenus:', allOrderData.data);
    // console.log('zustand restaurantId:', restaurantId);
  };

  // 모든 주문 데이터 불러오기
  useEffect(() => {
    if (isConnected) {
      fetchMenusData();
    }
  }, []);

  return (
    <>
      <OrderCartBox reservationUrl={reservationUrl} />
    </>
  );
};

export default OrderCartPage;
