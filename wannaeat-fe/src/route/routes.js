import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/common/Layout';
// 공통 페이지
import LoginPage from '../pages/common/LoginPage/LoginPage.jsx';
import SignUpPage from '../pages/common/SignUpPage/SignUpPage.jsx';
// 사업자 관련 페이지
import ManagerMainPage from '../pages/manager/main/MainPage';
import AdminPage from '../pages/manager/reservation/AdminPage';
import SeatDecoratePage from '../pages/manager/restaurant/SeatDecoratePage/SeatDecoratePage.jsx';
import RestaurantViewPage from '../pages/manager/restaurant/RestaurantViewPage';
import StatisticsPage from '../pages/manager/statistics/StatisticsPage';
import ManagerRegistPage from '../pages/manager/restaurant/ManagerRegistPage/ManagerRegistPage.jsx';

// 손님 관련 페이지
import CustomerMainPage from '../pages/customer/main/MainPage/MainPage.jsx';
import MapRestaurantPage from '../pages/customer/map/MapRestaurantPage.jsx';
import ListPage from '../pages/customer/reservation/history/ListPage';
import MyInfoPage from '../pages/customer/user/MyInfoPage';
import RestaurantDetailPage from '../pages/customer/reservation/process/RestaurantDetailPage/RestaurantDetailPage.jsx';
import TimeSelectPage from '../pages/customer/reservation/process/TimeSelectPage/TimeSelectPage.jsx';
import DepositPaymentPage from '../pages/customer/reservation/process/DepositPaymentPage/DepositPaymentPage.jsx';
import SeatSelectPage from '../pages/customer/reservation/process/SeatSelectPage/SeatSelectPage.jsx';
import SuccessPage from '../pages/customer/reservation/process/SuccessPage/SuccessPage.jsx';
import FingerprintAuthPage from '../pages/customer/reservation/process/FingerprintAuthPage/FingerprintAuthPage.jsx';
import { useEffect } from 'react';
import useCommonStore from '../stores/common/useCommonStore.js';
// 비회원 관련 페이지
// import GuestEntryPage from './pages/customer/main/GuestEntryPage';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/join" element={<SignUpPage />} />

        <Route path="/manager" element={<ManagerMainPage />} />
        <Route path="/manager/admin" element={<AdminPage />} />
        <Route
          path="/manager/restaurant/seatdecorate"
          element={<SeatDecoratePage />}
        />
        <Route
          path="/manager/restaurant/manager-regist"
          element={<ManagerRegistPage />}
        />
        <Route
          path="/manager/restaurantview"
          element={<RestaurantViewPage />}
        />
        <Route path="/manager/statistics" element={<StatisticsPage />} />
        <Route path="/customer" element={<CustomerMainPage />} />
        <Route path="/customer/reservation" element={<MapRestaurantPage />} />
        <Route
          path="/customer/reservation/restaurant-detail/:id"
          element={<RestaurantDetailPage />}
        />
        <Route
          path="/customer/reservation/time-select"
          element={<TimeSelectPage />}
        />
        <Route
          path="/customer/reservation/seat-select"
          element={<SeatSelectPage />}
        />
        <Route
          path="/customer/reservation/deposit-payment"
          element={<DepositPaymentPage />}
        />
        <Route
          path="/customer/reservation/fingerprint-auth"
          element={<FingerprintAuthPage />}
        />
        <Route path="/customer/reservation/success" element={<SuccessPage />} />
        <Route path="/customer/reservationlist" element={<ListPage />} />
        <Route path="/customer/myinfo" element={<MyInfoPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
