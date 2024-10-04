import { useEffect, useState } from 'react';
import {
  PeakTimePageStyled,
  PeaKTimePageWrapper,
  PeakTimeHeaderStyled,
  DateStyled,
  DayWrapperStyled,
  TurnoverWrapperStyled,
  TurnoverStyled,
  TurnoverLabelStyled,
  TurnoverValueStyled,
  PeakTimeLabelStyled,
  TimeWrapperStyled,
  TurnoverContainerStyled,
} from './PeakTimePage.js';
import { authClientInstance } from 'utils/http-client.js';

import useHeaderStore from 'stores/common/useHeaderStore.js';

import WEColumn from 'component/manager/statistics/WEColumn/WEColumn.jsx';
import WELine from 'component/manager/statistics/WELine/WELine.jsx';

import { ReactComponent as LeftArrow } from 'assets/icons/manager/statistics/arrow-left-carrot.svg';
import { ReactComponent as RightArrow } from 'assets/icons/manager/statistics/arrow-right-carrot.svg';

const PeakTimePage = () => {
  const {
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
  } = useHeaderStore();

  const currentDate = new Date();

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);

  useEffect(() => {
    setIsCarrot(false);
    setIsShowBackIcon(true);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setPageName('피크타임 상세보기');
    fetchStatistics(currentYear, currentMonth);
  }, [
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
    currentYear,
    currentMonth,
  ]);

  const fetchStatistics = async (year, month) => {
    try {
      const response = await authClientInstance.get(
        `/api/restaurants/statistics/peek?year=${year}&month=${month}`
      );
      const data = response.data.data;
      setStatistics({
        dayStatistics: data.dayStatistics,
        hourStatistics: data.hourStatistics,
        turnoverRate: data.turnoverRate,
        averageUsageTime: data.averageUsageTime,
      });
    } catch (error) {
      console.error('피크타임 상세 데이터 요청 실패', error);
    }
  };

  const [statistics, setStatistics] = useState({
    dayStatistics: {},
    hourStatistics: {},
    turnoverRate: 0,
    averageUsageTime: 0,
  });

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 1) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 12;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (currentDate.getMonth() + 1 === prevMonth) {
        return prevMonth;
      }

      if (prevMonth === 12) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prevMonth + 1;
    });
  };

  const categories = Object.keys(statistics.dayStatistics);
  const series = [
    {
      name: '예약 건수',
      data: Object.values(statistics.dayStatistics),
    },
  ];

  const timeCategories = Object.keys(statistics.hourStatistics);
  const timeSeries = [
    {
      name: '예약 건수',
      data: Object.values(statistics.hourStatistics),
    },
  ];

  // const categories = ['월', '화', '수', '목', '금', '토', '일'];
  // const series = [
  //   {
  //     name: '예약 건수',
  //     data: [100, 200, 180, 150, 500, 300, 450],
  //   },
  // ];

  // const timeCategories = [
  //   '00:00',
  //   '00:30',
  //   '01:00',
  //   '01:30',
  //   '02:00',
  //   '02:30',
  //   '03:00',
  //   '03:30',
  //   '04:00',
  //   '04:30',
  //   '05:00',
  //   '05:30',
  //   '06:00',
  //   '06:30',
  //   '07:00',
  //   '07:30',
  //   '08:00',
  //   '08:30',
  //   '09:00',
  //   '09:30',
  //   '10:00',
  //   '10:30',
  //   '11:00',
  //   '11:30',
  //   '12:00',
  // '12:30',
  // '13:00',
  // '13:30',
  // '14:00',
  // '14:30',
  // '15:00',
  // '15:30',
  // '16:00',
  // '16:30',
  // '17:00',
  // '17:30',
  // '18:00',
  // '18:30',
  // '19:00',
  // '19:30',
  // '20:00',
  // '20:30',
  // '21:00',
  // '21:30',
  // '22:00',
  // '22:30',
  // '23:00',
  // '23:30',
  // ];

  // const timeSeries = [
  //   {
  //     name: '예약 건수',
  //     data: [
  //       91, 142, 36, 184, 75, 14, 141, 144, 187, 90, 190, 190, 90, 110, 14, 99,
  //       194, 26, 47, 23, 92, 17, 123, 187,
  //     ],
  //   },
  // ];

  return (
    <PeakTimePageStyled>
      <PeaKTimePageWrapper>
        <PeakTimeHeaderStyled>
          <LeftArrow className="arrow" onClick={handlePreviousMonth} />
          <DateStyled>
            {currentYear}.{currentMonth.toString().padStart(2, '0')}
          </DateStyled>
          <RightArrow className="arrow" onClick={handleNextMonth} />
        </PeakTimeHeaderStyled>
        <DayWrapperStyled>
          <PeakTimeLabelStyled>요일</PeakTimeLabelStyled>
          <WEColumn categories={categories} series={series} />
        </DayWrapperStyled>
        <TurnoverContainerStyled>
          <TurnoverWrapperStyled>
            <TurnoverStyled>
              <TurnoverLabelStyled>회전율</TurnoverLabelStyled>
              <TurnoverValueStyled>
                {statistics.turnoverRate} 회
              </TurnoverValueStyled>
            </TurnoverStyled>
            <TurnoverStyled>
              <TurnoverLabelStyled>평균 이용 시간</TurnoverLabelStyled>
              <TurnoverValueStyled>
                {statistics.averageUsageTime} 분
              </TurnoverValueStyled>
            </TurnoverStyled>
          </TurnoverWrapperStyled>
        </TurnoverContainerStyled>

        <TimeWrapperStyled>
          <PeakTimeLabelStyled>시간</PeakTimeLabelStyled>
          <WELine categories={timeCategories || []} series={timeSeries || []} />
        </TimeWrapperStyled>
      </PeaKTimePageWrapper>
    </PeakTimePageStyled>
  );
};

export default PeakTimePage;
