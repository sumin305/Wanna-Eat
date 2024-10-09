import styled from '@emotion/styled';
import theme from '../../../style/common/theme';
import Calendar from 'react-calendar';

const InputFieldContainer = styled.div`
  display: flex;
  align-items: ${(props) =>
    props.isCalendarVisible || props.isShowOption ? 'flex-start' : 'center'};
  width: 100%;
  margin-bottom: 0.625rem;
`;

const InputFieldText = styled.p`
  flex: 1;
  font-size: ${theme.fontSize.px15};
`;

const InputFieldContent = styled.div`
  flex: 3;
  display: flex;
  align-items: ${(props) =>
    props.isCalendarVisible || props.isShowOption ? 'flex-start' : 'center'};
  position: relative;
`;

const BoxStyled = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? props.height : theme.height.textfield)};
  border: 1px solid ${theme.color.disabled};
  border-radius: 0.3rem;
  padding: 0.625rem 2rem;
  font-size: ${theme.fontSize.px11};
  color: ${theme.color.info};
  background-color: ${theme.color.white};
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    border: 1px solid ${theme.color.primary};
  }
`;

const CalendarContainer = styled.div`
  flex: 3;
  padding: 0 1.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  width: 90%;
  background-color: white;
  margin: 10px;
  text-align: -webkit-center;
  border: 1px solid ${theme.color.gray};
  border-radius: 8px;
`;

const CalendarStyled = styled(Calendar)`
  .react-calendar {
    width: 90%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    line-height: 1.125em;
    text-align: -webkit-center;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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

  .react-calendar__tile {
    border: none;
    background: white;
    height: 40px;
    width: 40px;
    font-weight: bold;
    border-radius: 8px;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile--active {
    background: #ff6528;
    color: white;
    border-radius: 6px;
    font-weight: bold;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: ${(props) => (props.height ? props.height : theme.height.textfield)};
  padding: 0.625rem;
  font-size: ${theme.fontSize.px11};
  color: ${theme.color.info};
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.disabled};
  border-radius: 0.3rem;
  box-sizing: border-box;
  background-size: 15px 15px;
  background-position: right 10px center;
  background-repeat: no-repeat;
  appearance: none;
  cursor: pointer;

  &:hover {
    border-color: ${theme.color.primary};
  }

  &::-ms-expand {
    display: none;
  }
`;

export {
  InputFieldContainer,
  InputFieldText,
  InputFieldContent,
  BoxStyled,
  CalendarContainer,
  CalendarWrapper,
  CalendarStyled,
  StyledSelect,
};
