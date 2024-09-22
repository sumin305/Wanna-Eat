import styled from '@emotion/styled';
import theme from '../../../style/common/theme';
import Calendar from 'react-calendar';

const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.625rem;
`;

const InputFieldText = styled.p`
  flex: 1; // 전체 width의 1/4을 차지하게끔 비율 설정
  font-size: ${theme.fontSize.px15};
`;

const InputFieldContent = styled.div`
  flex: 3; // 나머지 3/4를 차지하도록 설정
  display: flex;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  text-align: -webkit-center;
  border-radius: 8px;
  margin: 10px;
  border: 1px solid ${theme.color.gray};
`;

const CalendarStyled = styled(Calendar)`
  .react-calendar {
    width: 90%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    line-height: 1.125em;
    text-align: -webkit-center;
  }
  .react-calendar__navigation button {
    color: #ff6528;
    min-width: 30px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
    border: none;
    height: 50px;
  }

  .react-calendar__navigation__label__labelText {
    font-weight: bold;
    color: black;
    border: none;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
    border: none;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
    border: none;
  }
  abbr[title] {
    text-decoration: none;
    border: none;
  }

  .react-calendar__tile {
    border: none;
    background: white;
    height: 40px;
    width: 40px;
    font-weight: bold;
    border-radius: 8px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #ff6528;
    color: white;
    border-radius: 6px;
    border: none;
    font-weight: bold;
  }
  .react-calendar__tile--now {
    background: #fff1aa;
    border-radius: 6px;
    font-weight: bold;
    color: black;
    border: none;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ff6528;
    color: white;
    border-radius: 6px;
    border: none;
    font-weight: bold;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ff6528;
    border: none;
  }
  .react-calendar__tile--active {
    background: #ff6528;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    border: none;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #ff6528;
    color: white;
    border: none;
    font-weight: bold;
  }
`;

export {
  InputFieldContainer,
  InputFieldText,
  InputFieldContent,
  CalendarWrapper,
  CalendarStyled,
};
