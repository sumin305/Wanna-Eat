import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import { authClientInstance } from 'utils/http-client.js';
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

// import testImage1 from 'assets/MochaLong1.webp';
// import testImage2 from 'assets/MochaShort1.png';
// import testImage3 from 'assets/MintLatte1.png';

const StatisticsPage = () => {
  const {
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
  } = useHeaderStore();

  const navigate = useNavigate();

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

  useEffect(() => {
    authClientInstance
      .get(`/api/restaurants/statistics`, {
        headers: {
          'Authorization-wannaeat':
            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyNzk3MTU4NCwiZW1haWwiOiJsZWVnZ29uMTIxM0BuYXRlLmNvbSIsInNvY2lhbFR5cGUiOiJLQUtBTyIsInJvbGUiOiJNQU5BR0VSIn0.uvkhace12RwL4ZiPWCiNFfz2Hyb8-firyis-3gOuCz0hMZEP2lpjf3vzeKkWn9DAi_z6iS06BvNvCqD1jCEZeQ',
        },
      })

      .then((response) => {
        const data = response.data.data;

        const monthLabels = Object.keys(data.monthStatistics).map(
          (month) => `${month}월`
        );
        const monthSeries = Object.values(data.monthStatistics);

        const dayLabels = Object.keys(data.dayStatistics);
        const daySeries = Object.values(data.dayStatistics);

        const hourLabels = Object.keys(data.hourStatistics);
        const hourSeries = Object.values(data.hourStatistics);

        const revenueLabels = Object.keys(data.revenues);
        const revenueSeries = Object.values(data.revenues);

        const topMenus = data.topMenuStatistics.map((menu) => ({
          url: menu.menuImage,
          label: menu.menuName,
          numberOfOrders: menu.orderCnt,
        }));

        const bottomMenus = data.bottomMenuStatistics.map((menu) => ({
          url: menu.menuImage,
          label: menu.menuName,
          numberOfOrders: menu.orderCnt,
        }));

        setMonthStatistics({ labels: monthLabels, series: monthSeries });
        setDayStatistics({ labels: dayLabels, series: daySeries });
        setHourStatistics({ labels: hourLabels, series: hourSeries });
        setRevenues({ labels: revenueLabels, series: revenueSeries });
        setTopMenuStatistics(topMenus);
        setBottomMenuStatistics(bottomMenus);
      })
      .catch((error) => {
        console.error('통계 메인페이지 요청 실패:', error);
      });
  }, []);

  const [monthStatistics, setMonthStatistics] = useState([]);
  const [dayStatistics, setDayStatistics] = useState([]);
  const [hourStatistics, setHourStatistics] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [topMenuStatistics, setTopMenuStatistics] = useState([]);
  const [bottomMenuStatistics, setBottomMenuStatistics] = useState([]);

  // const BestImages = [
  //   {
  //     url: testImage1,
  //     label: '아이스카페모카',
  //     numberOfOrders: '123456789',
  //   },
  //   {
  //     url: testImage2,
  //     label: 'CafeMocha',
  //     numberOfOrders: '12345',
  //   },
  //   {
  //     url: testImage3,
  //     label: 'Mint Latte',
  //     numberOfOrders: '12345',
  //   },
  // ];

  // const WorstImages = [
  //   {
  //     url: testImage3,
  //     label: 'Mint Latte',
  //     numberOfOrders: '12345',
  //   },
  //   {
  //     url: testImage2,
  //     label: 'CafeMocha',
  //     numberOfOrders: '12345',
  //   },
  //   {
  //     url: testImage1,
  //     label: '아이스카페모카',
  //     numberOfOrders: '123456789',
  //   },
  // ];

  // const monthLabels = ['6', '12', '4'];
  // const monthSeries = [100, 60, 30];

  // const dayLabels = ['금', '화', '월'];
  // const daySeries = [100, 40, 30];
  // const timeLabels = ['18:00', '17:00', '12:00'];
  // const timeSeries = [30, 50, 10];

  // const categories = ['9/29', '9/30', '10/1', '10/2', '10/3'];
  // const series = [
  //   {
  //     name: '매출',
  //     data: [50, 20, 180, 150, 140],
  //   },
  // ];

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
            <WEDonut
              labels={monthStatistics.labels || []}
              series={monthStatistics.series || []}
            />
            <label>월</label>
          </DonutWithLabelStyled>
          <DonutWithLabelStyled>
            <WEDonut
              labels={dayStatistics.labels || []}
              series={dayStatistics.series || []}
            />
            <label>요일</label>
          </DonutWithLabelStyled>
          <DonutWithLabelStyled>
            <WEDonut
              labels={hourStatistics.labels || []}
              series={hourStatistics.series || []}
              type="time"
            />
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
        <WEColumn
          categories={revenues.labels}
          series={[{ name: '매출', data: revenues.series }]}
        />
      </StatisticsColumnWrapperStyled>
      <StatisticsMenuWrapperStyled>
        <WEBestMenuStyled>
          <MenuHeaderStyled>
            <TitleStyled>인기 메뉴</TitleStyled>
          </MenuHeaderStyled>
          <WEMenu images={topMenuStatistics} />
        </WEBestMenuStyled>
        <WEBestMenuStyled>
          <MenuHeaderStyled>
            <TitleStyled>비인기 메뉴</TitleStyled>
          </MenuHeaderStyled>
          <WEMenu images={bottomMenuStatistics} />
        </WEBestMenuStyled>
      </StatisticsMenuWrapperStyled>
    </StatisticsStyled>
  );
};

export default StatisticsPage;
