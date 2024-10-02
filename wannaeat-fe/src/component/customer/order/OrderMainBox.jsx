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
// import useOrderStore from 'stores/customer/useOrderStore.js';
import WECheck from '../../common/check/WECheck.jsx';
import theme from '../../../style/common/theme.js';
import { useNavigate } from 'react-router-dom';

const OrderMainBox = ({ reservationUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  //   const { allMenus, reservationTime } = useOrderStore();
  const [isPrepared, setIsPrepared] = useState(false);
  const nav = useNavigate();

  const data = {
    reservationDate: '2024-09-20',
    reservationStartTime: '13:00:00',
    reservationEndTime: '15:00:00',
    chatMessageListResponseDto: {
      chatMessageDetailResponseDtos: {
        content: [
          {
            reservationId: 1,
            senderReservationParticipantId: 2,
            senderReservationParticipantNickname: '심심한 소',
            content: '브랜치 변경',
            registerTime: '2024-10-01T19:33:25.009',
          },
          {
            reservationId: 1,
            senderReservationParticipantId: 2,
            senderReservationParticipantNickname: '심심한 소',
            content: '진짜 가는거지?',
            registerTime: '2024-10-01T19:24:07.595',
          },
          {
            reservationId: 1,
            senderReservationParticipantId: 2,
            senderReservationParticipantNickname: '심심한 소',
            content: 'ㅇㄹㄴㄹㅇㄴㅇㄴㄹ',
            registerTime: '2024-10-01T19:13:16.46',
          },
          {
            reservationId: 1,
            senderReservationParticipantId: 2,
            senderReservationParticipantNickname: '심심한 소',
            content: '가는거야?',
            registerTime: '2024-10-01T19:12:25.617',
          },
          {
            reservationId: 1,
            senderReservationParticipantId: 2,
            senderReservationParticipantNickname: '심심한 소',
            content: 'ㄴㅇㄹㅇㄹㄴㄹㅇㄴㅇㄴㄹ',
            registerTime: '2024-10-01T19:12:18.629',
          },
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 5,
          sort: {
            empty: true,
            unsorted: true,
            sorted: false,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        last: false,
        totalPages: 18,
        totalElements: 89,
        size: 5,
        number: 0,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        first: true,
        numberOfElements: 5,
        empty: false,
      },
    },
    cartDetailResponseDto: {
      reservationId: 1,
      cartElements: [
        {
          reservationParticipantId: 2,
          reservationParticipantNickname: '심심한 소',
          menuInfo: {
            3: {
              menuId: 3,
              menuName: 'ABC 초코',
              menuImage: 'ffd2cade-a659-445f-a0c4-67ce68e1f58e.png',
              menuPrice: 10,
              menuCnt: 3,
              menuTotalPrice: 30,
            },
          },
          participantTotalPrice: 30,
        },
        {
          reservationParticipantId: 1,
          reservationParticipantNickname: '익명의 너구리',
          menuInfo: {
            1: {
              menuId: 1,
              menuName: '개매운족발',
              menuImage: '47716e29-52a6-43ee-a1df-7f25e7a2baa4.jfif',
              menuPrice: 10000,
              menuCnt: 4,
              menuTotalPrice: 40000,
            },
            3: {
              menuId: 3,
              menuName: 'ABC 초코',
              menuImage: 'ffd2cade-a659-445f-a0c4-67ce68e1f58e.png',
              menuPrice: 10,
              menuCnt: 3,
              menuTotalPrice: 30,
            },
          },
          participantTotalPrice: 40030,
        },
      ],
      cartTotalPrice: 40060,
    },
  };

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

  const allMenus = data.cartDetailResponseDto.cartElements;
  const reservationParticipantId = 2;

  const handleMenuViewButtonClick = () => {
    nav(`/customer/menu-select/${reservationUrl}`);
  };

  const handleOrderSheetButtonClick = () => {
    nav(`/customer/order-sheet/${reservationUrl}`);
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
              <p>총:{data.cartDetailResponseDto.cartTotalPrice}</p>
            </div>
          </>
        )}
      </div>
      {isReservationTimePassed(
        data.reservationDate,
        data.reservationStartTime
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
