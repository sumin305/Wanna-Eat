import { Route, Routes } from 'react-router-dom';
import commonStore from './stores/common/commonStore';

import ManagerMainPage from './pages/manager/main/MainPage';
import CustomerMainPage from './pages/customer/main/MainPage';
// import GuestEntryPage from './pages/customer/main/GuestEntryPage';

const AppRoutes = () => {
  const { isManager } = commonStore();
  return isManager ? (
    <Routes>
      <Route path="/" element={<ManagerMainPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<CustomerMainPage />} />
    </Routes>
  );
};

export default AppRoutes;
