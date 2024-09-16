import { Route, Routes } from 'react-router-dom';
import useCommonStore from '../stores/common/useCommonStore';
import Layout from '../layout/common/Layout';

// 사업자 관련 페이지
import ManagerMainPage from '../pages/manager/main/MainPage';
import AdminPage from '../pages/manager/reservation/AdminPage';
import RestaurantViewPage from '../pages/manager/restaurant/RestaurantViewPage';
import StatisticsPage from '../pages/manager/statistics/StatisticsPage';

// 손님 관련 페이지
import CustomerMainPage from '../pages/customer/main/MainPage';
import MapRestaurantPage from '../pages/customer/map/MapStorePage';
import ListPage from '../pages/customer/reservation/history/ListPage';
import MyInfoPage from '../pages/customer/user/MyInfoPage';
import TimeSelectPage from '../pages/customer/reservation/process/TimeSelectPage';

// 비회원 관련 페이지
// import GuestEntryPage from './pages/customer/main/GuestEntryPage';

const AppRoutes = () => {
  const { isManager } = useCommonStore();
  return isManager ? (
    <Layout>
      <Routes>
        <Route path="/" element={<ManagerMainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/restaurantview" element={<RestaurantViewPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </Layout>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<CustomerMainPage />} />
        <Route path="/reservation" element={<MapRestaurantPage />} />
        <Route path="/reservation/time-select" element={<TimeSelectPage />} />
        <Route path="/reservationlist" element={<ListPage />} />
        <Route path="/myinfo" element={<MyInfoPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
