import useReservationStore from '../../../stores/customer/useReservationStore.js';
import { InputFieldContainer, InputFieldText } from './MapFilterModalBox';
import { useEffect } from 'react';
import WETextfield from '../../common/textfield/WETextfield/WETextfield.jsx';
import {
  useVisitTimeDropdownStore,
  useDurationDropdownStore,
} from '../../../stores/common/dropdown/useDropdownStore.js';
import WEDropdown from '../../common/dropdown/WEDropdown.jsx';
import moment from 'moment';
import { CalendarWrapper, CalendarStyled } from './MapFilterModalBox.js';

const MapFilterModalBox = () => {
  const {
    selectedHeadCount,
    setSelectedHeadCount,
    lunchTimes,
    dinnerTimes,
    selectedDate,
    selectedStartTime,
    setSelectedStartTime,
    durationTimes,
    selectedDurationTime,
    setSelectedDurationTime,
  } = useReservationStore();

  const {
    visitTimePlaceholder,
    setItems: setVisitTimeItems,
    selectedId: selectedVisitTimeId,
  } = useVisitTimeDropdownStore();

  const {
    durationPlaceholder,
    setItems: setDurationItems,
    selectedId: selectedDurationId,
  } = useDurationDropdownStore();

  const allTimes = [...lunchTimes, ...dinnerTimes];

  // 시작 시간 드롭다운 목록생성
  useEffect(() => {
    setVisitTimeItems(allTimes);
  }, []);

  // 시작 시간 선택
  useEffect(() => {
    if (selectedVisitTimeId !== -1) {
      {
        setSelectedStartTime(allTimes[selectedVisitTimeId]);
      }
    }
  }, [selectedVisitTimeId]);

  // 머무는 시간 드롭다운 목록생성
  useEffect(() => {
    setDurationItems(durationTimes);
  }, []);

  // 머무는 시간 선택
  useEffect(() => {
    if (selectedDurationId !== -1) {
      setSelectedDurationTime(durationTimes[selectedDurationId]);
    }
  }, [selectedDurationId]);

  console.log(selectedHeadCount);
  console.log(selectedStartTime);
  console.log(selectedDurationTime);

  //   const handleDateChange = (date) => {
  //     console.log(date);
  //     setSelectedDate(moment(date).format('MM.DD'));
  //     setSelectedStartTime('00:00');
  //     setSelectedEndTime('00:00');
  //     handleTimeSelectButtonClick();
  //   };

  return (
    <>
      <InputFieldContainer>
        <InputFieldText>인원 수</InputFieldText>
        <WETextfield
          name="personnel"
          placeholder="최대가능인원 6"
          value={selectedHeadCount}
          onChange={(e) => {
            setSelectedHeadCount(e.target.value);
          }}
          width="70%"
        />
        <InputFieldText>명</InputFieldText>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText> 방문 날짜</InputFieldText>
        <CalendarWrapper>
          <CalendarStyled
            showNeighboringMonth={false}
            // onChange={handleDateChange}
            value={moment(selectedDate, 'MM.DD').toDate()}
            formatDay={(locale, date) => moment(date).format('DD')}
          />
        </CalendarWrapper>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText>방문 시간</InputFieldText>
        {/* 시작시간 드롭다운 */}
        <WEDropdown
          useDropdownStore={useVisitTimeDropdownStore}
          placeholder={visitTimePlaceholder}
        />
        {/* 머무는 시간 드롭다운 */}
        <WEDropdown
          useDropdownStore={useDurationDropdownStore}
          placeholder={durationPlaceholder}
        />
      </InputFieldContainer>
    </>
  );
};

export default MapFilterModalBox;
