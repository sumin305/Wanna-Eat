import { useState } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import {
  ButtonContainer,
  ButtonWrapper,
  CheckBox,
  CheckText,
} from './OrderMainBox.js';
import useOrderStore from 'stores/customer/useOrderStore.js';
import WECheck from '../../common/check/WECheck.jsx';

const OrderMainBox = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  const { allMenus, reservationTime } = useOrderStore();
  const [isPrepared, setIsPrepared] = useState(false);

  const data = {
    reservationDate: '2024-10-20',
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

  return (
    <>
      <div>주문 메인 박스</div>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 0 ? (
          <>
            <div>나의 메뉴 리스트</div>
          </>
        ) : (
          <>
            <div>전체 메뉴 리스트</div>
            <div>
              {allMenus.map((menus, index) => (
                <div key={index}>
                  <p>{menus.reservationParticipantNickname}</p>
                  <div>
                    {menus.menuInfo &&
                    Array.isArray(menus.menuInfo) &&
                    menus.menuInfo.length > 0 ? (
                      menus.menuInfo.map((menu, index) => (
                        <div key={index}>
                          <p>{menu.menuName}</p>
                        </div>
                      ))
                    ) : (
                      <p>메뉴 정보가 없습니다.</p>
                    )}
                  </div>
                  <p>{menus.participantTotalPrice}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {isReservationTimePassed(
        data.reservationDate,
        data.reservationStartTime
      ) ? (
        <ButtonContainer>
          <ButtonWrapper>
            <WEButton size="medium" outlined="true">
              사장님 호출
            </WEButton>
            <WEButton size="medium" outlined="true">
              추가 주문
            </WEButton>
          </ButtonWrapper>
          <WEButton>결제하기</WEButton>
        </ButtonContainer>
      ) : (
        <>
          <CheckBox>
            <WECheck
              isChecked={isPrepared}
              onClick={handleIsPreparedButtonClick}
            />
            <CheckText>예약 시간까지 준비해주세요</CheckText>
          </CheckBox>
          <ButtonWrapper>
            <WEButton size="medium">메뉴 보기</WEButton>
            <WEButton size="medium">주문하기</WEButton>
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

export default OrderMainBox;
