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

const TimeSelectPage = () => {
  const { open, setModalType, setConfirmText, setTitle, setChildren } =
    useModalStore();
  const {
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    selectedHeadCount,
    setSelectedDate,
    setSelectedStartTime,
    setSelectedEndTime,
  } = useReservationStore();
  const navigate = useNavigate();
  const handleTimeSelectButtonClick = () => {
    setModalType('sheet');
    setConfirmText('확인');
    setTitle('예약 정보 입력');
    setChildren(<TimeSelectModalBox />);
    open();
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    setSelectedStartTime('00:00');
    setSelectedEndTime('00:00');
    handleTimeSelectButtonClick();
  };

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };
  const handleNextButtonClick = () => {
    navigate('/customer/reservation/seat-select');
  };

  var showDate = selectedDate.slice(5).replace('-', '.');

  return (
    <TimeSelectPageContainer>
      <WEStep index={0} />
      <div>
        <Button
          size="long"
          outlined={true}
          onClick={handleTimeSelectButtonClick}
          fontWeight={900}
        >
          {showDate} {selectedStartTime} ~ {selectedEndTime} {selectedHeadCount}
          명
        </Button>
        <CalendarWrapper>
          <CalendarStyled
            showNeighboringMonth={false}
            onChange={handleDateChange}
            value={moment(selectedDate, 'YYYY-MM-DD').toDate()}
            formatDay={(locale, date) => moment(date).format('DD')}
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
