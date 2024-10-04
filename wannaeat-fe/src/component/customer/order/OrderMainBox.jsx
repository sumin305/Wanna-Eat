import { useState } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { TopBox, OrderContainer, ButtonWrapper } from './OrderMainBox.js';
import theme from '../../../style/common/theme.js';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../../stores/customer/useOrderStore.js';
import useChatStore from '../../../stores/customer/useChatStore.js';
import {
  FoodDiv,
  FoodInfoBottomDiv,
  FoodInfoCountDiv,
  FoodInfoCountP,
  FoodInfoDiv,
  FoodInfoTopDiv,
  FoodPriceP,
  LineDiv,
  MenuContainer,
  MenuDiv,
  MenuImg,
  MenuNameP,
  PeopleP,
  TotalMenuP,
  TotalPriceDiv,
  TotalPriceP,
} from './OrderCartBox.js';

const OrderMainBox = ({ reservationUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  const { allOrdersInfo } = useOrderStore();
  const nav = useNavigate();

  const reservationParticipantId = 1; // 나의 메뉴에 해당하는 ID 설정
  const allOrders =
    allOrdersInfo?.orderListResponseDto?.orderDetailResponseDtos || [];

  const { stompClient, isConnected } = useChatStore();

  const handleGotoCartButtonClick = () => {
    nav(`/customer/order/cart/${reservationUrl}`);
  };

  const handleOrderSheetButtonClick = () => {
    nav(`/customer/order/order-sheet/${reservationUrl}`);
  };

  // 닉네임 별로 그룹화 하는 함수
  const groupByNickname = (orders) => {
    return orders.reduce((acc, order) => {
      const nickname = order.reservationParticipantNickname;
      if (!acc[nickname]) {
        acc[nickname] = [];
      }
      acc[nickname].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupByNickname(allOrders);

  // totalCnt를 계산하는 함수
  const calculateTotalCnt = (orders) => {
    return orders.reduce((acc, order) => acc + order.totalCnt, 0);
  };

  // 나의 메뉴만 필터링
  const myOrders = allOrders.filter(
    (order) => order.reservationParticipantId === reservationParticipantId
  );

  // 나의 메뉴의 totalCnt
  const myTotalCnt = calculateTotalCnt(myOrders);
  // 전체 메뉴의 totalCnt
  const allTotalCnt = calculateTotalCnt(allOrders);

  return (
    <>
      <OrderContainer>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <TopBox>
            <MenuContainer>
              <TotalMenuP>
                총 메뉴 {activeTab === 0 ? myTotalCnt : allTotalCnt}개
              </TotalMenuP>
            </MenuContainer>
          </TopBox>
          <MenuDiv>
            {activeTab === 0 ? (
              // 나의 메뉴
              <div>
                {myOrders.length > 0 && (
                  <div>
                    <PeopleP>
                      {myOrders[0].reservationParticipantNickname || ''}
                    </PeopleP>
                    <LineDiv />
                    {myOrders.map((order, index) => (
                      <div key={index}>
                        <FoodDiv>
                          {order.menuImage && (
                            <MenuImg src={order.menuImage} alt="메뉴사진" />
                          )}
                          <FoodInfoDiv>
                            <FoodInfoTopDiv>
                              <MenuNameP>{order.menuName}</MenuNameP>
                            </FoodInfoTopDiv>
                            <FoodInfoBottomDiv>
                              <FoodInfoCountDiv>
                                <PeopleP>총 주문:</PeopleP>
                                <FoodInfoCountP>
                                  {order.totalCnt}
                                </FoodInfoCountP>
                                <PeopleP>미결제 수량:</PeopleP>
                                <FoodInfoCountP>
                                  {order.totalCnt - order.paidCnt}
                                </FoodInfoCountP>
                              </FoodInfoCountDiv>

                              <FoodPriceP>가격: {order.menuPrice}</FoodPriceP>
                            </FoodInfoBottomDiv>
                          </FoodInfoDiv>
                        </FoodDiv>
                        <LineDiv />
                        <TotalPriceDiv>
                          <TotalPriceP>
                            총 가격: {order.totalCnt * order.menuPrice}
                          </TotalPriceP>
                        </TotalPriceDiv>
                        <br />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // 전체 메뉴
              Object.entries(groupedOrders).map(([nickname, orders]) => (
                <div key={nickname}>
                  <PeopleP>{nickname}</PeopleP>
                  <LineDiv />
                  {orders.map((order, index) => (
                    <div key={index}>
                      <FoodDiv>
                        <MenuImg src={order.menuImage} alt={order.menuName} />
                        <FoodInfoDiv>
                          <FoodInfoTopDiv>
                            <MenuNameP>{order.menuName}</MenuNameP>
                          </FoodInfoTopDiv>
                          <FoodInfoBottomDiv>
                            <FoodInfoCountDiv>
                              <PeopleP>총 주문:</PeopleP>
                              <FoodInfoCountP>{order.totalCnt}</FoodInfoCountP>
                              <PeopleP>미결제 수량:</PeopleP>
                              <FoodInfoCountP>
                                {order.totalCnt - order.paidCnt}
                              </FoodInfoCountP>
                            </FoodInfoCountDiv>

                            <FoodPriceP>
                              {order.totalCnt * order.menuPrice}
                            </FoodPriceP>
                          </FoodInfoBottomDiv>
                        </FoodInfoDiv>
                      </FoodDiv>
                      <LineDiv />
                    </div>
                  ))}
                  <br />
                </div>
              ))
            )}
          </MenuDiv>
        </div>

        <ButtonWrapper>
          <WEButton
            size="medium"
            outlined="true"
            onClick={handleGotoCartButtonClick}
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
      </OrderContainer>
    </>
  );
};

export default OrderMainBox;
