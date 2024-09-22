import WEStep from '../../../../../component/customer/reservation/WEStep/WEStep.jsx';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import {
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
} from './SuccessPage.js';
import theme from '../../../../../style/common/theme.js';
import paper from '../../../.././../assets/icons/common/paper.svg';
import useReservationStore from '../../../../../stores/customer/reservation/useReservationStore.js';
const SuccessPage = () => {
  const {
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    selectedHeadCount,
    selectedSeatNumber,
  } = useReservationStore();
  const link = 'https://wannaeat/invite/myrestaurant';

  const handleCopyButtonClick = (e) => {
    navigator.clipboard.writeText(link);
    alert('복사가 완료되었습니다.');
  };
  const handleSuccessButtonClick = (e) => {};
  return (
    <SuccessPageContainer>
      <WEStep index={3} />
      <SuccessMessageWrapper>
        <SuccessMessageTitle>예약이 완료되었습니다</SuccessMessageTitle>
        <SuccessMessageText>늦지않게 방문해주세요!</SuccessMessageText>
      </SuccessMessageWrapper>
      <ReservationInfoWrapper>
        <ReservationTitle>서래갈매기 한밭대점</ReservationTitle>
        <Button size="long" height={'7vh'} outlined={true} fontWeight={900}>
          {selectedDate} {selectedStartTime} ~ {selectedEndTime}
        </Button>
        <Button size="long" height={'7vh'} outlined={true} fontWeight={900}>
          {selectedHeadCount}명 좌석 {selectedSeatNumber}
        </Button>
      </ReservationInfoWrapper>
      <LinkInfoWrapper>
        <LinkInfoTitle>링크를 단톡방에 공유해주세요</LinkInfoTitle>
        <LinkInfoTextWrapper>
          <LinkInfoText>{link}</LinkInfoText>
          <LinkInfoButton onClick={handleCopyButtonClick}>
            <img src={paper} />
          </LinkInfoButton>
        </LinkInfoTextWrapper>
      </LinkInfoWrapper>
      <ButtonWrapper>
        <Button onClick={handleSuccessButtonClick} size="long">
          완료하기
        </Button>
      </ButtonWrapper>
    </SuccessPageContainer>
  );
};

export default SuccessPage;
