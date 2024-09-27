import styled from '@emotion/styled/macro';
import WEFooter from './layout/common/WEFooter/WEFooter.jsx';
import WEBlackOutLayout from './layout/common/WEBlackOutLayout/WEBlackOutLayout.jsx';
import WEModal from './component/common/modal/WEModal.jsx';
import AppRoutes from './route/routes.js';
import WEHeader from './layout/common/WEHeader/WEHeader.jsx';
import { useEffect } from 'react';
import useCommonStore from './stores/common/useCommonStore.js';
import { useLocation } from 'react-router-dom';
import { getRestaurantCategories } from 'api/customer/restaurant.js';
const Main = () => {
  const { setCategories } = useCommonStore();
  const location = useLocation();

  useEffect(() => {
    const getCategories = async () => {
      const response = await getRestaurantCategories();
      if (response.status === 200) {
        // setCategories(response.data.data.restaurantCategories);
        console.log(JSON.stringify(response.data.data.restaurantCategories));
        localStorage.setItem(
          'categories',
          JSON.stringify(response.data.data.restaurantCategories)
        );
      }
      console.log(localStorage.getItem('categories'));
      // setCategories(data.categories);
    };
    getCategories();
    setCategories(['고기', '족발', '찌개', '회', '돈까스']);
  }, []);

  // 헤더 렌더링할 조건
  const shouldRenderHeader = () => {
    return !['/', '/join', '/customer/reservation'].includes(location.pathname);
  };
  // 푸터 렌더링할 조건
  const shouldRenderFooter = () => {
    return !['/', '/join'].includes(location.pathname);
  };

  return (
    <div>
      <WEBlackOutLayout />
      <WEModal />
      <AppContainer>
        {shouldRenderHeader() && <WEHeader isCarrot={true} text="메인페이지" />}
        <AppRoutes />
        {shouldRenderFooter() && <WEFooter />}
      </AppContainer>
    </div>
  );
};

export default Main;

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
