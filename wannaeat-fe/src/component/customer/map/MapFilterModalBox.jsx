import useReservationStore from '../../../stores/customer/reservation/useReservationStore.js';
import {
  InputFieldContainer,
  InputFieldText,
  InputFieldContent,
  CalendarWrapper,
  CalendarStyled,
} from './MapFilterModalBox';
import { useEffect, useState } from 'react';
import WETextfield from '../../common/textfield/WETextfield/WETextfield.jsx';
import {
  useDropdownStore,
  useVisitTimeDropdownStore,
  useDurationDropdownStore,
} from '../../../stores/common/dropdown/useDropdownStore.js';
import WEDropdown from '../../common/dropdown/WEDropdown.jsx';
import moment from 'moment';
import CalendarImg from '../../../assets/icons/common/calendar.svg';
import useCommonStore from '../../../stores/common/useCommonStore.js';

const MapFilterModalBox = () => {
  const {
    selectedHeadCount,
    setSelectedHeadCount,
    lunchTimes,
    dinnerTimes,
    selectedDate,
    setSelectedDate,
    selectedStartTime,
    setSelectedStartTime,
    durationTimes,
    selectedDurationTime,
    setSelectedDurationTime,
    selectedCategory,
    setSelectedCategory,
  } = useReservationStore();

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

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

  const { categories } = useCommonStore();

  const { setItems } = useDropdownStore();

  const allTimes = [...lunchTimes, ...dinnerTimes]; // 오전 오후 포함한 모든 시간

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

  useEffect(() => {
    setItems(categories);
  }, []);

  console.log(selectedHeadCount);
  console.log(selectedDate);
  console.log(selectedStartTime);
  console.log(selectedDurationTime);
  console.log(selectedCategory);

  return (
    <>
      {isCalendarVisible && (
        <CalendarWrapper>
          <CalendarStyled
            showNeighboringMonth={false}
            onChange={handleDateChange}
            value={moment(selectedDate, 'YYYY-MM-DD').toDate()}
            formatDay={(locale, date) => moment(date).format('DD')}
          />
        </CalendarWrapper>
      )}
      <InputFieldContainer>
        <InputFieldText>인원 수</InputFieldText>
        <InputFieldContent>
          <WETextfield
            name="personnel"
            placeholder="최대가능인원 6"
            value={selectedHeadCount}
            onChange={(e) => {
              setSelectedHeadCount(e.target.value);
            }}
          />
          <div>명</div>
        </InputFieldContent>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText> 방문 날짜</InputFieldText>
        <InputFieldContent>
          <WETextfield
            style={{
              backgroundImage: `url(${CalendarImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left center',
            }}
            name="date"
            placeholder=""
            value={selectedDate}
            onChange={(e) => console.log(e)}
            onClick={toggleCalendar}
          />
        </InputFieldContent>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText>방문 시간</InputFieldText>
        <InputFieldContent>
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
        </InputFieldContent>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText>카테고리</InputFieldText>
        <InputFieldContent>
          <WEDropdown
            useDropdownStore={useDropdownStore}
            placeholder="카테고리를 선택하세요"
            onSelect={setSelectedCategory}
          />
        </InputFieldContent>
      </InputFieldContainer>
    </>
  );
};

export default MapFilterModalBox;
