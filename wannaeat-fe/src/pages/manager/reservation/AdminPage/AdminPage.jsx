import { useEffect, useState, useRef } from 'react';
import useHeaderStore from '../../../../stores/common/useHeaderStore';
import moment from 'moment';
import { getReservationInfoByDay } from 'api/manager/reservation/reservation.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  CircleWrapper,
  CarrotCircle,
  GrayCircle,
  CountText,
  ReservationManagePageContainer,
  CalendarWrapper,
  CalendarStyled,
  TabContainer,
  Tab,
  ReservationInfoContainer,
  ReservationInfoItem,
  ReservationInfoImage,
  ReservationInfoText,
  ReservationTopInfo,
  ReservationText,
  ReservationBottomInfo,
} from './AdminPage.js';
import useAnimationStore from 'stores/common/useAnimationStore';
import useAlert from '../../../../utils/alert.js';

const AdminPage = () => {
  const showAlert = useAlert();
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
  const [reservationList, setReservationList] = useState([]);
  const navigate = useNavigate();

  const prevLocation = useRef(null); // 이전 URL을 저장할 변수
  const location = useLocation();
  const { beforeUrl } = useAnimationStore();

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 이전 URL을 기록
    prevLocation.current = location.pathname;
    console.log('prevLocation.current', prevLocation.current);
    setIsCommingFromDetailPage(
      prevLocation.current === '/manager/admin/detail'
    );
  }, [location]);

  useEffect(() => {
    setReservationList([
      {
        reservationId: 0,
        reservationStartTime: '11:00',
        reservationEndTime: '11:30',
        reservationTableList: [2],
        memberCount: 5,
      },
      {
        reservationId: 1,
        reservationStartTime: '12:00',
        reservationEndTime: '13:30',
        reservationTableList: [2],
        memberCount: 5,
      },
      {
        reservationId: 2,
        reservationStartTime: '13:00',
        reservationEndTime: '14:00',
        reservationTableList: [3],
        memberCount: 3,
      },
      {
        reservationId: 3,
        reservationStartTime: '14:00',
        reservationEndTime: '15:00',
        reservationTableList: [3],
        memberCount: 3,
      },
    ]);
  }, []);
  const [isCommingFromDetailPage, setIsCommingFromDetailPage] = useState(false);
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

    if (beforeUrl === '/manager/admin/detail') {
      setIsCommingFromDetailPage(true);
    } else {
      setIsCommingFromDetailPage(false);
    }
  }, []);

  // useEffect(() => {
  //   // 방문 예정
  //   if (activeTab === 0) {
  //     setReservationList(reservationDetails.filter((reservation) => {}));
  //   } else if (activeTab === 1) {
  //   } else {
  //   }
  // }, [activeTab]);

  // 날짜가 선택될 때마다 실행되는 함수
  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log(formattedDate);

    // 해당 날짜의 상세 예약 정보를 가져온다
    const fetchReservationDateByDate = async (formattedDate) => {
      const result = await getReservationInfoByDay(formattedDate);

      if (result.status !== 200) {
        showAlert('해당 날짜의 상세 예약 정보 불러오기 실패');
      }
      setReservationDetails(result.data);
    };

    fetchReservationDateByDate(formattedDate);
  };
  // 예약 상세 페이지로 이동
  const handleReservationInfoClick = (id) => {
    navigate('/manager/reservation/reservation-detail/id');
  };

  // 스크롤이 발생 시 페이지ㅣ 이동
  const onScrollFunction = (e) => {
    console.log(e.deltaY);
    if (e.deltaY > 0) {
      navigate('/manager/admin/detail');
    }
  };
  return (
    <>
      {isCommingFromDetailPage ? (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5 }}
          onWheel={(e) => onScrollFunction(e)}
          id="scroll"
        >
          <CalendarWrapper>
            <CalendarStyled
              showNeighboringMonth={false}
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={addContent}
              formatDay={(locale, date) => moment(date).format('DD')}
            />
          </CalendarWrapper>
          <TabContainer>
            <Tab onClick={() => setActiveTab(0)} active={activeTab === 0}>
              <p>방문 예정</p>
              <hr></hr>
            </Tab>
            <Tab onClick={() => setActiveTab(1)} active={activeTab === 1}>
              <p>방문중</p>
              <hr></hr>
            </Tab>
            <Tab onClick={() => setActiveTab(2)} active={activeTab === 2}>
              <p>방문 완료</p>
              <hr></hr>
            </Tab>
          </TabContainer>
          <ReservationInfoContainer>
            {reservationList.map((reservation) => (
              <ReservationInfoItem
                onClick={() =>
                  handleReservationInfoClick(reservation.reservationId)
                }
                key={reservation.reservationId}
              >
                <ReservationInfoImage />
                <ReservationInfoText>
                  <ReservationTopInfo>
                    <ReservationText>
                      [
                      {activeTab === 0
                        ? '방문 예정'
                        : activeTab === 1
                          ? '방문 중'
                          : '방문 완료'}
                      ]
                    </ReservationText>
                    <ReservationText>
                      {reservation.reservationStartTime}~
                      {reservation.reservationEndTime}
                    </ReservationText>
                  </ReservationTopInfo>
                  <ReservationBottomInfo>
                    <ReservationText>
                      {reservation.reservationTableList.map((table) => (
                        <ReservationText key={table}>{table} </ReservationText>
                      ))}
                    </ReservationText>
                    <ReservationText>번 테이블&nbsp;</ReservationText>
                    <ReservationText>
                      {reservation.memberCount}명
                    </ReservationText>
                  </ReservationBottomInfo>
                </ReservationInfoText>
              </ReservationInfoItem>
            ))}
          </ReservationInfoContainer>
        </motion.div>
      ) : (
        <div onWheel={(e) => onScrollFunction(e)} id="scroll">
          <CalendarWrapper>
            <CalendarStyled
              showNeighboringMonth={false}
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={addContent}
              formatDay={(locale, date) => moment(date).format('DD')}
            />
          </CalendarWrapper>
          <TabContainer>
            <Tab onClick={() => setActiveTab(0)} active={activeTab === 0}>
              <p>방문 예정</p>
              <hr></hr>
            </Tab>
            <Tab onClick={() => setActiveTab(1)} active={activeTab === 1}>
              <p>방문중</p>
              <hr></hr>
            </Tab>
            <Tab onClick={() => setActiveTab(2)} active={activeTab === 2}>
              <p>방문 완료</p>
              <hr></hr>
            </Tab>
          </TabContainer>
          <ReservationInfoContainer>
            {reservationList.map((reservation) => (
              <ReservationInfoItem
                onClick={() =>
                  handleReservationInfoClick(reservation.reservationId)
                }
                key={reservation.reservationId}
              >
                <ReservationInfoImage />
                <ReservationInfoText>
                  <ReservationTopInfo>
                    <ReservationText>
                      [
                      {activeTab === 0
                        ? '방문 예정'
                        : activeTab === 1
                          ? '방문 중'
                          : '방문 완료'}
                      ]
                    </ReservationText>
                    <ReservationText>
                      {reservation.reservationStartTime}~
                      {reservation.reservationEndTime}
                    </ReservationText>
                  </ReservationTopInfo>
                  <ReservationBottomInfo>
                    <ReservationText>
                      {reservation.reservationTableList.map((table) => (
                        <ReservationText key={table}>{table} </ReservationText>
                      ))}
                    </ReservationText>
                    <ReservationText>번 테이블&nbsp;</ReservationText>
                    <ReservationText>
                      {reservation.memberCount}명
                    </ReservationText>
                  </ReservationBottomInfo>
                </ReservationInfoText>
              </ReservationInfoItem>
            ))}
          </ReservationInfoContainer>
        </div>
      )}
    </>
  );
};
export default AdminPage;
