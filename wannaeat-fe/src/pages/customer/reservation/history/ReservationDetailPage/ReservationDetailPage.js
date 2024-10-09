import styled from '@emotion/styled';
import theme from '../../../../../style/common/theme';

const ReservationDetailPageContainer = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 480px) {
    overflow-y: scroll;
  }
`;

const ReservationTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.6rem 1rem;
`;

const ReservationTitleText = styled.p`
  display: flex;
  font-size: ${theme.fontSize.px15};
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px25};
    margin: 0.6rem;
  }
`;
const ReservationTitleButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: ${theme.color.secondary};
  font-size: ${theme.fontSize.px13};

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
    margin: 0.6rem 0;
  }
`;

const ReservationInfoTitle = styled.p`
  display: flex;
  justify-content: center;
  color: ${theme.color.primary};
  font-size: ${theme.fontSize.px17};
  font-weight: bold;
  border-radius: 10px;
  border: 3px solid ${theme.color.border};
  margin: 0 1rem;
  padding: 5px;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px27};
    padding: 10px;
  }
`;

const SeatDecorateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  @media (min-width: 480px) {
    margin: 1.5rem;
  }
`;

const LinkInfoWrapper = styled.div`
  margin: 0 0.5rem;
`;

const LinkInfoTitle = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSize.px15};
  margin: 0.5rem 1rem;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px17};
  }
`;

const LinkInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 0.5rem;
  border: 1.5px solid ${theme.color.disabled};
  border-radius: 0.5rem;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  margin: 0 1rem;
  padding: 3px;

  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;
const LinkInfoText = styled.p``;
const LinkInfoButton = styled.button`
  color: black;
  background: none;
  border: none;
  display: flex;
`;
const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

export {
  ReservationDetailPageContainer,
  ReservationTitleWrapper,
  ReservationTitleText,
  ReservationTitleButton,
  ReservationInfoTitle,
  SeatDecorateInfo,
  LinkInfoWrapper,
  LinkInfoTitle,
  LinkInfoTextWrapper,
  LinkInfoText,
  LinkInfoButton,
  ButtonWrapper,
};
