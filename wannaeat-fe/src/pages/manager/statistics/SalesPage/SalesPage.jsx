import { useEffect, useState } from 'react';
import {
  SalesPageStyled,
  SalesPageWrapperStyled,
  SalesPageHeaderStyled,
  DateStyled,
  TotalRevenueStyled,
} from './SalesPage.js';

import Calendar from 'react-calendar';

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
  } = useHeaderStore();

  const currentDate = new Date();

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState({});

  useEffect(() => {
    setIsCarrot(false);
    setIsShowBackIcon(true);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setPageName('월 매출 현황');
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
        `/api/restaurants/statistics/revenue?year=${year}&month=${month}`
      );
      const data = response.data.data;

      console.log(data);

      setStatistics({
        revenues: data.revenues,
        totalRevenue: data.totalRevenue,
      });
    } catch (error) {
      console.error('월 매출 데이터 요청 실패', error);
    }
  };

  const [statistics, setStatistics] = useState({
    revenues: {},
    totalRevenue: 0,
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
  const addContent = ({ date, view }) => {
    // 캘린더 뷰가 month일 때만 내용 추가
    if (view === 'month') {
      const contents = [];

      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
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
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
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
          {' '}
          총 매출 {statistics.totalRevenue} 원
        </TotalRevenueStyled>
        <CalendarWrapper>
          <CalendarStyled
            showNeighboringMonth={false}
            tileContent={addContent}
            onClickDay={handleDateClick}
          />
        </CalendarWrapper>

        {selectedDate && (
          <div>
            <div>날짜: {selectedDate}</div>
            <div>
              매출:{' '}
              {selectedRevenue.revenue
                ? selectedRevenue.revenue.toLocaleString()
                : 0}{' '}
              원
            </div>
            <div>예약 횟수: {selectedRevenue.reservationCnt || 0} 회</div>
          </div>
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
// const ReservationManagePageContainer = styled.div``;

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

  .react-calendar__navigation button {
    color: #ff6528;
    min-width: 30px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
    border: none;
    height: 50px;
  }

  .react-calendar__navigation__label__labelText {
    font-weight: bold;
    color: black;
    border: none;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
    border: none;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
    border: none;
  }
  abbr[title] {
    text-decoration: none;
    border: none;
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
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ff6528;
    color: white;
    border-radius: 6px;
    border: none;
    font-weight: bold;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ff6528;
    border: none;
  }
  .react-calendar__tile--active {
    background: #ff6528;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    border: none;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #ff6528;
    color: white;
    border: none;
    font-weight: bold;
  }
`;
