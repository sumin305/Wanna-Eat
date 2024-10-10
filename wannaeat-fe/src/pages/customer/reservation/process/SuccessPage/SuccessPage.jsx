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
import useReservationStore from '../../../../../stores/customer/useReservationStore.js';
import useMapFilterStore from '../../../../../stores/map/useMapFilterStore.js';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../../../../utils/alert.js';

import useRestaurantStore from 'stores/customer/useRestaurantStore';
const SuccessPage = () => {
  const showAlert = useAlert();
  const {
    reservationDate,
    startTime,
    endTime,
    memberCount,
    selectedSeatNumber,
    resetReservation,
    reservationUrl,
  } = useReservationStore();
  const { resetMapFilterStore } = useMapFilterStore();

  const { restaurantName } = useRestaurantStore();
  const navigate = useNavigate();
  const handleCopyButtonClick = (e) => {
    navigator.clipboard.writeText(reservationUrl);
    showAlert('복사가 완료되었습니다.');
  };
  const handleSuccessButtonClick = (e) => {
    resetReservation(); // 예약 임시 정보 모두 삭제
    resetMapFilterStore();
    navigate('/customer/reservationlist');
  };

  const handleMoveButtonClick = () => {
    showAlert('주문 페이지로 이동합니다.');
    window.location.href = reservationUrl;
  };

  return (
    <SuccessPageContainer>
      <WEStep index={3} />
      <SuccessMessageWrapper>
        <SuccessMessageTitle>예약이 완료되었습니다</SuccessMessageTitle>
        <SuccessMessageText>늦지않게 방문해주세요!</SuccessMessageText>
      </SuccessMessageWrapper>
      <ReservationInfoWrapper>
        <ReservationTitle>{restaurantName}</ReservationTitle>
        <Button size="long" height={'7vh'} outlined={true} fontWeight={900}>
          {reservationDate} {startTime} ~ {endTime}
        </Button>
        <Button size="long" height={'7vh'} outlined={true} fontWeight={900}>
          {memberCount}명 좌석 {selectedSeatNumber}
        </Button>
      </ReservationInfoWrapper>
      <LinkInfoWrapper>
        <LinkInfoTitle>링크를 단톡방에 공유해주세요</LinkInfoTitle>
        <LinkInfoTextWrapper>
          <LinkInfoText onClick={handleMoveButtonClick}>
            {reservationUrl}
          </LinkInfoText>
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
