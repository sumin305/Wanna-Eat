import { useEffect, useState } from 'react';
import {
  SalesPageStyled,
  SalesPageWrapperStyled,
  SalesPageHeaderStyled,
  DateStyled,
  TotalRevenueStyled,
  TotalRevenueValueStyled,
  RevenueInfoWrapperStyled,
} from './SalesPage.js';

import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';

import moment from 'moment';

import { authClientInstance } from 'utils/http-client.js';

import useHeaderStore from 'stores/common/useHeaderStore.js';

import { ReactComponent as LeftArrow } from 'assets/icons/manager/statistics/arrow-left-carrot.svg';
import { ReactComponent as RightArrow } from 'assets/icons/manager/statistics/arrow-right-carrot.svg';

import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const SalesPage = () => {
  const {
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
    setIsShowLogo,
    setIconAction,
  } = useHeaderStore();

  const currentDate = new Date();

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState({});
  const [statistics, setStatistics] = useState({
    revenues: {},
    totalRevenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsCarrot(false);
    setIsShowBackIcon(true);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setPageName('월 매출 현황');
    setIsShowLogo(false);
    setIconAction([() => navigate('/manager/alarm')]);
    fetchStatistics(currentYear, currentMonth);
  }, []);

  useEffect(() => {
    fetchStatistics(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const fetchStatistics = async (year, month) => {
    try {
      const response = await authClientInstance.get(
        `/api/restaurants/statistics/revenue?year=${year}&month=${month}`
      );
      const data = response.data.data;

      setStatistics({
        revenues: data.revenues,
        totalRevenue: data.totalRevenue,
      });
    } catch (error) {
      console.error('월 매출 데이터 요청 실패', error);
    }
  };

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
      if (
        currentDate.getMonth() + 1 === prevMonth &&
        currentDate.getFullYear() === currentYear
      ) {
        return prevMonth;
      }

      if (prevMonth === 12) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prevMonth + 1;
    });
  };

  // 달력의 각 날짜에 들어갈 content
  const addContent = (props) => {
    const { date, view } = props;
    // 캘린더 뷰가 month일 때만 내용 추가
    if (view === 'month') {
      const contents = [];

      const formattedDate = moment(date).format('YYYY-MM-DD'); // 로컬 시간대 기준으로 변환
      const revenueData = statistics.revenues[formattedDate]; // 해당 날짜의 매출 데이터 가져오기

      if (revenueData) {
        contents.push(
          <CircleWrapper key={formattedDate}>
            <CountText>{revenueData.revenue.toLocaleString()} 원</CountText>
          </CircleWrapper>
        );
      }

      // contents 배열을 반환하여 렌더링
      return <div>{contents}</div>;
    }
    return null;
  };

  const handleDateClick = (date) => {
    const yearMonthDay = moment(date).format('YYYY-MM-DD');
    if (!Object.keys(statistics.revenues).includes(yearMonthDay)) {
      setSelectedDate(null);
      return;
    }
    const formattedDate = moment(date).format('YYYY-MM-DD'); // 로컬 시간대 기준으로 변환
    const revenueData = statistics.revenues[formattedDate] || {};
    setSelectedDate(formattedDate);
    setSelectedRevenue(revenueData);
  };

  return (
    <SalesPageStyled>
      <SalesPageWrapperStyled>
        <SalesPageHeaderStyled>
          <LeftArrow className="arrow" onClick={handlePreviousMonth} />
          <DateStyled>
            {currentYear}.{currentMonth.toString().padStart(2, '0')}
          </DateStyled>
          <RightArrow className="arrow" onClick={handleNextMonth} />
        </SalesPageHeaderStyled>
        <TotalRevenueStyled>
          총 매출
          <TotalRevenueValueStyled>
            {statistics.totalRevenue.toLocaleString()}
          </TotalRevenueValueStyled>
          원
        </TotalRevenueStyled>
        <CalendarWrapper>
          <CalendarStyled
            key={`${currentYear}-${currentMonth}-${statistics.totalRevenue}`}
            showNeighboringMonth={false}
            tileContent={addContent}
            onClickDay={handleDateClick}
            value={
              selectedDate
                ? new Date(selectedDate)
                : new Date(currentYear, currentMonth - 1)
            }
          />
        </CalendarWrapper>

        {selectedDate && (
          <RevenueInfoWrapperStyled>
            <div>{selectedDate}</div>
            <div>
              매출:{' '}
              {selectedRevenue.revenue
                ? selectedRevenue.revenue.toLocaleString()
                : 0}{' '}
              원
            </div>
            <div>예약 : {selectedRevenue.reservationCnt || 0} 건</div>
          </RevenueInfoWrapperStyled>
        )}
      </SalesPageWrapperStyled>
    </SalesPageStyled>
  );
};

export default SalesPage;

const CircleWrapper = styled.div`
  display: flex;
  margin: 0 3px;
`;

const CountText = styled.p`
  font-size: 8px;
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: 10px;
  }
`;

const CalendarWrapper = styled.div`
  text-align: -webkit-center;
  border-radius: 8px;
  margin: 10px;
  border: 1px solid ${theme.color.gray};
`;

const CalendarStyled = styled(Calendar)`
  .react-calendar {
    width: 90%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    line-height: 1.125em;
    text-align: -webkit-center;
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__tile {
    border: 0.5px solid ${theme.color.gray};
    background: white;
    height: 2.5rem;
    width: 40px;
    font-weight: bold;
    font-size: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    @media (min-width: 480px) {
      height: 4rem;
      font-size: 15px;
    }
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #ff6528;
    color: white;
    border-radius: 6px;
    border: none;
    font-weight: bold;
  }
  .react-calendar__tile--now {
    background: #fff1aa;
    border-radius: 6px;
    font-weight: bold;
    color: black;
    border: none;
  }
  .react-calendar__tile--active {
    background: #ff6528;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    border: none;
  }
`;
