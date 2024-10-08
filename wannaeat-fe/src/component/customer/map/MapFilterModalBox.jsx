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
import useMapFilterStore from 'stores/map/useMapFilterStore';
const MapFilterModalBox = () => {
  const {
    lunchTimes,
    dinnerTimes,
    durationTimes,
    setSelectedDurationTime,
    reservationDate,
    memberCount,
    setReservationDate,
    setStartTime,
    setMemberCount,
  } = useReservationStore();

  const { setCategoryId } = useMapFilterStore();

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

  const { setItems, isShowOption, selectedId } = useDropdownStore();

  const allTimes = [...lunchTimes, ...dinnerTimes]; // 오전 오후 포함한 모든 시간

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const calendarRef = useRef(null);

  const handleDateChange = (date) => {
    setReservationDate(moment(date).format('YYYY-MM-DD'));
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

  // 인원 수가 변경될때마다 호출되는 함수
  const handleMemberCountChange = (e) => {
    console.log(e.target.value);

    if (e.target.value <= 0) {
      alert('0명 이상 입력하세요.');
      return;
    }

    setMemberCount(parseInt(e.target.value));
    console.log(memberCount);
  };

  // 카테고리가 선택되면 호출되는 함수
  const handleCategoryOnSelect = (e) => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const categoryId = categories.filter(
      (category) => category.restaurantCategoryName === e
    )[0].restaurantCategoryId;
    setCategoryId(categoryId);
  };

  // 시작 시간이 선택되면 호출되는 함수
  const handleStartTimeOnSelect = (e) => {
    console.log(e + ':00');
    setStartTime(e + ':00');
  };

  // 머무는 시간이 선택되면 호출되는 함수
  const handleDurationTimeOnSelect = (e) => {
    setSelectedDurationTime(e);
    console.log('selectedDurationId,', selectedDurationId);
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

  return (
    <>
      <InputFieldContainer>
        <InputFieldText>인원 수</InputFieldText>
        <InputFieldContent>
          <WETextfield
            name="personnel"
            placeholder="인원수를 선택해주세요"
            value={memberCount === -1 ? '' : memberCount}
            type="number"
            onChange={handleMemberCountChange}
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
            {reservationDate || '날짜를 선택하세요'}
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
            onSelect={handleStartTimeOnSelect}
            useDropdownStore={useVisitTimeDropdownStore}
            placeholder={visitTimePlaceholder}
          />
          {/* 머무는 시간 드롭다운 */}
          <WEDropdown
            onSelect={handleDurationTimeOnSelect}
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
            onSelect={handleCategoryOnSelect}
          />
        </InputFieldContent>
      </InputFieldContainer>
    </>
  );
};

export default MapFilterModalBox;
