import { useState } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import {
  TopBox,
  OrderContainer,
  // ButtonContainer,
  ButtonWrapper,
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

  const handleMenuViewButtonClick = () => {
    nav(`/customer/order/menu-select/${reservationUrl}`);
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

  const clickGotoMenuSelect = () => {
    nav(`/customer/order/menu-select/${reservationUrl}`);
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
          <p>총 메뉴 {}개</p>
          {activeTab === 0 ? (
            <WEButton
              width="14%"
              height="5%"
              outlined="true"
              color={theme.color.disabled}
              borderColor={theme.color.disabled}
              fontSize={theme.fontSize.px11}
              onClick={() => handleMenuDeleteButtonClick(reservationUrl)}
            >
              비우기
            </WEButton>
          ) : null}
        </TopBox>
        {activeTab === 0 ? (
          <>
            <div>나의 메뉴 리스트</div>
            <div>
              {allMenus &&
                allMenus
                  .filter(
                    (menus) =>
                      menus.reservationParticipantId ===
                      reservationParticipantId
                  )
                  .map((menus, index) => (
                    <div key={index}>
                      <p>{menus.reservationParticipantNickname || ''}</p>
                      <div>
                        {menus.menuInfo ? (
                          Object.values(menus.menuInfo).map((menu, index) => (
                            <div key={index}>
                              <p>{menu.menuImage}</p>
                              <p>{menu.menuName}</p>
                              <p>{menu.menuCnt}</p>
                              <p>{menu.menuTotalPrice}</p>
                            </div>
                          ))
                        ) : (
                          <p>메뉴 정보가 없습니다.</p>
                        )}
                      </div>
                      <p>총:{menus.participantTotalPrice || ''}</p>
                      <br />
                    </div>
                  ))}
            </div>
          </>
        ) : (
          <>
            <div>전체 메뉴 리스트</div>
            <div>
              {allMenus &&
                allMenus.map((menus, index) => (
                  <div key={index}>
                    <p>{menus.reservationParticipantNickname || ''}</p>
                    <div>
                      {menus.menuInfo ? ( // menus.menuInfo가 객체이므로 Object.values로 배열상태로 변경
                        Object.values(menus.menuInfo).map((menu, index) => (
                          <div key={index}>
                            <p>{menu.menuImage}</p>
                            <p>{menu.menuName}</p>
                            <p>{menu.menuCnt}</p>
                            <p>{menu.menuTotalPrice}</p>
                          </div>
                        ))
                      ) : (
                        <p>메뉴 정보가 없습니다.</p>
                      )}
                    </div>
                    <p>총:{menus.participantTotalPrice || ''}</p>
                    <br />
                  </div>
                ))}
              {allMenusInfo?.cartDetailResponseDto ? (
                <p>
                  총:{allMenusInfo.cartDetailResponseDto.cartTotalPrice || ''}
                </p>
              ) : null}
            </div>
          </>
        )}
      </div>
      {isReservationTimePassed(
        allMenusInfo.reservationDate,
        allMenusInfo.reservationStartTime
      ) ? (
        // 예약시간 전
        <>
          <ButtonWrapper>
            <WEButton
              size="medium"
              outlined="true"
              onClick={handleOrderSheetButtonClick}
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
          <WEButton onClick={handleOrderSheetButtonClick}>결제하기</WEButton>
        </ButtonWrapper>
      )}
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </OrderContainer>
  );
};

export default OrderCartBox;
