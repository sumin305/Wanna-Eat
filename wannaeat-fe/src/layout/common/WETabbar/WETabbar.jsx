import { TabbarContainer, TabWrapper, TabImg, TabText } from './WETabbarStyle';

import HomeOff from '../../../assets/icons/home-off.svg';
import HomeOn from '../../../assets/icons/home-on.svg';
import ReservationOff from '../../../assets/icons/reservation-off.svg';
import ReservationOn from '../../../assets/icons/reservation-on.svg';
import AdminOff from '../../../assets/icons/admin-off.svg';
import AdminOn from '../../../assets/icons/admin-on.svg';
import StatisticsOff from '../../../assets/icons/statistics-off.svg';
import StatisticsOn from '../../../assets/icons/statistics-on.svg';
import MyinfoOff from '../../../assets/icons/myinfo-off.svg';
import MyinfoOn from '../../../assets/icons/myinfo-on.svg';

import useCommonStore from '../../../stores/common/useCommonStore';
import useTabbarStore from '../../../stores/tabbar/useTabbarStore';

const tabs = {
  manager: [
    { id: 0, label: '홈', offIcon: HomeOff, onIcon: HomeOn },
    {
      id: 1,
      label: '예약현황',
      offIcon: ReservationOff,
      onIcon: ReservationOn,
    },
    { id: 2, label: '매장관리', offIcon: AdminOff, onIcon: AdminOn },
    { id: 3, label: '통계', offIcon: StatisticsOff, onIcon: StatisticsOn },
  ],

  customer: [
    { id: 0, label: '홈', offIcon: HomeOff, onIcon: HomeOn },
    { id: 1, label: '예약하기', offIcon: AdminOff, onIcon: AdminOn },
    {
      id: 2,
      label: '예약현황',
      offIcon: ReservationOff,
      onIcon: ReservationOn,
    },
    { id: 3, label: '내정보', offIcon: MyinfoOff, onIcon: MyinfoOn },
  ],
};

const WETabbar = () => {
  const { isManager } = useCommonStore();
  const { activeId, handleClickTab } = useTabbarStore();
  const currentTabs = isManager ? tabs.manager : tabs.customer;

  return (
    <TabbarContainer>
      {currentTabs.map((tab) => (
        <TabWrapper key={tab.id} onClick={() => handleClickTab(tab.id)}>
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
