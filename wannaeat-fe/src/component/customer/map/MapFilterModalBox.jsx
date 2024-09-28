import { useRef } from 'react';
import useReservationStore from '../../../stores/customer/useReservationStore.js';
import {
  InputFieldContainer,
  InputFieldText,
  InputFieldContent,
  BoxStyled,
  CalendarContainer,
  CalendarWrapper,
  CalendarStyled,
} from './MapFilterModalBox';
import { useEffect, useState } from 'react';
import WETextfield from '../../common/textfield/WETextfield/WETextfield.jsx';
import {
  useDropdownStore,
  useVisitTimeDropdownStore,
  useDurationDropdownStore,
} from '../../../stores/common/useDropdownStore.js';
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

  const calendarRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // 달력 외부 클릭 시 달력을 닫는 함수
  const handleClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setIsCalendarVisible(false);
    }
  };

  // 외부 클릭 감지
  useEffect(() => {
    if (isCalendarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarVisible]);

  const {
    visitTimePlaceholder,
    setItems: setVisitTimeItems,
    selectedId: selectedVisitTimeId,
    isShowOption: isShowVisitTimeOption,
  } = useVisitTimeDropdownStore();

  const {
    durationPlaceholder,
    setItems: setDurationItems,
    selectedId: selectedDurationId,
    isShowOption: isShowDurationOption,
  } = useDurationDropdownStore();

  const { setItems, isShowOption, items } = useDropdownStore();

  const allTimes = [...lunchTimes, ...dinnerTimes]; // 오전 오후 포함한 모든 시간

  useEffect(() => {
    // 시작 시간 드롭다운 목록생성
    setVisitTimeItems(allTimes);

    // 머무는 시간 드롭다운 목록생성
    setDurationItems(durationTimes);
    console.log(
      typeof JSON.parse(localStorage.getItem('categories')).map((category) => ({
        item: category.restaurantCategoryName,
        index: category.restaurantCategoryId,
      }))
    );

    setItems(
      JSON.parse(localStorage.getItem('categories')).map(
        (category) => category.restaurantCategoryName
      )
    );
  }, []);

  // 시작 시간 선택
  useEffect(() => {
    if (selectedVisitTimeId !== -1) {
      {
        setSelectedStartTime(allTimes[selectedVisitTimeId]);
      }
    }
  }, [selectedVisitTimeId]);

  // 머무는 시간 선택
  useEffect(() => {
    if (selectedDurationId !== -1) {
      setSelectedDurationTime(durationTimes[selectedDurationId]);
    }
  }, [selectedDurationId]);

  return (
    <>
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

      <InputFieldContainer isCalendarVisible={isCalendarVisible}>
        <InputFieldText> 방문 날짜</InputFieldText>
        <CalendarContainer>
          <BoxStyled
            onClick={toggleCalendar}
            style={{
              backgroundImage: `url(${CalendarImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left 10px center',
            }}
          >
            {selectedDate || '날짜를 선택하세요'}
          </BoxStyled>
          {isCalendarVisible && (
            <CalendarWrapper ref={calendarRef}>
              <CalendarStyled
                showNeighboringMonth={false}
                onChange={handleDateChange}
                value={moment(new Date(), 'YYYY-MM-DD').toDate()}
                formatDay={(locale, date) => moment(date).format('DD')}
              />
            </CalendarWrapper>
          )}
        </CalendarContainer>
      </InputFieldContainer>

      <InputFieldContainer
        isShowOption={isShowVisitTimeOption || isShowDurationOption}
      >
        <InputFieldText>방문 시간</InputFieldText>
        <InputFieldContent
          isShowOption={isShowVisitTimeOption || isShowDurationOption}
        >
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

      <InputFieldContainer isShowOption={isShowOption}>
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
