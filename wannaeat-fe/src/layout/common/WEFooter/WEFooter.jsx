// WEFooter.js

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMapFilterStore from 'stores/map/useMapFilterStore'; // 키워드 초기화 위해 import
import {
  FooterContainer,
  FooterWrapper,
  FooterImg,
  FooterText,
} from './WEFooter.js';

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

import useCommonStore from '../../../stores/common/useCommonStore.js';
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
      label: '통계',
      offIcon: StatisticsOff,
      onIcon: StatisticsOn,
      path: '/manager/statistics',
    },
    {
      id: 3,
      label: '내정보',
      offIcon: MyinfoOff,
      onIcon: MyinfoOn,
      path: '/manager/myinfo',
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
  const { getUserRole } = useCommonStore();
  const { activeId, handleClickTab } = useFooterStore();
  const { setKeyword } = useMapFilterStore(); // 키워드 초기화 함수
  const nav = useNavigate();
  const location = useLocation();
  const [currentTabs, setCurrentTabs] = useState([]);
  const currentTabId = currentTabs.find((tab) => {
    // '/customer/order'로 시작하는 경로는 모두 예약하기 탭으로 설정
    if (location.pathname.startsWith('/customer/order') && tab.id === 1) {
      return true;
    }
    return tab.path === location.pathname;
  })?.id;

  useEffect(() => {
    const checkUserRole = async () => {
      const role = await getUserRole();
      return role;
    };

    const fetchTabs = async () => {
      const role = await checkUserRole();
      setCurrentTabs(role === 'MANAGER' ? tabs.manager : tabs.customer);
    };

    fetchTabs();
  }, []);

  useEffect(() => {
    if (currentTabId !== undefined && currentTabId != activeId) {
      handleClickTab(currentTabId, currentTabs[currentTabId].path);
    }
  }, [currentTabId]);

  return (
    <FooterContainer>
      {currentTabs.map((tab) => (
        <FooterWrapper
          key={tab.id}
          onClick={() => {
            // 예약하기 클릭 시 키워드 초기화
            if (tab.path === '/customer/reservation') {
              setKeyword('');
            }
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
