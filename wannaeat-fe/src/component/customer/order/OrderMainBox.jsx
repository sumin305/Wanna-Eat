import { useState } from 'react';
import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { ButtonContainer, ButtonWrapper } from './OrderMainBox.js';
import useOrderStore from 'stores/customer/useOrderStore.js';

const OrderMainBox = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['나의 메뉴', '전체 메뉴'];
  const { allMenus } = useOrderStore();

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
    </>
  );
};

export default OrderMainBox;
