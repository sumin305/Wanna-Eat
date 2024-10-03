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

  const reservationParticipantId = 3;
  const allMenus = allMenusInfo?.cartDetailResponseDto?.cartElements || [];

  const [menuCounts, setMenuCounts] = useState([]);

  const { stompClient, isConnected } = useChatStore();

  // 현재를 기준으로 예약시간이 지났는지 확인하는 함수
  const isReservationTimePassed = (
    reservationDate,
    reservationStartTime,
    reservationEndTime
  ) => {
    const now = new Date();
    const reservationStartDateTime = new Date(
      `${reservationDate}T${reservationStartTime}`
    );

    if (now < reservationStartDateTime) {
      console.log('예약시간 안됨: true');
      return true;
    } else {
      console.log('예약시간 지남: false');
      return false;
    }
  };

  // 주문 개수 변경하는 함수
  useEffect(() => {
    if (allMenus.length > 0) {
      const updatedMenuCounts = allMenus.map((menu) => {
        const menuInfo = Object.values(menu.menuInfo);
        return menuInfo.map((item) => ({
          menuCnt: item.menuCnt,
          menuTotalPrice: item.menuCnt * item.menuPrice,
        }));
      });
      setMenuCounts(updatedMenuCounts);
    }
  }, [allMenus]);

  const handleDecrease = (menuIndex, itemIndex) => {
    setMenuCounts((prevCounts) =>
      prevCounts.map((menu, index) =>
        index === menuIndex
          ? menu.map((item, idx) =>
              idx === itemIndex && item.menuCnt > 1
                ? {
                    ...item,
                    menuCnt: item.menuCnt - 1,
                    menuTotalPrice: (item.menuCnt - 1) * item.menuPrice,
                  }
                : item
            )
          : menu
      )
    );
  };

  const handleIncrease = (menuIndex, itemIndex) => {
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
  };

  const handleMenuViewButtonClick = () => {
    nav(`/customer/order/menu-select/${reservationUrl}`);
  };

  const handleOrderMainClick = () => {
    nav(`/customer/order/${reservationUrl}`);
  };
  const handleOrderSheetButtonClick = () => {
    nav(`/customer/order/order-sheet/${reservationUrl}`);
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
      } catch (error) {
        console.log('주문 실패:', error);
      }
    } else {
      console.log('stompClient is not initialized or not connected');
    }
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
              <div>
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
                                                itemIndex
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
                                                itemIndex
                                              )
                                            }
                                          >
                                            +
                                          </FoodInfoCountRightBtn>
                                        </FoodInfoCountDiv>
                                        <FoodPriceP>
                                          {menu.menuTotalPrice}원
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
                            총 {menus.participantTotalPrice || ''}원
                          </TotalPriceP>
                        </TotalPriceDiv>
                        <br />
                      </div>
                    ))}
              </div>
            </>
          ) : (
            <>
              <div>
                {allMenus &&
                  allMenus.map((menus, menuIndex) => (
                    <div key={menuIndex}>
                      <PeopleP>
                        {menus.reservationParticipantNickname || ''}
                      </PeopleP>
                      <LineDiv />
                      <div>
                        {menus.menuInfo ? ( // menus.menuInfo가 객체이므로 Object.values로 배열상태로 변경
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
                                            handleDecrease(menuIndex, itemIndex)
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
                                            handleIncrease(menuIndex, itemIndex)
                                          }
                                        >
                                          +
                                        </FoodInfoCountRightBtn>
                                      </FoodInfoCountDiv>
                                      <FoodPriceP>
                                        {menu.menuTotalPrice}원
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
                          총 {menus.participantTotalPrice || ''}원
                        </TotalPriceP>
                      </TotalPriceDiv>
                      <br />
                    </div>
                  ))}
              </div>
            </>
          )}
        </MenuDiv>
      </div>
      {isReservationTimePassed(
        allMenusInfo.reservationDate,
        allMenusInfo.reservationStartTime
      ) ? ( // 예약시간 전
        <>
          <ButtonWrapper>
            <WEButton
              size="medium"
              outlined="true"
              onClick={handleOrderMainClick}
            >
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
        </>
      ) : (
        // 예약시간 후

        <ButtonWrapper>
          <WEButton
            size="medium"
            outlined="true"
            onClick={handleMenuViewButtonClick}
          >
            장바구니 보기
          </WEButton>
          <WEButton
            size="medium"
            outlined="true"
            onClick={handleOrderSheetButtonClick}
          >
            결제하기
          </WEButton>
        </ButtonWrapper>
      )}
    </OrderContainer>
  );
};

export default OrderCartBox;
