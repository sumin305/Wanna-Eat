import { useEffect, useState, useRef } from 'react';
import useHeaderStore from '../../../../stores/common/useHeaderStore';
import moment from 'moment';
import {
  getReservationInfoByDay,
  getReservationInfoByMonth,
} from 'api/manager/reservation/reservation.js';
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
  const {
    reservationDetails,
    setReservationDetails,
    reservationList,
    setReservationList,
  } = useMyRestaurantStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState('');
  const [activeTab, setActiveTab] = useState(0);
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
    // 현재 날짜 가져오기
    const currentDate = moment();
    // 년도와 월 숫자 파싱
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month() + 1; // month()는 0부터 시작하므로 +1

    console.log('현재 년도:', currentYear);
    console.log('현재 월:', currentMonth);

    fetchReservationInfo(currentYear, currentMonth);

    const newDate = moment(new Date()).format('YYYY-MM-DD');
    setDate(newDate);

    fetchReservationInfoByDay(newDate, 0, 10);
  }, []);

  const fetchReservationInfo = async (year, month) => {
    const result = await getReservationInfoByMonth(year, month);
    if (result.status !== 200) {
      console.log('예약 조회 실패');
      return;
    }
    setReservationCount(result.data.data.reservationCounts);
  };

  const fetchReservationInfoByDay = async (date, page, size) => {
    const result = await getReservationInfoByDay(date, page, size);
    if (result.status !== 200) {
      console.log('예약 조회 실패');
      return;
    }
    setReservationList(result.data.data.reservations);
  };
  const [isCommingFromDetailPage, setIsCommingFromDetailPage] = useState(false);
  const [reservationCount, setReservationCount] = useState({});

  // 달력의 각 날짜에 들어갈 content
  const addContent = ({ date }) => {
    const contents = [];
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (
      Object.keys(reservationCount).find(
        (day) => day === moment(date).format('YYYY-MM-DD')
      )
    ) {
      contents.push(
        <div>
          <CircleWrapper>
            <CarrotCircle />
            <CountText>
              {reservationCount[moment(date).format('YYYY-MM-DD')].reserved}
            </CountText>
          </CircleWrapper>

          <CircleWrapper>
            <GrayCircle />
            <CountText>
              {reservationCount[moment(date).format('YYYY-MM-DD')].cancelled}
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

  // 달력이 바뀔 때 호출되는 함수
  const handleMonthChange = ({ activeStartDate }) => {
    const newYear = moment(activeStartDate).year();
    const newMonth = moment(activeStartDate).month() + 1;

    fetchReservationInfo(newYear, newMonth);
  };

  // 날짜가 선택될 때마다 실행되는 함수
  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log(formattedDate);
    setDate(formattedDate);
    fetchReservationInfoByDay(formattedDate, 0, 10);
    setSelectedDate(formattedDate);
  };
  // 예약 상세 페이지로 이동
  const handleReservationInfoClick = (id) => {
    navigate('/manager/reservation/reservation-detail/' + id);
  };

  // 스크롤이 발생 시 페이지 이동
  const onScrollFunction = (e) => {
    console.log(e.deltaY);
    if (e.deltaY > 0) {
      console.log(date);
      navigate('/manager/admin/detail/' + date);
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
              onActiveStartDateChange={handleMonthChange} // 달력이 바뀔 때 호출
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
                      {reservation.reservationTableList &&
                        reservation.reservationTableList.map((table) => (
                          <ReservationText key={table}>
                            {table}{' '}
                          </ReservationText>
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
                      {reservation.tableList &&
                        reservation.tableList.map((table) => (
                          <ReservationText key={table}>
                            {table} &nbsp;
                          </ReservationText>
                        ))}
                    </ReservationText>
                    <ReservationText>번 테이블 &nbsp;</ReservationText>
                    <ReservationText>{reservation.memberCnt}명</ReservationText>
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
