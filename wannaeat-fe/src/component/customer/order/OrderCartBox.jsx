import { useState, useEffect } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import {
  TopBox,
  OrderContainer,
  ButtonWrapper,
  MenuContainer,
  TotalMenuP,
  DeleteDiv,
  LineDiv,
  PeopleP,
  MenuDiv,
  MenuImg,
  FoodDiv,
  FoodInfoDiv,
  FoodInfoTopDiv,
  FoodInfoBottomDiv,
  FoodInfoCountLeftBtn,
  FoodInfoCountRightBtn,
  FoodInfoCountDiv,
  FoodInfoCountP,
  MenuNameP,
  FoodPriceP,
  TotalPriceDiv,
  TotalPriceP,
} from './OrderCartBox.js';
import theme from '../../../style/common/theme.js';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../../stores/customer/useOrderStore.js';
import { deleteCarts } from 'api/customer/order.js';
import useChatStore from '../../../stores/customer/useChatStore.js';

const OrderCartBox = ({ reservationUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  const { allMenusInfo, setAllMenusInfo } = useOrderStore();
  const nav = useNavigate();

  const allMenus = allMenusInfo?.cartDetailResponseDto?.cartElements || [];

  const reservationParticipantId = 8;
  const [menuCounts, setMenuCounts] = useState([]);

  const { stompClient, isConnected } = useChatStore();

  // 주문 개수 변경하는 함수
  useEffect(() => {
    if (allMenus.length > 0) {
      const updatedMenuCounts = allMenus.map((menu) => {
        const menuInfo = Object.values(menu.menuInfo);
        return menuInfo.map((item) => ({
          menuCnt: item.menuCnt,
          menuTotalPrice: item.menuCnt * item.menuPrice,
          menuPrice: item.menuPrice,
        }));
      });
      setMenuCounts(updatedMenuCounts);
    }
  }, [allMenus]);

  const handleDecrease = (
    menuIndex,
    itemIndex,
    menuId,
    reservationParticipantId
  ) => {
    setMenuCounts((prevCounts) =>
      prevCounts.map((menu, index) =>
        index === menuIndex
          ? menu.map((item, idx) =>
              idx === itemIndex && item.menuCnt > 1
                ? {
                    ...item,
                    menuCnt: item.menuCnt - 1,
                    menuTotalPrice: item.menuTotalPrice - item.menuPrice,
                  }
                : item
            )
          : menu
      )
    );

    // 장바구니 업데이트 로직 추가
    const cartRegisterRequestDto = {
      reservationUrl: reservationUrl,
      reservationParticipantId: reservationParticipantId,
      menuId: menuId,
      menuPlusMinus: -1,
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

  const handleIncrease = (
    menuIndex,
    itemIndex,
    menuId,
    reservationParticipantId
  ) => {
    setMenuCounts((prevCounts) =>
      prevCounts.map((menu, index) =>
        index === menuIndex
          ? menu.map((item, idx) =>
              idx === itemIndex
                ? {
                    ...item,
                    menuCnt: item.menuCnt + 1,
                    menuTotalPrice: (item.menuCnt + 1) * item.menuPrice,
                  }
                : item
            )
          : menu
      )
    );

    // 장바구니 업데이트 로직 추가
    const cartRegisterRequestDto = {
      reservationUrl: reservationUrl,
      reservationParticipantId: reservationParticipantId,
      menuId: menuId,
      menuPlusMinus: 1,
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

  const handleOrderMainClick = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  const handleMenuDeleteButtonClick = async (reservationUrl) => {
    await deleteCarts(reservationUrl);

    setAllMenusInfo({
      cartDetailResponseDto: { cartElements: [], cartTotalPrice: 0 },
    });
  };

  const handleOrderButtonClick = () => {
    const orderRegisterRequestDto = {
      reservationUrl: reservationUrl,
      prepareRequest: true,
    };

    if (stompClient && isConnected) {
      try {
        stompClient.send(
          '/api/public/sockets/orders/register',
          {},
          JSON.stringify(orderRegisterRequestDto)
        );
        console.log('주문에 보내는 내용:', orderRegisterRequestDto);

        // 카트 정보 초기화
        setAllMenusInfo({ cartDetailResponseDto: { cartElements: [] } });
        setMenuCounts([]);
      } catch (error) {
        console.log('주문 실패:', error);
      }
    } else {
      console.log('stompClient is not initialized or not connected');
    }
  };

  // 사람 당 총 금액 구하는 함수
  const calculateTotalPrice = (menuIndex) => {
    if (!menuCounts[menuIndex]) return 0;
    return menuCounts[menuIndex].reduce(
      (total, item) => total + item.menuTotalPrice,
      0
    );
  };

  // 주문 총 금액 구하는 함수
  const calculateTotalMenuPrice = () => {
    return menuCounts.reduce((totalMenuPrice, menu) => {
      const menuTotal = menu.reduce(
        (total, item) => total + item.menuTotalPrice,
        0
      );
      return totalMenuPrice + menuTotal;
    }, 0);
  };

  return (
    <OrderContainer>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <TopBox>
          <MenuContainer>
            <TotalMenuP>총 메뉴 {}개</TotalMenuP>
            <DeleteDiv>
              {activeTab === 0 ? (
                <WEButton
                  width="100%"
                  height="90%"
                  outlined="true"
                  color={theme.color.disabled}
                  borderColor={theme.color.disabled}
                  fontSize={theme.fontSize.px11}
                  onClick={() => handleMenuDeleteButtonClick(reservationUrl)}
                >
                  비우기
                </WEButton>
              ) : null}
            </DeleteDiv>
          </MenuContainer>
        </TopBox>
        <MenuDiv>
          {activeTab === 0 ? (
            <>
              {allMenus &&
                allMenus
                  .filter(
                    (menus) =>
                      menus.reservationParticipantId ===
                      reservationParticipantId
                  )
                  .map((menus, menuIndex) => (
                    <div key={menuIndex}>
                      <LineDiv></LineDiv>
                      <div>
                        {menus.menuInfo ? (
                          Object.values(menus.menuInfo).map(
                            (menu, itemIndex) => (
                              <div key={itemIndex}>
                                <FoodDiv>
                                  <MenuImg src={menu.menuImage}></MenuImg>
                                  <FoodInfoDiv>
                                    <FoodInfoTopDiv>
                                      <MenuNameP>{menu.menuName}</MenuNameP>
                                    </FoodInfoTopDiv>
                                    <FoodInfoBottomDiv>
                                      <FoodInfoCountDiv>
                                        <FoodInfoCountLeftBtn
                                          onClick={() =>
                                            handleDecrease(
                                              menuIndex,
                                              itemIndex,
                                              menu.menuId,
                                              reservationParticipantId
                                            )
                                          }
                                          disabled={menu.menuCnt <= 0}
                                        >
                                          -
                                        </FoodInfoCountLeftBtn>
                                        <FoodInfoCountP>
                                          {
                                            menuCounts[menuIndex]?.[itemIndex]
                                              ?.menuCnt
                                          }
                                        </FoodInfoCountP>
                                        <FoodInfoCountRightBtn
                                          onClick={() =>
                                            handleIncrease(
                                              menuIndex,
                                              itemIndex,
                                              menu.menuId,
                                              reservationParticipantId
                                            )
                                          }
                                        >
                                          +
                                        </FoodInfoCountRightBtn>
                                      </FoodInfoCountDiv>
                                      <FoodPriceP>
                                        {
                                          menuCounts[menuIndex]?.[itemIndex]
                                            ?.menuTotalPrice
                                        }
                                        원
                                      </FoodPriceP>
                                    </FoodInfoBottomDiv>
                                  </FoodInfoDiv>
                                </FoodDiv>
                                <LineDiv />
                              </div>
                            )
                          )
                        ) : (
                          <p>메뉴 정보가 없습니다.</p>
                        )}
                      </div>
                      <TotalPriceDiv>
                        <TotalPriceP>
                          총 {calculateTotalPrice(menuIndex) || ''}원
                        </TotalPriceP>
                      </TotalPriceDiv>
                      <br />
                    </div>
                  ))}
            </>
          ) : (
            <>
              {allMenus &&
                allMenus.map((menus, menuIndex) => (
                  <div key={menuIndex}>
                    <PeopleP>
                      {menus.reservationParticipantNickname || ''}
                    </PeopleP>
                    <LineDiv />
                    <div>
                      {menus.menuInfo ? ( // menus.menuInfo가 객체이므로 Object.values로 배열상태로 변경
                        Object.values(menus.menuInfo).map((menu, itemIndex) => (
                          <div key={itemIndex}>
                            <FoodDiv>
                              <MenuImg src={menu.menuImage}></MenuImg>
                              <FoodInfoDiv>
                                <FoodInfoTopDiv>
                                  <MenuNameP>{menu.menuName}</MenuNameP>
                                </FoodInfoTopDiv>
                                <FoodInfoBottomDiv>
                                  <FoodInfoCountDiv>
                                    <FoodInfoCountP>
                                      {
                                        menuCounts[menuIndex]?.[itemIndex]
                                          ?.menuCnt
                                      }
                                    </FoodInfoCountP>
                                  </FoodInfoCountDiv>
                                  <FoodPriceP>
                                    {
                                      menuCounts[menuIndex]?.[itemIndex]
                                        ?.menuTotalPrice
                                    }
                                    원
                                  </FoodPriceP>
                                </FoodInfoBottomDiv>
                              </FoodInfoDiv>
                            </FoodDiv>
                            <LineDiv />
                          </div>
                        ))
                      ) : (
                        <p>메뉴 정보가 없습니다.</p>
                      )}
                    </div>
                    <TotalPriceDiv>
                      <TotalPriceP>
                        총 {calculateTotalPrice(menuIndex) || ''}원
                      </TotalPriceP>
                    </TotalPriceDiv>
                    <br />
                  </div>
                ))}
              <TotalPriceDiv>
                {menuCounts.length > 0 ? (
                  <TotalPriceP>총: {calculateTotalMenuPrice()}원</TotalPriceP>
                ) : null}
              </TotalPriceDiv>
            </>
          )}
        </MenuDiv>
      </div>
      <ButtonWrapper>
        <WEButton size="medium" outlined="true" onClick={handleOrderMainClick}>
          주문서
        </WEButton>
        <WEButton
          size="medium"
          outlined="true"
          onClick={handleOrderButtonClick}
        >
          주문하기
        </WEButton>
      </ButtonWrapper>
    </OrderContainer>
  );
};

export default OrderCartBox;
