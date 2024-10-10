import React, { useRef, useEffect, useState } from 'react';
import useReservationStore from '../../../stores/customer/useReservationStore.js';
import {
  InputFieldContainer,
  InputFieldText,
  InputFieldContent,
  BoxStyled,
  CalendarContainer,
  CalendarWrapper,
  CalendarStyled,
  StyledSelect,
  // WETextfieldWrapper,
} from './MapFilterModalBox';
import WETextfield from '../../common/textfield/WETextfield/WETextfield.jsx';
import moment from 'moment';
import CalendarImg from '../../../assets/icons/common/calendar.svg';
import useMapFilterStore from 'stores/map/useMapFilterStore';
import styled from '@emotion/styled';

const MapFilterModalBox = () => {
  const {
    lunchTimes,
    dinnerTimes,
    reservationDate,
    memberCount,
    setReservationDate,
    setStartTime,
    setEndTime,
    setMemberCount,
  } = useReservationStore();

  const { setCategoryId, setKeyword } = useMapFilterStore();
  const allTimes = [...lunchTimes, ...dinnerTimes];
  const categories = JSON.parse(localStorage.getItem('categories')) || [];

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedVisitTime, setSelectedVisitTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const calendarRef = useRef(null);

  const handleDateChange = (date) => {
    setReservationDate(moment(date).format('YYYY-MM-DD'));
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setIsCalendarVisible(false);
    }
  };

  const handleMemberCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setMemberCount(value);
  };

  const handleCategoryChange = (e) => {
    const selectedCat = categories.find(
      (cat) => cat.restaurantCategoryName === e.target.value
    );
    const categoryId = selectedCat ? selectedCat.restaurantCategoryId : -1;
    setCategoryId(categoryId);
    setSelectedCategory(e.target.value);
    setKeyword(e.target.value); // 키워드를 카테고리 이름으로 설정
  };

  const NumberInputStyled = styled(WETextfield)`
    /* 기본 스타일 */
    appearance: textfield;

    /* 화살표 크기 조정 */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      width: 20px;
      height: 20px;
    }

    /* Firefox에서 화살표 숨기기 */
    -moz-appearance: textfield;
  `;

  useEffect(() => {
    if (isCalendarVisible)
      document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarVisible]);

  return (
    <>
      <InputFieldContainer>
        <InputFieldText>인원 수</InputFieldText>
        <InputFieldContent>
          <NumberInputStyled
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
        <InputFieldText>방문 날짜</InputFieldText>
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
                minDate={new Date()} // 오늘 날짜 이전은 선택 불가
                formatDay={(locale, date) => moment(date).format('DD')}
              />
            </CalendarWrapper>
          )}
        </CalendarContainer>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText>방문 시작 시간</InputFieldText>
        <InputFieldContent>
          <StyledSelect
            value={selectedVisitTime}
            onChange={(e) => {
              setSelectedVisitTime(e.target.value);
              setStartTime(e.target.value + ':00');
            }}
          >
            <option value="" disabled>
              방문 시간을 선택하세요
            </option>
            {allTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </StyledSelect>
        </InputFieldContent>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText>방문 종료 시간</InputFieldText>
        <InputFieldContent>
          <StyledSelect
            value={selectedEndTime}
            onChange={(e) => {
              setSelectedEndTime(e.target.value);
              setEndTime(e.target.value + ':00');
            }}
          >
            <option value="" disabled>
              방문 종료 시간을 선택하세요
            </option>
            {allTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </StyledSelect>
        </InputFieldContent>
      </InputFieldContainer>

      <InputFieldContainer>
        <InputFieldText>카테고리</InputFieldText>
        <InputFieldContent>
          <StyledSelect
            value={selectedCategory}
            onChange={handleCategoryChange} // 카테고리 변경 함수 적용
          >
            <option value="" disabled>
              카테고리를 선택하세요
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.restaurantCategoryName}>
                {category.restaurantCategoryName}
              </option>
            ))}
          </StyledSelect>
        </InputFieldContent>
      </InputFieldContainer>
    </>
  );
};

export default MapFilterModalBox;
