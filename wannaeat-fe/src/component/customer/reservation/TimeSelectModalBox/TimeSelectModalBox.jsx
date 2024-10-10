import useReservationStore from '../../../../stores/customer/useReservationStore.js';
import useRestaurantStore from 'stores/customer/useRestaurantStore.js';
import {
  TimeSelectModalBoxContainer,
  TimeSelectModalTitleStyled,
  TimeSelectModalSubTitleWrapper,
  TimeSelectModalSubTitleStyled,
  TimeSelectModalListContainer,
  TimeSelectModalListItem,
  HeadCountInputWrapper,
} from './TimeSelectModalBox';
import Button from '../../../common/button/WEButton/WEButton';
import theme from '../../../../style/common/theme';
import { useEffect, useState } from 'react';
import Textfield from '../../../common/textfield/WETextfield/WETextfield.jsx';
import moment from 'moment';
import useAlert from 'utils/alert';

// 30분 단위로 시간을 계산하는 함수
const generateTimes = (startTime, endTime, isToday = false) => {
  let times = [];
  let currentTime = moment(startTime, 'HH:mm');
  const now = moment();

  while (currentTime.isBefore(moment(endTime, 'HH:mm'))) {
    // 오늘 날짜인 경우 현재 시간 이후의 시간만 추가
    if (!isToday || currentTime.isAfter(now)) {
      times.push(currentTime.format('HH:mm'));
    }
    currentTime = currentTime.add(30, 'minutes');
  }

  return times;
};

const TimeSelectModalBox = () => {
  const showAlert = useAlert();
  const {
    reservationDate,
    isLunch,
    setIsLunch,
    setStartTime,
    setEndTime,
    setMemberCount,
    setSelectedTimes,
    selectedTimes,
    memberCount,
  } = useReservationStore();

  const { restaurant } = useRestaurantStore();
  console.log('restaurant: ', restaurant);

  const today = moment().format('YYYY-MM-DD');
  const isToday = today === reservationDate;

  // 기본 lunch, dinner 나누는 시간은 16:00
  const defaultBreakStartTime = '16:00';
  const defaultBreakEndTime = '16:00';
  const lunchTimes = generateTimes(
    restaurant.restaurantOpenTime,
    restaurant.breakStartTime
      ? restaurant.breakStartTime
      : defaultBreakStartTime,
    isToday
  );
  const dinnerTimes = generateTimes(
    restaurant.breakEndTime ? restaurant.breakEndTime : defaultBreakEndTime,
    restaurant.restaurantCloseTime,
    isToday
  );
  console.log('lunchTimes', lunchTimes);
  console.log('dinnerTimes', dinnerTimes);

  const [memCnt, setMemCnt] = useState(0);

  useEffect(() => {
    setMemCnt(memberCount === -1 ? 0 : memberCount);
  }, []);

  const handleHeadCountChange = (e) => {
    if (e.target.value === '') {
      setMemCnt(0);
      setMemberCount(0);
    }
    if (e.target.value < 0) {
      showAlert('0명 미만은 불가능합니다.');
      setMemCnt(0);
      return;
    }
    setMemCnt(parseInt(e.target.value));
    setMemberCount(parseInt(e.target.value));
  };

  const handleLunchTimeClick = (index) => {
    if (isLunch) {
      // 이미 선택된 시간일 경우 제거
      if (selectedTimes.includes(lunchTimes[index])) {
        // 해당 시간을 제거할 때 연속되지 않을 경우 제거 실패
        let newSelectedTimes = [...selectedTimes];
        newSelectedTimes = newSelectedTimes.filter(
          (time) => time != lunchTimes[index]
        );

        if (!checkContinuousTime(lunchTimes, newSelectedTimes)) {
          showAlert('연속된 시간만 선택 가능합니다.');
          setSelectedTimes([]);
          return;
        }

        // 제거 완료
        setSelectedTimes(newSelectedTimes);
        setStartEndTime(newSelectedTimes);
        return;
      }

      if (selectedTimes.length >= 4) {
        showAlert('최대 2시간 이용 가능합니다.');
        return;
      }

      // 해당 시간을 추가할 때 연속되지 않을 경우 추가 실패
      let newSelectedTimes = [...selectedTimes];
      newSelectedTimes.push(lunchTimes[index]);
      if (!checkContinuousTime(lunchTimes, newSelectedTimes)) {
        showAlert('연속된 시간만 선택 가능합니다.');
        return;
      }

      // 추가 완료
      setSelectedTimes(newSelectedTimes);
      setStartEndTime(newSelectedTimes);
    } else {
      let newSelectedTimes = [];
      newSelectedTimes.push(lunchTimes[index]);
      setSelectedTimes(newSelectedTimes);
      setStartEndTime(newSelectedTimes);
    }
    setIsLunch(true);
  };

  const handleDinnerTimeClick = (index) => {
    if (!isLunch) {
      // 이미 선택된 시간일 경우 제거
      if (selectedTimes.includes(dinnerTimes[index])) {
        // 해당 시간을 제거할 때 연속되지 않을 경우 제거 실패
        let newSelectedTimes = [...selectedTimes];
        newSelectedTimes = newSelectedTimes.filter(
          (time) => time != dinnerTimes[index]
        );
        if (!checkContinuousTime(dinnerTimes, newSelectedTimes)) {
          showAlert('연속된 시간만 선택 가능합니다.');
          setSelectedTimes([]);
          return;
        }

        // 제거 완료
        setSelectedTimes(newSelectedTimes);
        setStartEndTime(newSelectedTimes);
        return;
      }

      if (selectedTimes.length >= 4) {
        showAlert('최대 2시간 이용 가능합니다.');
        return;
      }

      // 해당 시간을 추가할 때 연속되지 않을 경우 추가 실패
      let newSelectedTimes = [...selectedTimes];
      newSelectedTimes.push(dinnerTimes[index]);
      if (!checkContinuousTime(dinnerTimes, newSelectedTimes)) {
        showAlert('연속된 시간만 선택 가능합니다.');
        return;
      }
      // 추가 완료
      setSelectedTimes(newSelectedTimes);
      setStartEndTime(newSelectedTimes);
    } else {
      let newSelectedTimes = [];
      newSelectedTimes.push(dinnerTimes[index]);
      setSelectedTimes(newSelectedTimes);
      setStartEndTime(newSelectedTimes);
    }
    setIsLunch(false);
  };

  // 연속된 시간 선택 여부 검사 함수
  const checkContinuousTime = (times, selectedTimes) => {
    selectedTimes.sort();
    let beforeIdx = times.indexOf(selectedTimes[0]);
    for (let i = 1; i < selectedTimes.length; i++) {
      if (beforeIdx + 1 !== times.indexOf(selectedTimes[i])) {
        return false;
      }
      beforeIdx = times.indexOf(selectedTimes[i]);
    }
    return true;
  };

  const setStartEndTime = (selectedTimes) => {
    if (selectedTimes.length === 0) {
      setStartTime('00:00');
      setEndTime('00:00');
      return;
    }
    selectedTimes = selectedTimes.sort();
    const startTime = selectedTimes[0];
    setStartTime(startTime);
    const endTime = selectedTimes[selectedTimes.length - 1];
    console.log(selectedTimes, startTime, endTime);
    if (endTime && endTime.split(':')[1] == '00') {
      setEndTime(endTime.split(':')[0] + ':30');
    } else if (endTime && endTime.split(':')[1] == '30') {
      setEndTime(parseInt(endTime.split(':')[0]) + 1 + ':00');
    } else {
      setStartTime('00:00');
      setEndTime('00:00');
    }
  };

  return (
    <TimeSelectModalBoxContainer>
      <TimeSelectModalTitleStyled>시간을 선택하세요</TimeSelectModalTitleStyled>
      <div>
        <TimeSelectModalSubTitleWrapper>
          <TimeSelectModalSubTitleStyled>점심</TimeSelectModalSubTitleStyled>
        </TimeSelectModalSubTitleWrapper>

        <TimeSelectModalListContainer>
          {lunchTimes.map((time, index) => (
            <TimeSelectModalListItem key={index}>
              <Button
                onClick={() => handleLunchTimeClick(index)}
                borderColor={theme.color.disabled}
                color={
                  selectedTimes.includes(time) ? 'white' : theme.color.disabled
                }
                size={'menu'}
                width={'100%'}
                height={'70%'}
                outlined={selectedTimes.includes(time) ? false : true}
                miniOutlined={true}
                fontSize={theme.fontSize.px11}
              >
                {time}
              </Button>
            </TimeSelectModalListItem>
          ))}
        </TimeSelectModalListContainer>
      </div>
      <div>
        <TimeSelectModalSubTitleWrapper>
          <TimeSelectModalSubTitleStyled>저녁</TimeSelectModalSubTitleStyled>
        </TimeSelectModalSubTitleWrapper>
        <TimeSelectModalListContainer>
          {dinnerTimes.map((time, index) => (
            <TimeSelectModalListItem key={index}>
              <Button
                onClick={() => handleDinnerTimeClick(index)}
                borderColor={theme.color.disabled}
                color={
                  selectedTimes.includes(time) ? 'white' : theme.color.disabled
                }
                size={'menu'}
                width={'100%'}
                height={'70%'}
                outlined={selectedTimes.includes(time) ? false : true}
                miniOutlined={true}
                fontSize={theme.fontSize.px11}
                key={index}
              >
                {time}
              </Button>
            </TimeSelectModalListItem>
          ))}
        </TimeSelectModalListContainer>
      </div>

      <TimeSelectModalTitleStyled>
        인원 수를 선택하세요
      </TimeSelectModalTitleStyled>
      <div>
        <TimeSelectModalSubTitleWrapper>
          <TimeSelectModalSubTitleStyled>인원</TimeSelectModalSubTitleStyled>
          <HeadCountInputWrapper>
            <Textfield
              value={memCnt}
              height="3%"
              width="6.25rem"
              onChange={handleHeadCountChange}
              type="number"
            />
            명
          </HeadCountInputWrapper>
        </TimeSelectModalSubTitleWrapper>
      </div>
    </TimeSelectModalBoxContainer>
  );
};

export default TimeSelectModalBox;
