import { useEffect, useState } from 'react';
import useHeaderStore from '../../../../stores/common/useHeaderStore';
import styled from '@emotion/styled/macro';
import moment from 'moment';
import theme from '../../../../style/common/theme';
import Calendar from 'react-calendar';
import WETab from '../../../../component/common/tab/WETab/WETab.jsx';
import { getReservationInfoByDay } from 'api/manager/reservation/reservation.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore';
const AdminPage = () => {
  const {
    setIsCarrot,
    setPageName,
    setActiveIcons,
    setIsUnderLine,
    setIsShowLogo,
  } = useHeaderStore();
  const { reservationDetails, setReservationDetails } = useMyRestaurantStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['방문 예정', '방문 중', '방문 완료'];
  const [reservationList, setReservationList] = useState([]);
  const dayList = [
    '2024-10-10',
    '2024-10-11',
    '2024-10-20',
    '2024-10-21',
    '2024-10-30',
  ];

  const reservationCount = {
    '2024-10-10': {
      visited: 3,
      willVisit: 5,
    },
    '2024-10-11': {
      visited: 2,
      willVisit: 7,
    },
    '2024-10-20': {
      visited: 4,
      willVisit: 6,
    },
    '2024-10-21': {
      visited: 5,
      willVisit: 3,
    },
    '2024-10-30': {
      visited: 6,
      willVisit: 4,
    },
  };

  // 달력의 각 날짜에 들어갈 content
  const addContent = ({ date }) => {
    const contents = [];
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      contents.push(
        <div>
          <CircleWrapper>
            <CarrotCircle />
            <CountText>
              {reservationCount[moment(date).format('YYYY-MM-DD')].willVisit}
            </CountText>
          </CircleWrapper>

          <CircleWrapper>
            <GrayCircle />
            <CountText>
              {reservationCount[moment(date).format('YYYY-MM-DD')].visited}
            </CountText>
          </CircleWrapper>
        </div>
      );
    }
    return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  useEffect(() => {
    setPageName('예약 관리');
    setIsCarrot(false);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setIsShowLogo(false);
  }, []);

  useEffect(() => {
    // 방문 예정
    if (activeTab === 0) {
      setReservationList(reservationDetails.filter((reservation) => {}));
    } else if (activeTab === 1) {
    } else {
    }
  }, [activeTab]);

  // 날짜가 선택될 때마다 실행되는 함수
  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log(formattedDate);

    // 해당 날짜의 상세 예약 정보를 가져온다
    const fetchReservationDateByDate = async (formattedDate) => {
      const result = await getReservationInfoByDay(formattedDate);

      if (result.status !== 200) {
        alert('해당 날짜의 상세 예약 정보 불러오기 실패');
      }
      setReservationDetails(result.data);
    };

    fetchReservationDateByDate(formattedDate);
  };

  return (
    <ReservationManagePageContainer>
      <CalendarWrapper>
        <CalendarStyled
          showNeighboringMonth={false}
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={addContent}
          formatDay={(locale, date) => moment(date).format('DD')}
        />
      </CalendarWrapper>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </ReservationManagePageContainer>
  );
};

export default AdminPage;

const CircleWrapper = styled.div`
  display: flex;
  margin: 0 3px;
`;
const CarrotCircle = styled.div`
  width: 7px;
  height: 7px;
  background-color: ${theme.color.statisticsPink};
  border-radius: 50%;
  margin-right: 4px;
  @media (min-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;
const GrayCircle = styled.div`
  width: 7px;
  height: 7px;
  background-color: ${theme.color.disabled};
  border-radius: 50%;
  margin-right: 4px;
  @media (min-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

const CountText = styled.p`
  font-size: 8px;
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: 10px;
  }
`;
const ReservationManagePageContainer = styled.div``;

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
