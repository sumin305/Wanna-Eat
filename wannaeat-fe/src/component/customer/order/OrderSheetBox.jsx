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
  MenuImg,
  MenuNameP,
  OrderContainer,
  PeopleP,
  TopBox,
  TotalMenuP,
  TotalPriceDiv,
  TotalPriceP,
} from './OrderCartBox';
import { TotalPriceText, MenuDiv } from './OrderSheetBox.js';
import WECheck from '../../common/check/WECheck.jsx';

const OrderSheetBox = ({ reservationUrl }) => {
  const nav = useNavigate();
  const { allOrdersInfo } = useOrderStore();
  const allOrders =
    allOrdersInfo?.orderListResponseDto?.orderDetailResponseDtos || [];

  const tabs = ['결제 전', '결제 완료'];
  const [activeTab, setActiveTab] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  // menuId, orderId, menuCount 정보를 넣을 빈 객체 생성
  const [orderCounts, setOrderCounts] = useState({});
  // 결제 완료 상태
  const isComplete = activeTab === 1;

  // 닉네임 별로 그룹화, 총 금액을 계산하는 함수
  const groupByNicknameWithTotalPrice = (orders) => {
    return orders.reduce((acc, order) => {
      const nickname = order.reservationParticipantNickname;
      const totalPriceForOrder = isComplete
        ? order.totalCnt * order.menuPrice
        : (order.totalCnt - order.paidCnt) * order.menuPrice;

      if (!acc[nickname]) {
        acc[nickname] = {
          orders: [],
          totalPrice: 0,
        };
      }

      acc[nickname].orders.push(order);
      acc[nickname].totalPrice += totalPriceForOrder; // 닉네임 별 총 금액 계산

      return acc;
    }, {});
  };

  // 결제 전/완료 주문의 닉네임 별 그룹화 + 총 금액
  const groupedPendingOrdersWithTotalPrice = groupByNicknameWithTotalPrice(
    allOrders.filter((order) => order.totalCnt - order.paidCnt > 0)
  );
  const groupedCompleteOrdersWithTotalPrice = groupByNicknameWithTotalPrice(
    allOrders.filter((order) => order.totalCnt - order.paidCnt === 0)
  );

  // 수량 증가 함수
  const handleIncrease = (orderId, menuId) => {
    setOrderCounts((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        count: (prev[orderId]?.count || 0) + 1,
        menuId: menuId,
        orderId: orderId,
      },
    }));
  };

  // 수량 감소 함수
  const handleDecrease = (orderId, menuId) => {
    setOrderCounts((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        count: (prev[orderId]?.count || 0) - 1,
        menuId: menuId,
        orderId: orderId,
      },
    }));
  };

  // 총 금액 계산
  const calculateTotalPriceForGroup = (group) => {
    return Object.keys(group).reduce((acc, nickname) => {
      const orders = group[nickname].orders;
      const totalPrice = orders.reduce((acc, order) => {
        const count =
          activeTab === 1
            ? order.totalCnt || 0
            : orderCounts[order.orderId]?.count ||
              order.totalCnt - order.paidCnt;
        return acc + count * order.menuPrice;
      }, 0);
      return acc + totalPrice;
    }, 0);
  };

  const clickGotoPay = () => {
    // 수량이 0보다 큰 객체만 필터링
    const ordersToSend = Object.values(orderCounts).filter(
      (order) => order.count > 0
    );
    console.log('결제할 주문 정보:', ordersToSend);
    nav(`/customer/pay/${reservationUrl}`);
  };

  useEffect(() => {
    console.log('모든 주문 내용', allOrdersInfo);
    console.log('수량 증가 버튼 클릭', orderCounts);
  }, [orderCounts]);

  const handleAllCheckButtonClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <OrderContainer>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <TopBox>
          <MenuContainer>
            <TotalMenuP>
              총 메뉴 {Object.keys(groupedPendingOrdersWithTotalPrice).length}개
            </TotalMenuP>
            <DeleteDiv>
              {activeTab === 0 ? (
                <>
                  <WECheck
                    onClick={handleAllCheckButtonClick}
                    isChecked={isChecked}
                  />
                  <CheckText>전체선택</CheckText>
                </>
              ) : null}
            </DeleteDiv>
          </MenuContainer>
        </TopBox>
        <MenuDiv>
          {activeTab === 0
            ? Object.keys(groupedPendingOrdersWithTotalPrice).map(
                (nickname) => (
                  <div key={nickname}>
                    <PeopleP>{nickname}</PeopleP>
                    <LineDiv />
                    {groupedPendingOrdersWithTotalPrice[nickname].orders.map(
                      (order) => (
                        <div key={order.orderId}>
                          <FoodDiv>
                            {order.menuImage && (
                              <MenuImg src={order.menuImage} alt="메뉴 사진" />
                            )}
                            <FoodInfoDiv>
                              <FoodInfoTopDiv>
                                <MenuNameP>{order.menuName}</MenuNameP>
                                <FoodInfoCountP>
                                  {order.totalCnt -
                                    order.paidCnt -
                                    (orderCounts[order.orderId]?.count || 0)}
                                </FoodInfoCountP>
                              </FoodInfoTopDiv>
                              <FoodInfoBottomDiv>
                                <FoodInfoCountDiv>
                                  {/* 수량 변경 버튼 중간의 숫자는 변경될 수 있도록 설정 */}
                                  <FoodInfoCountLeftBtn
                                    onClick={() =>
                                      handleDecrease(
                                        order.orderId,
                                        order.menuId
                                      )
                                    }
                                  >
                                    -
                                  </FoodInfoCountLeftBtn>
                                  <FoodInfoCountP>
                                    {orderCounts[order.orderId]?.count || 0}{' '}
                                    {/* 초기값은 0, 버튼 클릭 시 변경 */}
                                  </FoodInfoCountP>
                                  <FoodInfoCountRightBtn
                                    onClick={() =>
                                      handleIncrease(
                                        order.orderId,
                                        order.menuId
                                      )
                                    }
                                  >
                                    +
                                  </FoodInfoCountRightBtn>
                                </FoodInfoCountDiv>
                                <FoodPriceP>
                                  {(
                                    (orderCounts[order.orderId]?.count ||
                                      order.totalCnt - order.paidCnt) *
                                    order.menuPrice
                                  ).toLocaleString('ko-KR')}{' '}
                                  원
                                </FoodPriceP>
                              </FoodInfoBottomDiv>
                            </FoodInfoDiv>
                          </FoodDiv>
                          <LineDiv />
                        </div>
                      )
                    )}
                    <TotalPriceDiv>
                      <TotalPriceP>
                        총 :{' '}
                        {groupedPendingOrdersWithTotalPrice[
                          nickname
                        ].totalPrice.toLocaleString('ko-KR')}{' '}
                        원
                      </TotalPriceP>
                    </TotalPriceDiv>
                    <br />
                  </div>
                )
              )
            : Object.keys(groupedCompleteOrdersWithTotalPrice).map(
                (nickname) => (
                  <div key={nickname}>
                    <PeopleP>{nickname}</PeopleP>
                    <LineDiv />
                    {groupedCompleteOrdersWithTotalPrice[nickname].orders.map(
                      (order) => (
                        <div key={order.orderId}>
                          <FoodDiv>
                            {order.menuImage && (
                              <MenuImg src={order.menuImage} alt="메뉴 사진" />
                            )}
                            <FoodInfoDiv>
                              <FoodInfoTopDiv>
                                <MenuNameP>{order.menuName}</MenuNameP>
                              </FoodInfoTopDiv>
                              <FoodInfoBottomDiv>
                                <FoodInfoCountP>
                                  {order.totalCnt}
                                </FoodInfoCountP>
                                <FoodPriceP>
                                  {(
                                    order.totalCnt * order.menuPrice
                                  ).toLocaleString('ko-KR')}{' '}
                                  원
                                </FoodPriceP>
                              </FoodInfoBottomDiv>
                            </FoodInfoDiv>
                          </FoodDiv>
                          <LineDiv />
                        </div>
                      )
                    )}
                    <TotalPriceDiv>
                      <TotalPriceP>
                        총:{' '}
                        {groupedCompleteOrdersWithTotalPrice[
                          nickname
                        ].totalPrice.toLocaleString('ko-KR')}{' '}
                        원
                      </TotalPriceP>
                    </TotalPriceDiv>
                    <br />
                  </div>
                )
              )}
        </MenuDiv>
        <TotalPriceDiv>
          <TotalPriceText>
            ₩{' '}
            {calculateTotalPriceForGroup(
              activeTab === 0
                ? groupedPendingOrdersWithTotalPrice
                : groupedCompleteOrdersWithTotalPrice
            ).toLocaleString('ko-KR')}
          </TotalPriceText>
        </TotalPriceDiv>
      </div>
      <WEButton onClick={clickGotoPay}>결제하기</WEButton>
    </OrderContainer>
  );
};

export default OrderSheetBox;
