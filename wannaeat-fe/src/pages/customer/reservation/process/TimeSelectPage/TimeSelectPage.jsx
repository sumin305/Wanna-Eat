import WEStep from '../../../../../component/customer/reservation/WEStep/WEStep.jsx';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import theme from '../../../../../style/common/theme.js';
import {
  TimeSelectPageContainer,
  ButtonWrapper,
  CalendarWrapper,
  CalendarStyled,
} from './TimeSelectPage.js';
import useModalStore from '../../../../../stores/common/useModalStore.js';
import TimeSelectModalBox from '../../../../../component/customer/reservation/TimeSelectModalBox/TimeSelectModalBox.jsx';
import useReservationStore from '../../../../../stores/customer/useReservationStore.js';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { authClientInstance } from 'utils/http-client.js';

import useRestaurantStore from 'stores/customer/useRestaurantStore.js';

const TimeSelectPage = () => {
  const { restaurant, restaurantId } = useRestaurantStore();

  const { open, setModalType, setConfirmText, setTitle, setChildren } =
    useModalStore();
  const {
    reservationDate,
    startTime,
    endTime,
    memberCount,
    setReservationDate,
    setStartTime,
    setEndTime,
    setSelectedTimes,
  } = useReservationStore();

  const navigate = useNavigate();
  useEffect(() => {
    const setDate = async () => {
      await setReservationDate(
        reservationDate !== ''
          ? reservationDate
          : moment(new Date()).format('YYYY-MM-DD')
      );
    };
    setDate();
  }, []);

  const handleTimeSelectButtonClick = () => {
    setModalType('sheet');
    setConfirmText('확인');
    setTitle('예약 정보 입력');
    setChildren(<TimeSelectModalBox />);
    open();
  };

  const handleDateChange = (date) => {
    setReservationDate(moment(date).format('YYYY-MM-DD'));
    setStartTime('00:00');
    setEndTime('00:00');
    setSelectedTimes([]);
    handleTimeSelectButtonClick();
  };

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };
  const handleNextButtonClick = () => {
    if (startTime === '00:00') {
      alert('시간을 선택하세요.');
      return;
    } else if (reservationDate === '') {
      alert('날짜를 선택하세요');
    } else if (memberCount === -1) {
      alert('인원수를 입력하세요.');
      return;
    }

    checkSeatData(restaurantId, reservationDate, startTime, endTime);
  };

  const checkSeatData = async (restaurantId, date, startTime, endTime) => {
    try {
      const response = await authClientInstance.get(
        `/api/restaurants/${restaurantId}/reservations/available-tables?date=${date}&startTime=${startTime}&endTime=${endTime}`
      );

      if (response.status === 200) {
        navigate('/customer/reservation/seat-select', {
          state: { tableData: response.data.data },
        });
      }
    } catch (error) {
      if (error.response.status === 404) {
        window.alert('예약 가능한 좌석이 없습니다!');
      }
      console.error('예약 가능 좌석 데이터 요청 실패', error);
    }
  };

  return (
    <TimeSelectPageContainer>
      <WEStep index={0} />
      <div>
        <Button
          size="long"
          outlined={true}
          onClick={handleTimeSelectButtonClick}
          fontWeight={900}
          fontSize={'1rem'}
        >
          {moment(reservationDate).format('YYYY-MM-DD')} {startTime} ~ {endTime}{' '}
          {!memberCount || memberCount === -1 ? 0 : memberCount}명
        </Button>
        <CalendarWrapper>
          <CalendarStyled
            showNeighboringMonth={false}
            onChange={handleDateChange}
            value={reservationDate}
            formatDay={(locale, date) => moment(date).format('DD')}
            minDate={new Date()} // 오늘 날짜 이전은 선택 불가
          />
        </CalendarWrapper>
      </div>
      <ButtonWrapper>
        <Button
          onClick={handleBeforeButtonClick}
          size="short"
          color={'black'}
          backgroundColor={theme.color.disabled}
        >
          이전
        </Button>
        <Button onClick={handleNextButtonClick} size="venti">
          예약
        </Button>
      </ButtonWrapper>
    </TimeSelectPageContainer>
  );
};

export default TimeSelectPage;
