import { useState } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { TopBox, OrderContainer, ButtonWrapper } from './OrderMainBox.js';
import theme from '../../../style/common/theme.js';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../../stores/customer/useOrderStore.js';
import useChatStore from '../../../stores/customer/useChatStore.js';

const OrderMainBox = ({ reservationUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  const { allOrdersInfo } = useOrderStore();
  const nav = useNavigate();

  const reservationParticipantId = 3; // 나의 메뉴에 해당하는 ID 설정
  const allOrders =
    allOrdersInfo?.orderListResponseDto?.orderDetailResponseDtos || [];

  const { stompClient, isConnected } = useChatStore();

  const handleGotoCartButtonClick = () => {
    nav(`/customer/order/cart/${reservationUrl}`);
  };

  const handleOrderSheetButtonClick = () => {
    nav(`/customer/order/order-sheet/${reservationUrl}`);
  };

  return (
    <>
      <OrderContainer>
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          <TopBox>
            <p>총 메뉴 {allOrders.length}개</p>
          </TopBox>
          {activeTab === 0 ? (
            // 나의 메뉴를 필터링하여 보여줌
            <div>
              {allOrders &&
                allOrders
                  .filter(
                    (orders) =>
                      orders.reservationParticipantId ===
                      reservationParticipantId
                  )
                  .map((orders, index) => (
                    <div key={index}>
                      <p>{orders.reservationParticipantNickname || ''}</p>
                      <div>
                        {orders.menuImage && (
                          <img src={orders.menuImage} alt={orders.menuName} />
                        )}
                        <p>{orders.menuName}</p>
                        <p>수량: {orders.paidCnt}</p>
                        <p>가격: {orders.menuPrice}</p>
                      </div>
                      <p>총 가격: {orders.totalCnt * orders.menuPrice}</p>
                      <br />
                    </div>
                  ))}
            </div>
          ) : (
            // 전체 메뉴를 보여줌
            <div>
              {allOrders &&
                allOrders.map((orders, index) => (
                  <div key={index}>
                    <p>{orders.reservationParticipantNickname || ''}</p>
                    <div>
                      {orders.menuImage && (
                        <img src={orders.menuImage} alt={orders.menuName} />
                      )}
                      <p>{orders.menuName}</p>
                      <p>수량: {orders.paidCnt}</p>
                      <p>가격: {orders.menuPrice}</p>
                    </div>
                    <p>총 가격: {orders.totalCnt * orders.menuPrice}</p>
                    <br />
                  </div>
                ))}
            </div>
          )}
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
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </OrderContainer>
    </>
  );
};

export default OrderMainBox;
