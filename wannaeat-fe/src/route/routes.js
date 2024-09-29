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
import RestaurantRegistPage from '../pages/manager/restaurant/RestaurantRegistPage/RestaurantRegistPage.jsx';

// 손님 관련 페이지
import CustomerMainPage from '../pages/customer/main/MainPage/MainPage.jsx';
import MapRestaurantPage from '../pages/customer/map/MapRestaurantPage.jsx';
import ListPage from '../pages/customer/reservation/history/ListPage';
import MyInfoPage from '../pages/customer/user/MyInfoPage/MyInfoPage.jsx';
import RestaurantDetailPage from '../pages/customer/reservation/process/RestaurantDetailPage/RestaurantDetailPage.jsx';
import TimeSelectPage from '../pages/customer/reservation/process/TimeSelectPage/TimeSelectPage.jsx';
import DepositPaymentPage from '../pages/customer/reservation/process/DepositPaymentPage/DepositPaymentPage.jsx';
import SeatSelectPage from '../pages/customer/reservation/process/SeatSelectPage/SeatSelectPage.jsx';
import SuccessPage from '../pages/customer/reservation/process/SuccessPage/SuccessPage.jsx';
import FingerprintAuthPage from '../pages/customer/reservation/process/FingerprintAuthPage/FingerprintAuthPage.jsx';
import CardManagePage from '../pages/customer/user/CardManagePage/CardManagePage.jsx';
import CardRegistPage from '../pages/customer/user/CardRegistPage/CardRegistPage.jsx';
import NicknameEditPage from '../pages/customer/user/NicknameEditPage/NicknameEditPage.jsx';
import PasswordEditPage from '../pages/customer/user/PasswordEditPage/PasswordEditPage.jsx';

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
          path="/manager/restaurant/seat-decorate"
          element={<SeatDecoratePage />}
        />
        <Route
          path="/manager/restaurant/restaurant-regist"
          element={<RestaurantRegistPage />}
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
        <Route path="/custoer/card-manage" element={<CardManagePage />} />
        <Route path="/custoer/card-regist" element={<CardRegistPage />} />
        <Route path="/custoer/nickname-edit" element={<NicknameEditPage />} />
        <Route path="/custoer/password-edit" element={<PasswordEditPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
