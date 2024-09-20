import { Route, Routes } from 'react-router-dom';
import useCommonStore from '../stores/common/useCommonStore';
import Layout from '../layout/common/Layout';
// 사업자 관련 페이지
import ManagerMainPage from '../pages/manager/main/MainPage';
import AdminPage from '../pages/manager/reservation/AdminPage';
import SeatDecoratePage from '../pages/manager/restaurant/SeatDecoratePage/SeatDecoratePage.jsx';
import RestaurantViewPage from '../pages/manager/restaurant/RestaurantViewPage';
import StatisticsPage from '../pages/manager/statistics/StatisticsPage';

// 손님 관련 페이지
import CustomerMainPage from '../pages/customer/main/MainPage';
import MapRestaurantPage from '../pages/customer/map/MapStorePage';
import ListPage from '../pages/customer/reservation/history/ListPage';
import MyInfoPage from '../pages/customer/user/MyInfoPage';
import TimeSelectPage from '../pages/customer/reservation/process/TimeSelectPage/TimeSelectPage.jsx';

// 비회원 관련 페이지
// import GuestEntryPage from './pages/customer/main/GuestEntryPage';

const AppRoutes = () => {
  const { isManager } = useCommonStore();

  return (
    <Layout>
      <Routes>
        <Route path="/manager" element={<ManagerMainPage />} />
        <Route path="/manager/admin" element={<AdminPage />} />
        <Route
          path="/manager/restaurant/seatdecorate"
          element={<SeatDecoratePage />}
        />
        <Route
          path="/manager/restaurantview"
          element={<RestaurantViewPage />}
        />
        <Route path="/manager/statistics" element={<StatisticsPage />} />
        <Route path="/customer" element={<CustomerMainPage />} />
        <Route path="/customer/reservation" element={<MapRestaurantPage />} />
        <Route
          path="/customer/reservation/time-select"
          element={<TimeSelectPage />}
        />
        <Route path="/customer/reservationlist" element={<ListPage />} />
        <Route path="/customer/myinfo" element={<MyInfoPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
