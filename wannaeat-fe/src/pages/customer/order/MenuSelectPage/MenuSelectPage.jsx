import { useEffect } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import { useNavigate, useParams } from 'react-router-dom';
import { getMenuData, validateReservationUrl } from 'api/customer/socket';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useChatStore from 'stores/customer/useChatStore';
import MenuSelectBox from 'component/customer/order/MenuSelectBox';
import useOrderStore from 'stores/customer/useOrderStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useState } from 'react';
import useCartStore from 'stores/customer/useCartStore';

import CartIcon from 'assets/icons/order/cart.svg';
import {
  MenuPageContainer,
  WETabContainer,
  TabText,
  MenuDescription,
  MenuPrice,
  CartImg,
  MenuContainer,
  MenuBox,
  ImageBox,
  MenuImg,
  MenuContentContainer,
  MenuName,
  // MenuPrice,
  // MenuDescription,
} from './MenuSelectPage.js';
import useAlert from 'utils/alert.js';

const MenuSelectPage = () => {
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const { isConnected, setIsConnected, stompClient, setStompClient } =
    useChatStore();

  const [activeTab, setActiveTab] = useState(0);
  const [reservationParticipantId, setReservationParticipantId] = useState(0);
  const increment = 1; // 증가 갯수는 1로 설정

  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setIsShowBackIcon,
    setActiveIcons,
    setIconAction,
  } = useHeaderStore();

  const { allMenusData, setAllMenusData } = useOrderStore();
  const { setCartElements } = useCartStore();

  const showAlert = useAlert();

  // 웹소켓 초기 연결
  useEffect(() => {
    setIsCarrot(true);
    setPageName('메뉴선택');
    setIsShowLogo(false);
    setIsShowBackIcon(true);

    const gotoChat = () => {
      nav(`/customer/order/chat/${reservationUrl}`);
    };
    const gotoSelectMenu = () => {
      nav(`/customer/order/menu-select/${reservationUrl}`);
    };
    setActiveIcons([8, 10]);
    setIconAction([gotoSelectMenu, gotoChat]);

    const validateAndConnect = async () => {
      // reservationUrl 유효성 검사 실행 후 유효한 경우
      // stompClient가 없는 경우에만 소켓 연결 시도
      if (!stompClient) {
        initializeConnection();
      } else {
        console.log('이미 소켓이 연결되어 있습니다.');
      }
    };

    validateAndConnect();

    setReservationParticipantId(
      localStorage.getItem('reservationParticipantId')
    );
  }, []);

  const initializeConnection = () => {
    const socket = new SockJS(
      `${process.env.REACT_APP_REST_API_URL}/api/public/ws`
    );
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
            console.log('sumin Received message: ', content);

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

  const restaurantId = 1;

  const fetchMenuData = async () => {
    const allMenuData = await getMenuData(restaurantId);
    console.log('식당의 전체 메뉴 불러온 데이터', allMenuData.data);
    await setAllMenusData(allMenuData.data);
    console.log('zustand allMenusData:', allMenusData);
  };

  // 모든 메뉴 데이터 불러오기
  useEffect(() => {
    if (isConnected) {
      fetchMenuData();
    }
  }, []);

  // 카테고리 추출
  const tabs = allMenusData.menuListByCategoryResponseDtos.map(
    (category) => category.menuCategoryName
  );

  // 선택한 카테고리에 따른 메뉴
  const currentMenuDetails =
    allMenusData.menuListByCategoryResponseDtos[activeTab]
      ?.menuDetailResponseDtos;

  const clickGotoCart = () => {
    nav(`/customer/order/cart/${reservationUrl}`);
  };

  const handleCartIconClick = (menuId) => {
    showAlert('메뉴가 장바구니에 추가되었습니다.');

    const cartRegisterRequestDto = {
      reservationUrl: reservationUrl,
      reservationParticipantId: reservationParticipantId,
      menuId: menuId,
      menuPlusMinus: increment,
    };

    if (stompClient && isConnected) {
      console.log('메뉴선택 웹소켓', stompClient);
      console.log('메뉴선택 연결상태', isConnected);
      try {
        stompClient.send(
          `/api/public/sockets/carts/register`,
          {},
          JSON.stringify(cartRegisterRequestDto)
        );
        console.log('장바구니 업데이트 내용:', cartRegisterRequestDto);
      } catch (error) {
        console.log('장바구니 업데이트 실패', error);
        showAlert('장바구니 업데이트를 실패했습니다.');
      }
    } else {
      console.log('웹소켓 연결 실패');
      showAlert('웹소켓 연결에 실패했습니다.');
    }
  };

  return (
    <MenuPageContainer>
      <WETabContainer>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </WETabContainer>
      <TabText>{tabs[activeTab]}</TabText>
      <MenuContainer>
        {currentMenuDetails &&
          currentMenuDetails.map((menu, menuId) => (
            <MenuBox key={menuId}>
              <ImageBox>
                <MenuImg src={menu.menuImage}></MenuImg>
              </ImageBox>
              <MenuContentContainer>
                <MenuName>{menu.menuName}</MenuName>
                <MenuPrice>
                  {menu.menuPrice.toLocaleString('ko-KR')}원
                </MenuPrice>
                <MenuDescription>{menu.menuDescription}</MenuDescription>
                <CartImg
                  src={CartIcon}
                  alt="담기 아이콘"
                  onClick={() => handleCartIconClick(menu.menuId)}
                />
              </MenuContentContainer>
            </MenuBox>
          ))}
      </MenuContainer>

      <WEButton onClick={clickGotoCart}>장바구니 보기</WEButton>
    </MenuPageContainer>
  );
};

export default MenuSelectPage;
