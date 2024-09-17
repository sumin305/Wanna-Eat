import { TabbarContainer, TabWrapper, TabImg, TabText } from './WETabbar.js';
import { useNavigate } from 'react-router-dom';

import HomeOff from '../../../assets/icons/tabbar/home-off.svg';
import HomeOn from '../../../assets/icons/tabbar/home-on.svg';
import ReservationOff from '../../../assets/icons/tabbar/reservation-off.svg';
import ReservationOn from '../../../assets/icons/tabbar/reservation-on.svg';
import AdminOff from '../../../assets/icons/tabbar/admin-off.svg';
import AdminOn from '../../../assets/icons/tabbar/admin-on.svg';
import StatisticsOff from '../../../assets/icons/tabbar/statistics-off.svg';
import StatisticsOn from '../../../assets/icons/tabbar/statistics-on.svg';
import MyinfoOff from '../../../assets/icons/tabbar/myinfo-off.svg';
import MyinfoOn from '../../../assets/icons/tabbar/myinfo-on.svg';

import useCommonStore from '../../../stores/common/useCommonStore';
import useTabbarStore from '../../../stores/common/tabbar/useTabbarStore';

const tabs = {
  manager: [
    { id: 0, label: '홈', offIcon: HomeOff, onIcon: HomeOn, path: '/manager' },
    {
      id: 1,
      label: '예약현황',
      offIcon: ReservationOff,
      onIcon: ReservationOn,
      path: '/manager/admin',
    },
    {
      id: 2,
      label: '매장관리',
      offIcon: AdminOff,
      onIcon: AdminOn,
      path: '/manager/restaurantview',
    },
    {
      id: 3,
      label: '통계',
      offIcon: StatisticsOff,
      onIcon: StatisticsOn,
      path: '/manager/statistics',
    },
  ],

  customer: [
    { id: 0, label: '홈', offIcon: HomeOff, onIcon: HomeOn, path: '/customer' },
    {
      id: 1,
      label: '예약하기',
      offIcon: AdminOff,
      onIcon: AdminOn,
      path: '/customer/reservation',
    },
    {
      id: 2,
      label: '예약현황',
      offIcon: ReservationOff,
      onIcon: ReservationOn,
      path: '/customer/reservationlist',
    },
    {
      id: 3,
      label: '내정보',
      offIcon: MyinfoOff,
      onIcon: MyinfoOn,
      path: '/customer/myinfo',
    },
  ],
};

const WETabbar = () => {
  const { isManager } = useCommonStore();
  const { activeId, handleClickTab } = useTabbarStore();
  const nav = useNavigate();
  const currentTabs = isManager ? tabs.manager : tabs.customer;

  return (
    <TabbarContainer>
      {currentTabs.map((tab) => (
        <TabWrapper
          key={tab.id}
          onClick={() => {
            handleClickTab(tab.id, tab.path);
            nav(tab.path);
          }}
        >
          <TabImg
            src={activeId === tab.id ? tab.onIcon : tab.offIcon}
            alt={`${tab.label} 아이콘`}
          />
          <TabText activeId={activeId === tab.id}>{tab.label}</TabText>
        </TabWrapper>
      ))}
    </TabbarContainer>
  );
};

export default WETabbar;
