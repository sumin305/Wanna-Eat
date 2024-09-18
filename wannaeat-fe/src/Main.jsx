import styled from '@emotion/styled/macro';
import WETabbar from './layout/common/WETabbar/WETabbar.jsx';
import useModalStore from './stores/common/modal/useModalStore.js';
import WEBlackOutLayout from './layout/common/WEBlackOutLayout/WEBlackOutLayout.jsx';
import WEModal from './component/common/modal/WEModal.jsx';
import AppRoutes from './route/routes.js';
import WEHeader from './layout/common/WEHeader/WEHeader.jsx';
import WETab from './component/common/tab/WETab/WETab.jsx';
import { useState } from 'react';

const Main = () => {
  const { isModalVisible } = useModalStore();

  const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
    max-width: 100vw;  /* 페이지의 최대 너비를 화면 너비로 고정 */
    overflow: hidden;  /* 페이지의 오버플로우 방지 */
  `;

  const tabs = ['전체', '메뉴 주문', '예약 신청', '예약 취소', '결제 완료'];
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = (activeTab) => {
    switch (activeTab) {
      case 0:
        return <div>전체 알림</div>;
      case 1:
        return <div>메뉴 주문 알림</div>;
      case 2:
        return <div>예약 신청 알림</div>;
      case 3:
        return <div>예약 취소 알림</div>;
      case 4:
        return <div>결제 완료 알림</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      {isModalVisible && <WEBlackOutLayout />}
      {isModalVisible && <WEModal />}
      <AppContainer>
        <WEHeader isCarrot={true} text="메인페이지" />
        <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent(activeTab)}
        <AppRoutes />
        <WETabbar />
      </AppContainer>
    </div>
  );
};

export default Main;
