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
      .get(`/api/restaurants/statistics`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);

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

  const [monthStatistics, setMonthStatistics] = useState({
    labels: [],
    series: [],
  });
  const [dayStatistics, setDayStatistics] = useState({
    labels: [],
    series: [],
  });
  const [hourStatistics, setHourStatistics] = useState({
    labels: [],
    series: [],
  });
  const [revenues, setRevenues] = useState([]);
  const [topMenuStatistics, setTopMenuStatistics] = useState([]);
  const [bottomMenuStatistics, setBottomMenuStatistics] = useState([]);

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
          <TitleStyled>일 매출 현황 (만원)</TitleStyled>
          <GoToDetailStyled
            onClick={() => navigate('/manager/statistics/sales-detail')}
          >
            더보기 {'>'}
          </GoToDetailStyled>
        </StatisticsHeaderStyled>
        <WEColumn
          categories={revenues.labels}
          series={[{ name: '매출', data: revenues.series }]}
          isRevenue={true}
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
