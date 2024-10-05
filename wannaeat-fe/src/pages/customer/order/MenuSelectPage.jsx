import { useEffect } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import { useNavigate, useParams } from 'react-router-dom';
import { getMenuData, validateReservationUrl } from 'api/customer/order';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useChatStore from 'stores/customer/useChatStore';
import MenuSelectBox from 'component/customer/order/MenuSelectBox';
import useOrderStore from 'stores/customer/useOrderStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useState } from 'react';
import CartIcon from 'assets/icons/order/cart.svg';
import {
  MenuPageContainer,
  WETabContainer,
  TabText,
  MenuItems,
  MenuItem,
  MenuImage,
  MenuInfo,
  MenuTitle,
  MenuDescription,
  MenuPrice,
  CartImg,
} from './MenuSelectPage.js';

const MenuSelectPage = () => {
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const { isConnected, setIsConnected, stompClient, setStompClient } =
    useChatStore();
  const [activeTab, setActiveTab] = useState(0);
  const reservationParticipantId = 7;
  const increment = 1; // 증가 갯수는 1로 설정

  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setIsShowBackIcon,
    setActiveIcons,
  } = useHeaderStore();

  const { allMenusData, setAllMenusData } = useOrderStore();

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
      }
    } else {
      console.log('웹소켓 연결 실패');
      alert('웹소켓 연결에 실패했습니다.');
    }
  };

  return (
    <MenuPageContainer>
      <WETabContainer>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </WETabContainer>
      <TabText>{tabs[activeTab]}</TabText>
      <MenuItems>
        {currentMenuDetails &&
          currentMenuDetails.map((menu, menuId) => (
            <MenuItem key={menuId}>
              <MenuImage src={menu.menuImage}></MenuImage>
              <MenuInfo>
                <MenuTitle>{menu.menuName}</MenuTitle>
                <MenuPrice>
                  {menu.menuPrice.toLocaleString('ko-KR')}원
                </MenuPrice>
                <MenuDescription>{menu.menuDescription}</MenuDescription>
              </MenuInfo>
              <CartImg
                src={CartIcon}
                alt="담기 아이콘"
                onClick={() => handleCartIconClick(menu.menuId)}
              />
            </MenuItem>
          ))}

        <WEButton onClick={clickGotoCart}>장바구니 보기</WEButton>
      </MenuItems>
    </MenuPageContainer>
  );
};

export default MenuSelectPage;
