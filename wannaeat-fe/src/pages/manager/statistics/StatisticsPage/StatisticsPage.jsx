import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import {
  StatisticsStyled,
  StatisticsDonutWrapperStyled,
  StatisticsHeaderStyled,
  MenuHeaderStyled,
  TitleStyled,
  GoToDetailStyled,
  DonutWrapperStyled,
  DonutWithLabelStyled,
  StatisticsColumnWrapperStyled,
  WEBestMenuStyled,
  StatisticsMenuWrapperStyled,
} from './StatisticsPage.js';
import WEDonut from 'component/manager/statistics/WEDonut/WEDonut.jsx';
import WEColumn from 'component/manager/statistics/WEColumn/WEColumn.jsx';
import WEMenu from 'component/manager/statistics/WEMenu/WEMenu.jsx';

import testImage1 from 'assets/MochaLong1.webp';
import testImage2 from 'assets/MochaShort1.png';
import testImage3 from 'assets/MintLatte1.png';

const StatisticsPage = () => {
  const {
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(false);
    setIsShowBackIcon(true);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setPageName('매장 통계');
  }, [
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
  ]);

  const navigate = useNavigate();

  const BestImages = [
    {
      url: testImage1,
      label: '아이스카페모카',
      numberOfOrders: '123456789',
    },
    {
      url: testImage2,
      label: 'CafeMocha',
      numberOfOrders: '12345',
    },
    {
      url: testImage3,
      label: 'Mint Latte',
      numberOfOrders: '12345',
    },
  ];

  const WorstImages = [
    {
      url: testImage3,
      label: 'Mint Latte',
      numberOfOrders: '12345',
    },
    {
      url: testImage2,
      label: 'CafeMocha',
      numberOfOrders: '12345',
    },
    {
      url: testImage1,
      label: '아이스카페모카',
      numberOfOrders: '123456789',
    },
  ];

  const monthLabels = ['6', '12', '4'];
  const monthSeries = [100, 60, 30];
  const dayLabels = ['금', '화', '월'];
  const daySeries = [100, 40, 30];
  const timeLabels = ['18:00', '17:00', '12:00'];
  const timeSeries = [30, 50, 10];

  const categories = ['9/29', '9/30', '10/1', '10/2', '10/3'];
  const series = [
    {
      name: '매출',
      data: [50, 20, 180, 150, 140],
    },
  ];

  return (
    <StatisticsStyled>
      <StatisticsDonutWrapperStyled>
        <StatisticsHeaderStyled>
          <TitleStyled>피크타임 분석</TitleStyled>
          <GoToDetailStyled
            onClick={() => navigate('/manager/statistics/peaktime-detail')}
          >
            더보기 {'>'}
          </GoToDetailStyled>
        </StatisticsHeaderStyled>
        <DonutWrapperStyled>
          <DonutWithLabelStyled>
            <WEDonut labels={monthLabels} series={monthSeries} />
            <label>월</label>
          </DonutWithLabelStyled>
          <DonutWithLabelStyled>
            <WEDonut labels={dayLabels} series={daySeries} />
            <label>요일</label>
          </DonutWithLabelStyled>
          <DonutWithLabelStyled>
            <WEDonut labels={timeLabels} series={timeSeries} type="time" />
            <label>시간</label>
          </DonutWithLabelStyled>
        </DonutWrapperStyled>
      </StatisticsDonutWrapperStyled>
      <StatisticsColumnWrapperStyled>
        <StatisticsHeaderStyled>
          <TitleStyled>일 매출 현황</TitleStyled>
          <GoToDetailStyled
            onClick={() => navigate('/manager/statistics/sales-detail')}
          >
            더보기 {'>'}
          </GoToDetailStyled>
        </StatisticsHeaderStyled>
        <WEColumn categories={categories} series={series} />
      </StatisticsColumnWrapperStyled>
      <StatisticsMenuWrapperStyled>
        <WEBestMenuStyled>
          <MenuHeaderStyled>
            <TitleStyled>인기 메뉴</TitleStyled>
          </MenuHeaderStyled>
          <WEMenu images={BestImages} />
        </WEBestMenuStyled>
        <WEBestMenuStyled>
          <MenuHeaderStyled>
            <TitleStyled>비인기 메뉴</TitleStyled>
          </MenuHeaderStyled>
          <WEMenu images={WorstImages} />
        </WEBestMenuStyled>
      </StatisticsMenuWrapperStyled>
    </StatisticsStyled>
  );
};

export default StatisticsPage;
