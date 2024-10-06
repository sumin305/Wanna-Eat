import theme from 'style/common/theme';
import styled from '@emotion/styled';

const ReservationListContainer = styled.div`
  background-color: #f2f2f2;
`;

const ReservationItem = styled.div`
  height: 8rem;
  align-items: center;
  justify-items: center;
  background-color: white;
  margin: 0.2rem 0;
  > div {
    margin: 0 1rem;
  }
`;

const ReservationItemInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 55vw 1fr;
  padding: 0.5rem 0;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 68% 1fr;
  }
`;

const ReservationItemImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
  margin-right: 0.5rem;

  @media (min-width: 480px) {
    margin-right: 1rem;
  }
`;

const ReservationItemText = styled.p`
  margin: 0.5rem 0;
`;

const ReservationItemTitle = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: 900;
  margin-bottom: 0.5rem;
`;

const ReservationItemSubTitle = styled.p`
  color: #c0c0c0;
  font-size: ${theme.fontSize.px10};
  font-weight: 900;
`;

const ReservationDetailButton = styled.button`
  background: none;
  border: 2px solid #c0c0c0;
  border-radius: 5px;
  font-size: ${theme.fontSize.px11};
  font-weight: bold;
  color: #c0c0c0;
  width: 3rem;
  height: 1.5rem;
  margin: 0.5rem 0;
`;

const ReservationAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff9db;
  height: 8rem;
  place-content: center;
  align-items: center;

  @media (min-width: 480px) {
    height: 9rem;
  }
`;

const ReservationDateWrapper = styled.div``;

const ReservationAlertDate = styled.p`
  color: ${theme.color.secondary};
  font-size: ${theme.fontSize.px13};
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;
const ReservationAlertTime = styled.p`
  display: flex;
  align-items: center;
`;
const ReservationLastTime = styled.p`
  color: ${theme.color.primary};
  font-weight: 900;
  font-size: 1.7rem;
  margin-right: 0.5rem;

  @media (min-width: 480px) {
    font-size: 3rem;
  }
`;
const ReservationTimeInfo = styled.p`
  font-size: ${theme.fontSize.px13};
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const ReservationiInfoButtonWrapper = styled.div`
  display: flex;
  align-self: end;
  margin: 0 1rem;
`;
const ReservationInfoButton = styled.button`
  background: none;
  border: none;
  color: ${theme.color.secondary};
`;

export {
  ReservationListContainer,
  ReservationItem,
  ReservationItemInfo,
  ReservationItemImage,
  ReservationItemText,
  ReservationItemTitle,
  ReservationItemSubTitle,
  ReservationDetailButton,
  ReservationAlertWrapper,
  ReservationAlertDate,
  ReservationAlertTime,
  ReservationLastTime,
  ReservationTimeInfo,
  ReservationInfoButton,
  ReservationDateWrapper,
  ReservationiInfoButtonWrapper,
};
