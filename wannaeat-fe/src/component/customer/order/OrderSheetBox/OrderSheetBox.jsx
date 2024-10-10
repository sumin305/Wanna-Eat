import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useOrderStore from 'stores/customer/useOrderStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import {
  TotalPriceText,
  MenuDiv,
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
  WETabContainer,
  PeopleP,
  TopBox,
  TotalMenuP,
  TotalPriceDiv,
  TotalPriceP,
  MenuNonPayDiv,
} from './OrderSheetBox.js';
import WECheck from '../../../common/check/WECheck.jsx';
import useAlert from 'utils/alert.js';
import MenuIcon from 'assets/icons/menu/basic-menu.svg';

const OrderSheetBox = ({ reservationUrl }) => {
  const nav = useNavigate();
  const showAlert = useAlert();

  const { allOrdersInfo, setPayOrders, setPayPrice } = useOrderStore();

  const [orderCounts, setOrderCounts] = useState({});
  const [allOrders, setAllOrders] = useState([]);

  const tabs = ['결제 전', '결제 완료'];
  const [activeTab, setActiveTab] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  // menuId, orderId, menuCount 정보를 넣을 빈 객체 생성
  // 결제 완료 상태
  const isComplete = activeTab === 1;
  // 결제 전/완료 주문의 닉네임 별 그룹화 + 총 금액
  const [
    groupedPendingOrdersWithTotalPrice,
    setGroupedPendingOrdersWithTotalPrice,
  ] = useState([]);

  const [
    groupedCompleteOrdersWithTotalPrice,
    setGroupedCompleteOrdersWithTotalPrice,
  ] = useState([]);

  const [totalPendingOrdersCount, setTotalPendingOrdersCount] = useState(0);
  const [totalCompletedOrdersCount, setTotalCompletedOrdersCount] = useState(0);

  useEffect(() => {
    // 모든 주문 데이터 가져오기 및 그룹화된 결제 전/후 주문 처리
    const ordersArray = Object.entries(allOrdersInfo).map(([key, value]) => ({
      reservationParticipantNickname: key,
      ...value,
    }));

    setAllOrders(ordersArray);

    const pendingGroup = groupByNicknameWithTotalPrice(
      ordersArray.filter((order) =>
        order.orders ? order.orders.some((o) => o.totalCnt - o.paidCnt > 0) : []
      )
    );

    const completedGroup = groupByNicknameWithTotalPrice(
      ordersArray.filter((order) =>
        order.orders ? order.orders.some((o) => o.totalCnt === o.paidCnt) : []
      )
    );

    // 결제 전 주문 그룹화
    setGroupedPendingOrdersWithTotalPrice(pendingGroup);

    // 결제 완료 주문 그룹화
    setGroupedCompleteOrdersWithTotalPrice(completedGroup);

    setTotalPendingOrdersCount(
      Object.values(pendingGroup).reduce((acc, user) => {
        // 각 user의 orders를 순회하면서 totalCnt - paidCnt 값을 누적
        const userPendingCount = user.orders.reduce((orderAcc, order) => {
          return orderAcc + (order.totalCnt - order.paidCnt);
        }, 0);

        // 모든 user의 결제 전 상품 수량을 누적
        return acc + userPendingCount;
      }, 0)
    );
    setTotalCompletedOrdersCount(
      Object.values(completedGroup).reduce((acc, user) => {
        // 각 user의 orders를 순회하면서 totalCnt - paidCnt 값을 누적
        const userCompletedCount = user.orders.reduce((orderAcc, order) => {
          return orderAcc + order.paidCnt;
        }, 0);

        // 모든 user의 결제 전 상품 수량을 누적
        return acc + userCompletedCount;
      }, 0)
    );
  }, [allOrdersInfo]);

  // 닉네임 별로 주문 그룹화하고 총 금액 계산하는 함수
  const groupByNicknameWithTotalPrice = (orders) => {
    return orders.reduce((acc, order) => {
      const nickname = order.reservationParticipantNickname;
      const totalPriceForOrder = order.orders
        ? order.orders.reduce((acc, o) => {
            const cnt = isComplete ? o.totalCnt : o.totalCnt - o.paidCnt;
            return acc + cnt * o.menuPrice;
          }, 0)
        : 0;

      if (!acc[nickname]) {
        acc[nickname] = { orders: [], totalPrice: 0 };
      }

      acc[nickname].orders.push(...order.orders);
      acc[nickname].totalPrice += totalPriceForOrder;

      return acc;
    }, {});
  };

  // 수량 증가 함수
  const handleIncrease = (menuPrice, orderId, menuId, availableCount) => {
    setOrderCounts((prev) => {
      const currentCount = prev[orderId]?.count || 0;

      // 추가 가능 여부 체크
      if (currentCount < availableCount) {
        return {
          ...prev,
          [orderId]: {
            ...prev[orderId],
            count: currentCount + 1,
            menuId: menuId,
            orderId: orderId,
            menuPrice: menuPrice,
          },
        };
      } else {
        showAlert('더 이상 추가할 수 없습니다.');
        return prev; // 값이 변경되지 않도록 이전 상태 반환
      }
    });
  };

  // 수량 감소 함수
  const handleDecrease = (menuPrice, orderId, menuId) => {
    setOrderCounts((prev) => {
      const currentCount = prev[orderId]?.count || 0;

      // 수량 감소 가능 여부 체크
      if (currentCount > 0) {
        return {
          ...prev,
          [orderId]: {
            ...prev[orderId],
            count: currentCount - 1,
            menuId: menuId,
            orderId: orderId,
            menuPrice: menuPrice,
          },
        };
      } else {
        showAlert('수량은 0보다 작을 수 없습니다.');
        return prev; // 값이 변경되지 않도록 이전 상태 반환
      }
    });
  };

  // 총 금액 계산 함수
  const calculateTotalPriceForGroup = (group) => {
    return Object.keys(group).reduce((acc, nickname) => {
      const orders = group[nickname].orders;
      const totalPrice = orders.reduce((acc, order) => {
        const count = isComplete
          ? order.totalCnt
          : orderCounts[order.orderId]?.count || order.totalCnt - order.paidCnt;
        return acc + count * order.menuPrice;
      }, 0);
      return acc + totalPrice;
    }, 0);
  };

  // 총 가격 합계 계산 함수
  const calculateTotalPriceForOrdersToSend = (orders) => {
    return orders.reduce((totalPrice, order) => {
      return totalPrice + order.count * order.menuPrice;
    }, 0);
  };

  // 결제하기 버튼 클릭 핸들러
  const clickGotoPay = () => {
    const ordersToSend = Object.values(orderCounts).filter(
      (order) => order.count > 0
    );
    console.log('결제할 주문 정보:', ordersToSend);
    setPayOrders(ordersToSend);
    console.log(
      calculateTotalPriceForOrdersToSend(
        Object.values(orderCounts).filter((order) => order.count > 0)
      )
    );

    if (calculateTotalPriceForOrdersToSend(ordersToSend) === 0) {
      showAlert('결제할 메뉴를 선택해주세요');
      return;
    }
    setPayPrice(calculateTotalPriceForOrdersToSend(ordersToSend));
    nav(`/customer/order/pay/${reservationUrl}`);
  };

  // 전체 선택 버튼 클릭 시, 각 주문의 paidCnt 값만큼 수량을 채우기
  const handleAllCheckButtonClick = () => {
    if (!isChecked) {
      // 전체 선택이 체크되었을 때
      const updatedOrderCounts = {};

      // 모든 주문을 순회하여 paidCnt만큼 count를 채움
      allOrders.forEach((order) => {
        if (order.orders) {
          order.orders.forEach((item) => {
            const availableCount = item.totalCnt - item.paidCnt;
            if (availableCount > 0) {
              updatedOrderCounts[item.orderId] = {
                count: availableCount, // paidCnt 값만큼 채우기
                menuId: item.menuId,
                orderId: item.orderId,
                menuPrice: item.menuPrice,
              };
            }
          });
        }
      });

      setOrderCounts(updatedOrderCounts);
    } else {
      // 전체 선택 해제 시 초기화
      setOrderCounts({});
    }

    setIsChecked(!isChecked);
  };

  return (
    <OrderContainer>
      <WETabContainer>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </WETabContainer>
      <div>
        <TopBox>
          <MenuContainer>
            <TotalMenuP>
              총 메뉴{' '}
              {activeTab === 0
                ? totalPendingOrdersCount
                : totalCompletedOrdersCount}
              개
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
                            <MenuImg
                              src={order.menuImage ? order.menuImage : MenuIcon}
                              alt="메뉴 사진"
                            />
                            <FoodInfoDiv>
                              <FoodInfoTopDiv>
                                <MenuNameP>{order.menuName}</MenuNameP>
                                <MenuNonPayDiv>
                                  <MenuNameP>미결제 수량</MenuNameP>
                                  <FoodInfoCountP>
                                    {order.totalCnt -
                                      order.paidCnt -
                                      (orderCounts[order.orderId]?.count || 0)}
                                  </FoodInfoCountP>
                                </MenuNonPayDiv>
                              </FoodInfoTopDiv>
                              <FoodInfoBottomDiv>
                                <FoodInfoCountDiv>
                                  {/* 수량 변경 버튼 중간의 숫자는 변경될 수 있도록 설정 */}
                                  <FoodInfoCountLeftBtn
                                    onClick={() =>
                                      handleDecrease(
                                        order.menuPrice,
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
                                        order.menuPrice,
                                        order.orderId,
                                        order.menuId,
                                        order.totalCnt - order.paidCnt
                                      )
                                    }
                                  >
                                    +
                                  </FoodInfoCountRightBtn>
                                </FoodInfoCountDiv>
                                <FoodPriceP>
                                  {(orderCounts[order.orderId]?.count > 0
                                    ? orderCounts[order.orderId]?.count *
                                      order.menuPrice
                                    : 0
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
                        {groupedPendingOrdersWithTotalPrice[nickname].orders
                          .reduce((acc, order) => {
                            return (
                              acc +
                              Number(
                                orderCounts[order.orderId]?.count > 0
                                  ? orderCounts[order.orderId]?.count *
                                      order.menuPrice
                                  : 0
                              )
                            );
                          }, 0)
                          .toLocaleString('ko-KR')}{' '}
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
                    {groupedCompleteOrdersWithTotalPrice[nickname].orders ? (
                      groupedCompleteOrdersWithTotalPrice[nickname].orders.map(
                        (order) => (
                          <div key={order.orderId}>
                            <FoodDiv>
                              <MenuImg
                                src={
                                  order.menuImage ? order.menuImage : MenuIcon
                                }
                                alt="메뉴 사진"
                              />
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
                      )
                    ) : (
                      <div>없음</div>
                    )}
                    <TotalPriceDiv>
                      <TotalPriceP>
                        총:{' '}
                        {groupedCompleteOrdersWithTotalPrice[nickname]
                          .totalPrice
                          ? groupedCompleteOrdersWithTotalPrice[
                              nickname
                            ].totalPrice.toLocaleString('ko-KR')
                          : 0}{' '}
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
            결제 금액 ₩{' '}
            {calculateTotalPriceForOrdersToSend(
              Object.values(orderCounts).filter((order) => order.count > 0)
            ).toLocaleString('ko-KR')}
          </TotalPriceText>
        </TotalPriceDiv>
      </div>
      <WEButton onClick={clickGotoPay}>결제하기</WEButton>
    </OrderContainer>
  );
};

export default OrderSheetBox;
