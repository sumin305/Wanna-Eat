import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useOrderStore from 'stores/customer/useOrderStore';
import WETab from 'component/common/tab/WETab/WETab.jsx';

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
    <>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 0
          ? // 결제 전 주문
            Object.keys(groupedPendingOrders).map((nickname) => (
              <div key={nickname}>
                <p>{nickname}</p>
                {groupedPendingOrders[nickname].map((order, orderId) => (
                  <div key={orderId}>
                    {order.menuImage && (
                      <img src={order.menuImage} alt="메뉴 사진" />
                    )}
                    <p>메뉴 이름: {order.menuName}</p>
                    <p>결제할 수량: {order.totalCnt - order.paidCnt}</p>
                    <p>
                      총 금액:
                      {(order.totalCnt - order.paidCnt) * order.menuPrice}
                    </p>
                  </div>
                ))}
                <br />
              </div>
            ))
          : // 결제 완료 주문
            Object.keys(groupedCompleteOrders).map((nickname) => (
              <div key={nickname}>
                <p>{nickname}</p>
                {groupedCompleteOrders[nickname].map((order, orderId) => (
                  <div key={orderId}>
                    {order.menuImage && (
                      <img src={order.menuImage} alt="메뉴 사진" />
                    )}
                    <p>메뉴 이름: {order.menuName}</p>
                    <p>총 주문 수량: {order.totalCnt}</p>
                    <p>총 금액: {order.totalCnt * order.menuPrice}</p>
                  </div>
                ))}
                <br />
              </div>
            ))}
      </div>
      <WEButton onClick={clickGotoPay}>결제하기</WEButton>
    </>
  );
};

export default OrderSheetBox;
