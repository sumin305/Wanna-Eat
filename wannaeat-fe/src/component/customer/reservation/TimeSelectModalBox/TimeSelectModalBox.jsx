import useReservationStore from '../../../../stores/customer/useReservationStore.js';
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
import { useEffect } from 'react';
import Textfield from '../../../common/textfield/WETextfield/WETextfield.jsx';
const TimeSelectModalBox = () => {
  const {
    isLunch,
    lunchTimes,
    dinnerTimes,
    setIsLunch,
    setSelectedStartTime,
    setSelectedEndTime,
    setSelectedHeadCount,
    setSelectedTimes,
    selectedTimes,
  } = useReservationStore();

  useEffect(() => {
    setSelectedTimes([]);
    console.log('hello');
  }, []);

  const handleHeadCountChange = (e) => {
    if (e.target.value === '') {
      setSelectedHeadCount(0);
      return;
    }

    if (e.target.value <= 0) {
      alert('0명 이하는 불가능합니다.');
      setSelectedHeadCount(0);
      return;
    }
    setSelectedHeadCount(parseInt(e.target.value));
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
          alert('연속된 시간만 선택 가능합니다.');
          setSelectedTimes([]);
          return;
        }

        // 제거 완료
        setSelectedTimes(newSelectedTimes);
        setStartEndTime(newSelectedTimes);
        return;
      }

      if (selectedTimes.length >= 4) {
        alert('최대 2시간 이용 가능합니다.');
        return;
      }

      // 해당 시간을 추가할 때 연속되지 않을 경우 추가 실패
      let newSelectedTimes = [...selectedTimes];
      newSelectedTimes.push(lunchTimes[index]);
      if (!checkContinuousTime(lunchTimes, newSelectedTimes)) {
        alert('연속된 시간만 선택 가능합니다.');
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
          alert('연속된 시간만 선택 가능합니다.');
          setSelectedTimes([]);
          return;
        }

        // 제거 완료
        setSelectedTimes(newSelectedTimes);
        setStartEndTime(newSelectedTimes);
        return;
      }

      if (selectedTimes.length >= 4) {
        alert('최대 2시간 이용 가능합니다.');
        return;
      }

      // 해당 시간을 추가할 때 연속되지 않을 경우 추가 실패
      let newSelectedTimes = [...selectedTimes];
      newSelectedTimes.push(dinnerTimes[index]);
      if (!checkContinuousTime(dinnerTimes, newSelectedTimes)) {
        alert('연속된 시간만 선택 가능합니다.');
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
      setSelectedStartTime('00:00');
      setSelectedEndTime('00:00');
      return;
    }
    selectedTimes = selectedTimes.sort();
    const startTime = selectedTimes[0];
    setSelectedStartTime(startTime);
    const endTime = selectedTimes[selectedTimes.length - 1];
    console.log(selectedTimes, startTime, endTime);
    if (endTime && endTime.split(':')[1] == '00') {
      setSelectedEndTime(endTime.split(':')[0] + ':30');
    } else if (endTime && endTime.split(':')[1] == '30') {
      setSelectedEndTime(parseInt(endTime.split(':')[0]) + 1 + ':00');
    } else {
      setSelectedStartTime('00:00');
      setSelectedEndTime('00:00');
    }
  };

  return (
    <TimeSelectModalBoxContainer>
      <TimeSelectModalTitleStyled>시간을 선택하세요</TimeSelectModalTitleStyled>
      <div>
        <TimeSelectModalSubTitleWrapper>
          <TimeSelectModalSubTitleStyled>오전</TimeSelectModalSubTitleStyled>
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
          <TimeSelectModalSubTitleStyled>오후</TimeSelectModalSubTitleStyled>
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
