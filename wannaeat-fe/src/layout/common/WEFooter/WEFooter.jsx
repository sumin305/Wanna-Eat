import {
  FooterContainer,
  FooterWrapper,
  FooterImg,
  FooterText,
} from './WEFooter.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import HomeOff from '../../../assets/icons/footer/home-off.svg';
import HomeOn from '../../../assets/icons/footer/home-on.svg';
import ReservationOff from '../../../assets/icons/footer/reservation-off.svg';
import ReservationOn from '../../../assets/icons/footer/reservation-on.svg';
import AdminOff from '../../../assets/icons/footer/admin-off.svg';
import AdminOn from '../../../assets/icons/footer/admin-on.svg';
import StatisticsOff from '../../../assets/icons/footer/statistics-off.svg';
import StatisticsOn from '../../../assets/icons/footer/statistics-on.svg';
import MyinfoOff from '../../../assets/icons/footer/myinfo-off.svg';
import MyinfoOn from '../../../assets/icons/footer/myinfo-on.svg';

import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore.js';
import useFooterStore from '../../../stores/common/useFooterStore.js';

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

const WEFooter = () => {
  const { role } = useCommonStore();
  const { activeId, handleClickTab } = useFooterStore();
  const nav = useNavigate();
  const location = useLocation();
  const currentTabs = role === ROLE.MANAGER ? tabs.manager : tabs.customer;
  const currentTabId = currentTabs.find(
    (tab) => tab.path === location.pathname
  )?.id;

  useEffect(() => {
    if (currentTabId !== undefined && currentTabId != activeId) {
      handleClickTab(currentTabId, currentTabs[currentTabId].path);
    }
  }, [currentTabId]);

  return (
    <FooterContainer role={role}>
      {currentTabs.map((tab) => (
        <FooterWrapper
          key={tab.id}
          onClick={() => {
            handleClickTab(tab.id, tab.path);
            nav(tab.path);
          }}
        >
          <FooterImg
            src={activeId === tab.id ? tab.onIcon : tab.offIcon}
            alt={`${tab.label} 아이콘`}
          />
          <FooterText activeId={activeId === tab.id}>{tab.label}</FooterText>
        </FooterWrapper>
      ))}
    </FooterContainer>
  );
};

export default WEFooter;
