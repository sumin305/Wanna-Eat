import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getReservationDetail,
  cancelReservation,
} from 'api/customer/reservation';
import useHeaderStore from 'stores/common/useHeaderStore';
import paper from '../../../.././../assets/icons/common/paper.svg';
import Button from '../../../../../component/common/button/WEButton/WEButton';
import ReservationSeatMap from 'component/customer/reservation/ReservationSeatMap/ReservationSeatMap.jsx';
import moment from 'moment';
import useModalStore from 'stores/common/useModalStore';
import {
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
} from './ReservationDetailPage.js';
import useAlert from 'utils/alert.js';

const ReservationDetailPage = () => {
  const showAlert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsShowLogo, setPageName, setIsShowBackIcon, setActiveIcons } =
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
  const [reservationUrl, setReservationUrl] = useState('');

  useEffect(() => {
    const fetchReservationDetail = async () => {
      const result = await getReservationDetail(id);
      if (result.status !== 200) {
        showAlert('예약 상세 조회 실패');
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
      setReservationUrl(
        process.env.REACT_APP_CLIENT_URL +
          '/customer/order/' +
          reservation.reservationUrl
      );
    };

    setPageName('예약 상세');
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([]);
    fetchReservationDetail();
  }, []);

  useEffect(() => {
    console.log('seatList: ', seatList);
  }, [seatList]);

  const handleCopyButtonClick = () => {
    showAlert('복사가 완료되었습니다.');
    navigator.clipboard.writeText(reservationUrl);
  };

  const handleMoveButtonClick = () => {
    showAlert('주문 페이지로 이동합니다.');
    window.location.href = reservationUrl;
  };
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
      showAlert(result.response.data.message);
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
      <SeatDecorateInfo>
        <ReservationSeatMap
          OccupiedList={seatList}
          restaurantId={restaurantId}
        />
      </SeatDecorateInfo>
      <LinkInfoWrapper>
        <LinkInfoTitle>링크를 단톡방에 공유해주세요</LinkInfoTitle>
        <LinkInfoTextWrapper>
          <LinkInfoText onClick={() => handleMoveButtonClick()}>
            {reservationUrl}
          </LinkInfoText>
          <LinkInfoButton onClick={() => handleCopyButtonClick()}>
            <img src={paper} />
          </LinkInfoButton>
        </LinkInfoTextWrapper>
      </LinkInfoWrapper>
      <ButtonWrapper>
        <Button
          size={'long'}
          onClick={() => handleReservationCancelButtonClick()}
        >
          예약 취소
        </Button>
      </ButtonWrapper>
    </ReservationDetailPageContainer>
  );
};

export default ReservationDetailPage;
