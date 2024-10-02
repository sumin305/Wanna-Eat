import { useState } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import {
  TopBox,
  OrderContainer,
  ButtonContainer,
  ButtonWrapper,
  CheckBox,
  CheckText,
} from './OrderMainBox.js';
import WECheck from '../../common/check/WECheck.jsx';
import theme from '../../../style/common/theme.js';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../../stores/customer/useOrderStore.js';

const OrderMainBox = ({ reservationUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  const { allMenusInfo } = useOrderStore();
  const [isPrepared, setIsPrepared] = useState(false);
  const nav = useNavigate();

  const reservationParticipantId = 4;
  const allMenus = allMenusInfo.cartDetailResponseDto.cartElements || [];

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
      console.log('예약시간 안됨: false');
      return false;
    } else {
      console.log('예약시간 지남: true');
      return true;
    }
  };

  const handleIsPreparedButtonClick = () => {
    setIsPrepared(!isPrepared);
  };

  const handleMenuViewButtonClick = () => {
    nav(`/customer/order/menu-select/${reservationUrl}`);
  };

  const handleOrderSheetButtonClick = () => {
    nav(`/customer/order/order-sheet/${reservationUrl}`);
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
            >
              비우기
            </WEButton>
          ) : null}
        </TopBox>
        {activeTab === 0 ? (
          <>
            <div>나의 메뉴 리스트</div>
            <div>
              {allMenus
                .filter(
                  (menus) =>
                    menus.reservationParticipantId === reservationParticipantId
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
              {allMenus.map((menus, index) => (
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
              <p>
                총:{allMenusInfo.cartDetailResponseDto.cartTotalPrice || ''}
              </p>
            </div>
          </>
        )}
      </div>
      {isReservationTimePassed(
        allMenusInfo.reservationDate,
        allMenusInfo.reservationStartTime
      ) ? (
        // 예약시간 후
        <ButtonContainer>
          <ButtonWrapper>
            <WEButton size="medium" outlined="true">
              사장님 호출
            </WEButton>
            <WEButton
              size="medium"
              outlined="true"
              onClick={handleMenuViewButtonClick}
            >
              추가 주문
            </WEButton>
          </ButtonWrapper>
          <WEButton onClick={handleOrderSheetButtonClick}>
            결제내역보기
          </WEButton>
        </ButtonContainer>
      ) : (
        // 예약시간 전
        <>
          <CheckBox>
            <WECheck
              isChecked={isPrepared}
              onClick={handleIsPreparedButtonClick}
            />
            <CheckText>예약 시간까지 준비해주세요</CheckText>
          </CheckBox>
          <ButtonWrapper>
            <WEButton size="medium" onClick={handleMenuViewButtonClick}>
              메뉴 보기
            </WEButton>
            <WEButton size="medium">주문하기</WEButton>
          </ButtonWrapper>
        </>
      )}
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </OrderContainer>
  );
};

export default OrderMainBox;
