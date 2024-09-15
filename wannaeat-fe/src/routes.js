import { Route, Routes } from 'react-router-dom';
import useCommonStore from './stores/common/useCommonStore';
import styled from '@emotion/styled';

// 사업자 관련 페이지
import ManagerMainPage from './pages/manager/main/MainPage';
import AdminPage from './pages/manager/reservation/AdminPage';
import RestaurantViewPage from './pages/manager/restaurant/RestaurantViewPage';
import StatisticsPage from './pages/manager/statistics/StatisticsPage';

// 손님 관련 페이지
import CustomerMainPage from './pages/customer/main/MainPage';
import MapRestaurantPage from './pages/customer/map/MapStorePage';
import ListPage from './pages/customer/reservation/history/ListPage';
import MyInfoPage from './pages/customer/user/MyInfoPage';

// 비회원 관련 페이지
// import GuestEntryPage from './pages/customer/main/GuestEntryPage';

const AppRoutes = () => {
  const { isManager } = useCommonStore();

  const RouterContainer = styled.div`
    background-color: pink;
    height: 100%;
    width: 100%;
    @media (min-width: 480px) {
      width: 480px;
      justify-content: center;
    }
  `;

  return isManager ? (
    <RouterContainer>
      <Routes>
        <Route path="/" element={<ManagerMainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/restaurantview" element={<RestaurantViewPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </RouterContainer>
  ) : (
    <RouterContainer>
      <Routes>
        <Route path="/" element={<CustomerMainPage />} />
        <Route path="/map" element={<MapRestaurantPage />} />
        <Route path="/reservationlist" element={<ListPage />} />
        <Route path="/myinfo" element={<MyInfoPage />} />
      </Routes>
    </RouterContainer>
  );
};

export default AppRoutes;
