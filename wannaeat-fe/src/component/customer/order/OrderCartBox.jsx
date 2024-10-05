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
import useChatStore from '../../../stores/customer/useChatStore.js';

const OrderCartBox = ({ reservationUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];

  // Zustand에서 필요한 상태와 함수를 가져옴
  const {
    allMenusInfo,
    setAllMenusInfo,
    allSortedMenusInfo,
    setAllMenusSortInfo,
  } = useOrderStore();
  const nav = useNavigate();

  // 정렬되지 않은 메뉴 데이터를 가져옴
  const allMenus = allMenusInfo?.cartDetailResponseDto?.cartElements || [];

  // 정렬된 메뉴 데이터를 Zustand에서 가져옴
  const sortedMenus =
    allSortedMenusInfo?.cartDetailResponseDto?.cartElements || [];

  const reservationParticipantId = 8;
  const [menuCounts, setMenuCounts] = useState([]);

  const { stompClient, isConnected } = useChatStore();

  // allMenus를 reservationParticipantId 기준으로 정렬하는 함수
  const sortMenusByParticipantId = (menus, targetId) => {
    return [...menus].sort((a, b) => {
      // targetId(예: reservationParticipantId)와 동일한 것이 먼저 오게 정렬
      if (a.reservationParticipantId === targetId) return -1;
      if (b.reservationParticipantId === targetId) return 1;
      // 그 외에는 기존대로 정렬
      return a.reservationParticipantId - b.reservationParticipantId;
    });
  };

  // 메뉴 정렬 후 Zustand에 저장
  useEffect(() => {
    if (allMenus.length > 0) {
      const sorted = sortMenusByParticipantId(
        allMenus,
        reservationParticipantId
      );

      // 정렬된 메뉴를 Zustand에 저장
      setAllMenusSortInfo({
        cartDetailResponseDto: {
          cartElements: sorted,
        },
      });

      // menuCounts 업데이트
      const updatedMenuCounts = sorted.map((menu) => {
        const menuInfo = Object.values(menu.menuInfo);
        return menuInfo.map((item) => ({
          menuCnt: item.menuCnt,
          menuTotalPrice: item.menuCnt * item.menuPrice,
          menuPrice: item.menuPrice,
        }));
      });
      setMenuCounts(updatedMenuCounts);
    }
  }, [allMenus, reservationParticipantId, setAllMenusSortInfo]);

  const handleDecrease = (
    menuIndex,
    itemIndex,
    menuId,
    reservationParticipantId
  ) => {
    setMenuCounts((prevCounts) =>
      prevCounts.map((menu, index) =>
        index === menuIndex
          ? menu.map((item, idx) => {
              if (idx === itemIndex) {
                if (item.menuCnt > 1) {
                  return {
                    ...item,
                    menuCnt: item.menuCnt - 1,
                    menuTotalPrice: item.menuTotalPrice - item.menuPrice,
                  };
                } else {
                  alert('메뉴 수량은 0 이하로 줄일 수 없습니다.');
                  return item;
                }
              }
              return item;
            })
          : menu
      )
    );

    const cartRegisterRequestDto = {
      reservationUrl: reservationUrl,
      reservationParticipantId: reservationParticipantId,
      menuId: menuId,
      menuPlusMinus: -1,
    };

    if (stompClient && isConnected) {
      try {
        stompClient.send(
          `/api/public/sockets/carts/register`,
          {},
          JSON.stringify(cartRegisterRequestDto)
        );
      } catch (error) {
        console.log('장바구니 업데이트 실패', error);
      }
    } else {
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

    const cartRegisterRequestDto = {
      reservationUrl: reservationUrl,
      reservationParticipantId: reservationParticipantId,
      menuId: menuId,
      menuPlusMinus: 1,
    };

    if (stompClient && isConnected) {
      try {
        stompClient.send(
          `/api/public/sockets/carts/register`,
          {},
          JSON.stringify(cartRegisterRequestDto)
        );
      } catch (error) {
        console.log('장바구니 업데이트 실패', error);
      }
    } else {
      alert('웹소켓 연결에 실패했습니다.');
    }
  };

  const handleOrderMainClick = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  // 비우기 버튼 클릭시 실행되는 함수
  const handleMenuDeleteButtonClick = () => {
    const cartClearRequestDto = {
      reservationUrl: reservationUrl,
      reservationParticipantId: reservationParticipantId,
    };

    if (stompClient && isConnected) {
      try {
        stompClient.send(
          `/api/public/sockets/carts/clear`,
          {},
          JSON.stringify(cartClearRequestDto)
        );
      } catch (error) {
        console.log('장바구니 목록지우기 실패', error);
      }
    } else {
      alert('웹소켓 연결에 실패했습니다.');
    }

    // 다른 사람들의 메뉴만 필터링해서 저장
    const filteredMenus = sortedMenus.filter(
      (menu) => menu.reservationParticipantId !== reservationParticipantId
    );

    setAllMenusSortInfo({
      cartDetailResponseDto: {
        cartElements: filteredMenus,
      },
    });
  };

  // 주문하기 버튼 클릭시 실행되는 함수
  const handleOrderButtonClick = () => {
    const orderRegisterRequestDto = {
      reservationUrl: reservationUrl,
      prepareRequest: true,
    };

    if (stompClient && isConnected) {
      try {
        stompClient.send(
          `/api/public/sockets/orders/register`,
          {},
          JSON.stringify(orderRegisterRequestDto)
        );
        console.log('주문에 보내는 내용:', orderRegisterRequestDto);

        setAllMenusInfo({ cartDetailResponseDto: { cartElements: [] } });
        setAllMenusSortInfo({ cartDetailResponseDto: { cartElements: [] } });
        setMenuCounts([]);
      } catch (error) {
        console.log('주문 실패:', error);
      }
    } else {
      console.log('stompClient is not initialized or not connected');
    }
  };

  const calculateTotalPrice = (menuIndex) => {
    if (!menuCounts[menuIndex]) return 0;
    return menuCounts[menuIndex].reduce(
      (total, item) => total + item.menuTotalPrice,
      0
    );
  };

  const calculateTotalMenuPrice = () => {
    return menuCounts.reduce((totalMenuPrice, menu) => {
      const menuTotal = menu.reduce(
        (total, item) => total + item.menuTotalPrice,
        0
      );
      return totalMenuPrice + menuTotal;
    }, 0);
  };

  console.log(sortedMenus);
  return (
    <OrderContainer>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <TopBox>
          <MenuContainer>
            <TotalMenuP>총 메뉴 {sortedMenus.length}개</TotalMenuP>
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
              {sortedMenus &&
                sortedMenus
                  .filter(
                    (menus) =>
                      menus.reservationParticipantId ===
                      reservationParticipantId
                  )
                  .map((menus, menuIndex) => (
                    <div key={menuIndex}>
                      <PeopleP>{menus.reservationParticipantNickname}</PeopleP>
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
                                        {menuCounts[menuIndex]?.[
                                          itemIndex
                                        ]?.menuTotalPrice.toLocaleString(
                                          'ko-KR'
                                        )}{' '}
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
                          총:{' '}
                          {calculateTotalPrice(menuIndex).toLocaleString(
                            'ko-KR'
                          ) || ''}{' '}
                          원
                        </TotalPriceP>
                      </TotalPriceDiv>
                      <br />
                    </div>
                  ))}
            </>
          ) : (
            <>
              {sortedMenus &&
                sortedMenus.map((menus, menuIndex) => (
                  <div key={menuIndex}>
                    <PeopleP>
                      {menus.reservationParticipantNickname || ''}
                    </PeopleP>
                    <LineDiv />
                    <div>
                      {menus.menuInfo ? (
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
                                    {menuCounts[menuIndex]?.[
                                      itemIndex
                                    ]?.menuTotalPrice.toLocaleString('ko-KR')}
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
                        총:{' '}
                        {calculateTotalPrice(menuIndex).toLocaleString(
                          'ko-KR'
                        ) || ''}
                        원
                      </TotalPriceP>
                    </TotalPriceDiv>
                    <br />
                  </div>
                ))}
              <LineDiv />
              <TotalPriceDiv>
                {menuCounts.length > 0 ? (
                  <TotalPriceP>
                    총: {calculateTotalMenuPrice().toLocaleString('ko-KR')}원
                  </TotalPriceP>
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
