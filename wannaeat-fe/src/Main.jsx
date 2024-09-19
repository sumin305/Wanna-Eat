import styled from '@emotion/styled/macro';
import WETabbar from './layout/common/WETabbar/WETabbar.jsx';
import useModalStore from './stores/common/modal/useModalStore.js';
import WEBlackOutLayout from './layout/common/WEBlackOutLayout/WEBlackOutLayout.jsx';
import WEModal from './component/common/modal/WEModal.jsx';
import AppRoutes from './route/routes.js';
import WEHeader from './layout/common/WEHeader/WEHeader.jsx';
const Main = () => {
  const { isModalVisible } = useModalStore();

  const AppContainer = styled.div`
    display: flex;
    flex-direction: column; /* 세로 방향 정렬 */
    align-items: center; /* 수평 가운데 정렬 */
    height: 100vh; /* 뷰포트 전체 높이를 채움 */
    box-sizing: border-box; /* 패딩이 height에 포함되도록 설정 */

    @media (min-width: 480px) {
      > * {
        justify-content: center;
      }
    }
  `;

  return (
    <div>
      {isModalVisible && <WEBlackOutLayout></WEBlackOutLayout>}
      {isModalVisible && <WEModal />}
      <AppContainer>
        <WEHeader isCarrot={true} text="메인페이지" />
        <AppRoutes />
        <WETabbar />
      </AppContainer>
    </div>
  );
};

export default Main;
