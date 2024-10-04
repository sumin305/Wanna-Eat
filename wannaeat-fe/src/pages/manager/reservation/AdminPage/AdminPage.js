import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';
import Calendar from 'react-calendar';

const ReservationInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin-top: 3%;
  margin-bottom: 23vh;
`;

const TabContainer = styled.div`
  display: flex;
  padding: 0.625rem 0;
  max-width: 100vw;
  position: relative;
`;
const Tab = styled.div`
  flex: 0 auto;
  padding: 0.625rem;

  font-size: ${theme.fontSize.px11};
  > p {
    font-weight: ${(props) => (props.active ? 'bold' : 500)};
    color: ${(props) =>
      props.active ? theme.color.primary : theme.color.disabled};
    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }

  > hr {
    background: ${theme.color.primary};
    height: 1.5px;
    border: none;
    display: ${(props) => (props.active ? 'block' : 'none')};
  }

  @media (min-width: 480px) {
    padding: 0.625rem 1.25rem;
    margin: 0 0.625rem;
  }
`;
const ReservationInfoText = styled.div`
  margin: 0 1rem;
`;
const ReservationInfoItem = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  height: 3rem;
  align-items: center;
  border-top: 1px solid ${theme.color.gray}; /* 상단에 2px 두께의 검은색 테두리 */
  border-bottom: 1px solid ${theme.color.gray}; /* 하단에 2px 두께의 검은색 테두리 */
  @media (min-width: 480px) {
    height: 4rem;
  }
`;
const CircleWrapper = styled.div`
  display: flex;
  margin: 0 3px;
`;

const ReservationInfoImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const ReservationTopInfo = styled.div`
  display: flex;
`;
const ReservationText = styled.p`
  font-size: 11px;
  font-weight: bold;
  @media (min-width: 480px) {
    font-size: 13px;
  }
`;
const ReservationBottomInfo = styled.div`
  display: flex;
`;
const CarrotCircle = styled.div`
  width: 7px;
  height: 7px;
  background-color: ${theme.color.statisticsPink};
  border-radius: 50%;
  margin-right: 4px;
  @media (min-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;
const GrayCircle = styled.div`
  width: 7px;
  height: 7px;
  background-color: ${theme.color.disabled};
  border-radius: 50%;
  margin-right: 4px;
  @media (min-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

const CountText = styled.p`
  font-size: 6px;
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: 10px;
  }
`;
const ReservationManagePageContainer = styled.div`
  overflow-y: auto;
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
    border: 0.5px solid ${theme.color.gray};
    background: white;
    height: 2.5rem;
    width: 40px;
    font-weight: bold;
    font-size: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    @media (min-width: 480px) {
      height: 4rem;
      font-size: 15px;
    }
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
  CircleWrapper,
  CarrotCircle,
  GrayCircle,
  CountText,
  ReservationManagePageContainer,
  CalendarWrapper,
  CalendarStyled,
  TabContainer,
  Tab,
  ReservationInfoContainer,
  ReservationInfoItem,
  ReservationInfoImage,
  ReservationInfoText,
  ReservationTopInfo,
  ReservationText,
  ReservationBottomInfo,
};
