import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getReservationDetail,
  cancelReservation,
} from 'api/customer/reservation';
import useHeaderStore from 'stores/common/useHeaderStore';
import styled from '@emotion/styled';
import theme from '../../../../../style/common/theme';
import paper from '../../../.././../assets/icons/common/paper.svg';
import Button from '../../../../../component/common/button/WEButton/WEButton';
import moment from 'moment';
import useModalStore from 'stores/common/useModalStore';
const ReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setPageName, setIsShowBackIcon, setIsShowLogo, setActiveIcons } =
    useHeaderStore();
  const {
    setCancelText,
    setAlertText,
    setConfirmText,
    setIsOneButton,
    open,
    setModalType,
    close,
    setHandleButtonClick,
  } = useModalStore();
  const [restaurantId, setRestaurantId] = useState(0);
  const [restaurantName, setRestaurantName] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationStartTime, setReservationStartTime] = useState('');
  const [reservationEndTime, setReservationEndTime] = useState('');
  const [seatList, setSeatList] = useState([]);
  const link = 'https://wannaeat/invite/myrestaurant';

  const handleCopyButtonClick = (e) => {
    navigator.clipboard.writeText(link);
    alert('복사가 완료되었습니다.');
  };
  useEffect(() => {
    const fetchReservationDetail = async () => {
      const result = await getReservationDetail(id);
      console.log(result);
      if (result.status !== 200) {
        alert('예약 상세 조회 실패');
        navigate(-1);
        return;
      }
      const reservation = result.data.data;
      setRestaurantName(reservation.restaurantName);
      setReservationDate(reservation.reservationDate);
      setReservationStartTime(reservation.reservationStartTime);
      setReservationEndTime(reservation.reservationEndTime);
      setRestaurantId(reservation.restaurantId);
      setSeatList(reservation.tableList);
    };

    setPageName('예약 상세');
    setIsShowBackIcon(true);
    setActiveIcons([]);
    fetchReservationDetail();
  }, []);

  const handleRestaurantInfoButtonClick = () => {
    navigate('/customer/reservation/restaurant-detail/' + restaurantId);
  };

  const handleReservationCancelButtonClick = () => {
    setModalType('alert');
    setAlertText('예약을 취소하시겠습니까?');
    setCancelText('취소');
    setConfirmText('확인');
    setIsOneButton(false);
    setHandleButtonClick(() => {
      removeReservation();
      close();
    });
    open();
  };

  const removeReservation = async () => {
    const result = await cancelReservation(id);
    if (result.status !== 200) {
      alert(result.response.data.message);
      return;
    }
    navigate(-1);
  };
  return (
    <ReservationDetailPageContainer>
      <ReservationTitleWrapper>
        <ReservationTitleText>{restaurantName}</ReservationTitleText>
        <ReservationTitleButton
          onClick={() => handleRestaurantInfoButtonClick()}
        >
          매장 정보 보기 >
        </ReservationTitleButton>
      </ReservationTitleWrapper>
      <ReservationInfoTitle>
        {moment(reservationDate).format('MM.DD')}&nbsp;
        {reservationStartTime.split(':')[0] +
          ':' +
          reservationStartTime.split(':')[1]}
        ~
        {reservationEndTime.split(':')[0] +
          ':' +
          reservationEndTime.split(':')[1]}
      </ReservationInfoTitle>
      <SeatDecorateInfo></SeatDecorateInfo>
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
        <Button size={'long'} onClick={handleReservationCancelButtonClick}>
          예약 취소
        </Button>
      </ButtonWrapper>
    </ReservationDetailPageContainer>
  );
};

export default ReservationDetailPage;
