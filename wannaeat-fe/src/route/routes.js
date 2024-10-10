import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/common/Layout';

// 공통 페이지
import LoginPage from '../pages/common/LoginPage/LoginPage.jsx';
import SignUpPage from '../pages/common/SignUpPage/SignUpPage.jsx';
import PasswordRegistPage from 'pages/common/PasswordRegistPage/PasswordRegistPage.jsx';
// 사업자 관련 페이지
import ManagerMainPage from '../pages/manager/main/MainPage.jsx';
import AdminPage from '../pages/manager/reservation/AdminPage/AdminPage.jsx';
import SeatDecoratePage from '../pages/manager/restaurant/SeatDecoratePage/SeatDecoratePage.jsx';
import ManagerRegistPage from 'pages/manager/restaurant/ManagerRegistPage/ManagerRegistPage.jsx';
import RestaurantManagePage from '../pages/manager/restaurant/RestaurantManagePage/RestaurantManagePage.jsx';
import StatisticsPage from 'pages/manager/statistics/StatisticsPage/StatisticsPage.jsx';
import PeakTimePage from 'pages/manager/statistics/PeakTimePage/PeakTimePage.jsx';
import SalesPage from 'pages/manager/statistics/SalesPage/SalesPage.jsx';
import AlarmPage from '../pages/manager/alarm/alarm.jsx';
import ManagerReservationDetailPage from '../pages/manager/reservation/ManagerReservationDetailPage/ManagerReservationDetailPage.jsx';
import AdminDetailPage from 'pages/manager/reservation/AdminDetailPage/AdminDetailPage.jsx';
import MenuViewPage from 'pages/manager/menu/MenuViewPage/MenuViewPage.jsx';
import ManagerInfoPage from 'pages/manager/user/MyInfoPage/MyInfoPage.jsx';
import ManagerNicknameEditPage from 'pages/manager/user/NicknameEditPage/NicknameEditPage.jsx';

// 손님 관련 페이지
import CustomerMainPage from '../pages/customer/main/MainPage/MainPage.jsx';
import MapRestaurantPage from '../pages/customer/map/MapRestaurantPage.jsx';
import ReservationListPage from '../pages/customer/reservation/history/ReservationListPage/ReservationListPage.jsx';
import CustomerReservationDetailPage from '../pages/customer/reservation/history/ReservationDetailPage/ReservationDetailPage.jsx';
import MyInfoPage from '../pages/customer/user/MyInfoPage/MyInfoPage.jsx';
import RestaurantDetailPage from '../pages/customer/reservation/process/RestaurantDetailPage/RestaurantDetailPage.jsx';
import TimeSelectPage from '../pages/customer/reservation/process/TimeSelectPage/TimeSelectPage.jsx';
import DepositPaymentPage from '../pages/customer/reservation/process/DepositPaymentPage/DepositPaymentPage.jsx';
import SeatSelectPage from '../pages/customer/reservation/process/SeatSelectPage/SeatSelectPage.jsx';
import SuccessPage from '../pages/customer/reservation/process/SuccessPage/SuccessPage.jsx';
import FingerprintAuthPage from '../pages/customer/reservation/process/FingerprintAuthPage/FingerprintAuthPage.jsx';
import ChatPage from 'pages/customer/chat/ChatPage.jsx';
import OrderMainPage from 'pages/customer/order/OrderMainPage/OrderMainPage.jsx';
import OrderCartPage from 'pages/customer/order/OrderCartPage/OrderCartPage.jsx';
import NotExistOrderPage from 'pages/customer/order/NotExistOrderPage/NotExistOrderPage.jsx';
import MenuSelectPage from 'pages/customer/order/MenuSelectPage/MenuSelectPage.jsx';
import OrderSheetPage from 'pages/customer/order/OrderSheetPage/OrderSheetPage.jsx';
import OrderPaymentPage from 'pages/customer/order/OrderPaymentPage/OrderPaymentPage.jsx';
import CardManagePage from 'pages/customer/user/CardManagePage/CardManagePage.jsx';
import CardRegistPage from 'pages/customer/user/CardRegistPage/CardRegistPage.jsx';
import NicknameEditPage from 'pages/customer/user/NicknameEditPage/NicknameEditPage.jsx';
import MyZzimPage from 'pages/customer/user/MyZzimPage/MyZzimPage.jsx';
import PasswordAuthPage from 'pages/customer/reservation/process/PasswordAuthPage/PasswordAuthPage.jsx';
import OrderSuccessPage from 'pages/customer/order/OrderSuccessPage/OrderSuccessPage.jsx';
// 비회원 관련 페이지
// import GuestEntryPage from './pages/customer/main/GuestEntryPage';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/join" element={<SignUpPage />} />
        <Route path="/password-regist" element={<PasswordRegistPage />} />
        <Route path="/manager" element={<ManagerMainPage />} />
        <Route path="/manager/admin" element={<AdminPage />} />
        <Route path="/manager/admin/detail" element={<AdminDetailPage />} />
        <Route
          path="/manager/restaurant/seat-decorate"
          element={<SeatDecoratePage />}
        />
        <Route path="/manager/myinfo" element={<ManagerInfoPage />} />
        <Route
          path="/manager/nickname-edit"
          element={<ManagerNicknameEditPage />}
        />
        <Route
          path="/manager/restaurant-regist"
          element={<ManagerRegistPage />}
        />
        <Route
          path="/manager/restaurant/restaurant-manage"
          element={<RestaurantManagePage />}
        />
        <Route path="/manager/statistics" element={<StatisticsPage />} />
        <Route
          path="/manager/statistics/peaktime-detail"
          element={<PeakTimePage />}
        />
        <Route
          path="/manager/statistics/sales-detail"
          element={<SalesPage />}
        />

        {/* 장정현 */}
        <Route path="/manager/alarm" element={<AlarmPage />} />
        <Route path="/manager/menu" element={<MenuViewPage />} />
        <Route
          path="/manager/reservation/reservation-detail/:id"
          element={<ManagerReservationDetailPage />}
        />

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
        <Route path="/customer/password-auth" element={<PasswordAuthPage />} />
        <Route path="/customer/reservation/success" element={<SuccessPage />} />
        <Route
          path="/customer/reservationlist"
          element={<ReservationListPage />}
        />
        <Route
          path="/customer/reservation/detail/:id"
          element={<CustomerReservationDetailPage />}
        />

        <Route path="/customer/order/:url" element={<OrderMainPage />} />
        <Route path="/customer/order/cart/:url" element={<OrderCartPage />} />
        <Route path="/customer/order/chat/:url" element={<ChatPage />} />
        <Route
          path="/customer/order/notexist"
          element={<NotExistOrderPage />}
        />
        <Route
          path="/customer/order/menu-select/:url"
          element={<MenuSelectPage />}
        />
        <Route
          path="/customer/order/order-sheet/:url"
          element={<OrderSheetPage />}
        />
        <Route path="/customer/order/pay/:url" element={<OrderPaymentPage />} />
        <Route path="/customer/myinfo" element={<MyInfoPage />} />
        <Route path="/customer/card-manage" element={<CardManagePage />} />
        <Route path="/customer/card-regist" element={<CardRegistPage />} />
        <Route path="/customer/nickname-edit" element={<NicknameEditPage />} />
        <Route path="/customer/myzzim" element={<MyZzimPage />} />
        <Route path="/customer/order/success" element={<OrderSuccessPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
