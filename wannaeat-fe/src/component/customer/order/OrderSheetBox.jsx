import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useOrderStore from 'stores/customer/useOrderStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import {
  CheckText,
  DeleteDiv,
  FoodDiv,
  FoodInfoBottomDiv,
  FoodInfoCountDiv,
  FoodInfoCountLeftBtn,
  FoodInfoCountP,
  FoodInfoCountRightBtn,
  FoodInfoDiv,
  FoodInfoTopDiv,
  FoodPriceP,
  LineDiv,
  MenuContainer,
  MenuDiv,
  MenuImg,
  MenuNameP,
  OrderContainer,
  PeopleP,
  TopBox,
  TotalMenuP,
  TotalPriceDiv,
  TotalPriceP,
} from './OrderCartBox';
import WECheck from '../../common/check/WECheck.jsx';

const OrderSheetBox = ({ reservationUrl }) => {
  const nav = useNavigate();
  const { allOrdersInfo } = useOrderStore();
  const allOrders =
    allOrdersInfo?.orderListResponseDto?.orderDetailResponseDtos || [];

  const tabs = ['결제 전', '결제 완료'];
  const [activeTab, setActiveTab] = useState(0);

  // 결제완료 주문
  const completeOrders = allOrders.filter(
    (order) => order.totalCnt - order.paidCnt === 0
  );
  // 결제 전 주문
  const pendingOrders = allOrders.filter(
    (order) => order.totalCnt - order.paidCnt > 0
  );
  console.log('결제 전 주문', pendingOrders);
  console.log('결제 완료 주문', completeOrders);

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

  // 닉네임으로 그룹화 한 결제 전 주문
  const groupedPendingOrders = groupByNickname(pendingOrders);
  // 닉네임으로 그룹화 한 결제 완료 주문
  const groupedCompleteOrders = groupByNickname(completeOrders);

  const clickGotoPay = () => {
    nav(`/customer/pay/${reservationUrl}`);
  };

  useEffect(() => {
    console.log('모든 주문 내용', allOrdersInfo);
  }, []);

  return (
    <OrderContainer>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <TopBox>
          <MenuContainer>
            <TotalMenuP>총 메뉴 {}개</TotalMenuP>
            <DeleteDiv>
              {activeTab === 0 ? (
                <>
                  <WECheck />
                  <CheckText>전체선택</CheckText>
                </>
              ) : null}
            </DeleteDiv>
          </MenuContainer>
        </TopBox>
        <MenuDiv>
          {activeTab === 0
            ? // 결제 전 주문
              Object.keys(groupedPendingOrders).map((nickname) => (
                <div key={nickname}>
                  <PeopleP>{nickname}</PeopleP>
                  <LineDiv />
                  {groupedPendingOrders[nickname].map((order, orderId) => (
                    <div key={orderId}>
                      <FoodDiv>
                        {order.menuImage && (
                          <MenuImg src={order.menuImage} alt="메뉴 사진" />
                        )}
                        <FoodInfoDiv>
                          <FoodInfoTopDiv>
                            <MenuNameP>{order.menuName}</MenuNameP>
                          </FoodInfoTopDiv>
                          <FoodInfoBottomDiv>
                            <FoodInfoCountDiv>
                              <FoodInfoCountLeftBtn
                              //   onClick={() =>
                              //     handleDecrease(
                              //       menuIndex,
                              //       itemIndex,
                              //       menu.menuId,
                              //       reservationParticipantId
                              //     )
                              //   }
                              //   disabled={menu.menuCnt <= 0}
                              >
                                -
                              </FoodInfoCountLeftBtn>
                              <FoodInfoCountP>
                                {order.totalCnt - order.paidCnt}
                              </FoodInfoCountP>
                              <FoodInfoCountRightBtn
                              //   onClick={() =>
                              //     handleIncrease(
                              //       menuIndex,
                              //       itemIndex,
                              //       menu.menuId,
                              //       reservationParticipantId
                              //     )
                              //   }
                              >
                                +
                              </FoodInfoCountRightBtn>
                            </FoodInfoCountDiv>
                            <FoodPriceP>
                              {(order.totalCnt - order.paidCnt) *
                                order.menuPrice}
                            </FoodPriceP>
                          </FoodInfoBottomDiv>
                        </FoodInfoDiv>
                      </FoodDiv>
                    </div>
                  ))}
                </div>
              ))
            : // 결제 완료 주문
              Object.keys(groupedCompleteOrders).map((nickname) => (
                <div key={nickname}>
                  <PeopleP>{nickname}</PeopleP>
                  <LineDiv />
                  {groupedCompleteOrders[nickname].map((order, orderId) => (
                    <div key={orderId}>
                      <FoodDiv>
                        {order.menuImage && (
                          <MenuImg src={order.menuImage} alt="메뉴 사진" />
                        )}
                        <FoodInfoDiv>
                          <FoodInfoTopDiv>
                            <MenuNameP>{order.menuName}</MenuNameP>
                          </FoodInfoTopDiv>
                          <FoodInfoBottomDiv>
                            <FoodInfoCountDiv>
                              <FoodInfoCountP>{order.totalCnt}</FoodInfoCountP>
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
                  <TotalPriceDiv>
                    <TotalPriceP>
                      {/* 총 {calculateTotalPrice(menuIndex) || ''}원 */}
                    </TotalPriceP>
                  </TotalPriceDiv>
                  <br />
                </div>
              ))}
          <TotalPriceDiv>
            {/* {menuCounts.length > 0 ? (
              <TotalPriceP>총: {calculateTotalMenuPrice()}원</TotalPriceP>
            ) : null} */}
          </TotalPriceDiv>
        </MenuDiv>
      </div>
      <WEButton onClick={clickGotoPay}>결제하기</WEButton>
    </OrderContainer>
  );
};

export default OrderSheetBox;
