import { useState } from 'react';
import {
  HomeImg,
  HomeText,
  ReservationImg,
  ReservationText,
  AdminImg,
  AdminText,
  StatisticsImg,
  StatisticsText,
  HomeWrapper,
  ReservationWrapper,
  AdminWrapper,
  StatisticsWrapper,
  TabbarContainer,
} from './WETabbarStyle';

import HomeOff from '../../assets/icons/home-off.svg';
import HomeOn from '../../assets/icons/home-on.svg';
import ReservationOff from '../../assets/icons/reservation-off.svg';
import ReservationOn from '../../assets/icons/reservation-on.svg';
import AdminOff from '../../assets/icons/admin-off.svg';
import AdminOn from '../../assets/icons/admin-on.svg';
import StatisticsOff from '../../assets/icons/statistics-off.svg';
import StatisticsOn from '../../assets/icons/statistics-on.svg';

const WETabbar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <TabbarContainer>
      <HomeWrapper onClick={() => handleTabClick(0)}>
        <HomeImg src={activeTab === 0 ? HomeOn : HomeOff} alt="홈기본" />
        <HomeText activeTab={activeTab}>홈</HomeText>
      </HomeWrapper>

      <ReservationWrapper onClick={() => handleTabClick(1)}>
        <ReservationImg
          src={activeTab === 1 ? ReservationOn : ReservationOff}
          alt="예약현황기본"
        />
        <ReservationText activeTab={activeTab}>예약현황</ReservationText>
      </ReservationWrapper>
      <AdminWrapper onClick={() => handleTabClick(2)}>
        <AdminImg
          src={activeTab === 2 ? AdminOn : AdminOff}
          alt="매장관리기본"
        />
        <AdminText activeTab={activeTab}>매장관리</AdminText>
      </AdminWrapper>
      <StatisticsWrapper onClick={() => handleTabClick(3)}>
        <StatisticsImg
          src={activeTab === 3 ? StatisticsOn : StatisticsOff}
          alt="통계기본"
        />
        <StatisticsText activeTab={activeTab}>통계</StatisticsText>
      </StatisticsWrapper>
    </TabbarContainer>
  );
};

export default WETabbar;
