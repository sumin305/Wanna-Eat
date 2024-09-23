import styled from '@emotion/styled/macro';
import theme from '../../../../../style/common/theme';
const SuccessPageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 23vh 30vh 1.3fr 1fr;
`;
const SuccessMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SuccessMessageTitle = styled.p`
  font-weight: bold;
  color: ${theme.color.primary};
  font-size: 1.5rem;
`;

const SuccessMessageText = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSize.px11};
`;

const ReservationInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 0.8rem;
  }
`;

const ReservationTitle = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSize.px15};
  margin: 0 1rem;
`;

const LinkInfoWrapper = styled.div`
  > * {
    margin-bottom: 1rem;
  }
`;

const LinkInfoTitle = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSize.px15};
  margin: 0 1rem;
`;

const LinkInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-weight: 500;
  font-size: 0.688rem;
  border: 1.5px solid ${theme.color.disabled};
  border-radius: 0.5rem;
  height: 3vh;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  width: 93%;
  margin: 0 auto;
  padding: 3px;
`;
const LinkInfoText = styled.p``;
const LinkInfoButton = styled.button`
  color: black;
  background: none;
  border: none;
  display: flex;
`;
const ButtonWrapper = styled.div`
  grid-row: 5;
  bottom: 0;
`;

export {
  SuccessPageContainer,
  SuccessMessageWrapper,
  SuccessMessageTitle,
  SuccessMessageText,
  ButtonWrapper,
  ReservationInfoWrapper,
  ReservationTitle,
  LinkInfoWrapper,
  LinkInfoTitle,
  LinkInfoTextWrapper,
  LinkInfoText,
  LinkInfoButton,
};
