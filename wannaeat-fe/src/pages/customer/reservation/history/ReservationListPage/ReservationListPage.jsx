import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import {
  getMyReservation,
  getPriorityVisitingRestaurant,
} from 'api/customer/reservation';
import Button from 'component/common/button/WEButton/WEButton.jsx';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
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
} from './ReservationListPage.js';
import useCountDownTimer from 'utils/useCountDownTimer';
const ListPage = () => {
  const { setPageName, setIsShowBackIcon, setIsShowLogo, setActiveIcons } =
    useHeaderStore();
  const [myReservationList, setMyReservationList] = useState([]);
  const navigate = useNavigate();
  const [date, setDate] = useState('2024-10-11 00:00:00');
  const [memberCount, setMemberCount] = useState(3);
  const [restaurantName, setRestaurantName] = useState('싸덱스 식당');
  const { remainingTime } = useCountDownTimer(date);
  const [hasPriorityVisitingRestaurant, setHasPriorityVisitingRestaurant] =
    useState(false);

  useEffect(() => {
    const fetchMyReservationList = async () => {
      const result = await getMyReservation();
      console.log(result);

      if (result.status === 200) {
        console.log('내 예약 정보 불러오기 성공');
        setMyReservationList(result.data.content);
      } else {
        console.log('내 예약 정보 불러오기 실패');
      }
    };

    const fetchMyPriorityVisitingRestaurantList = async () => {
      const result = await getPriorityVisitingRestaurant();
      console.log(result);

      if (result.status !== 200) {
        console.log('우선 방문 예약 식당 불러오기 실패');
        return;
      }

      const data = result.data.data;
      if (!data) {
        setHasPriorityVisitingRestaurant(false);
      } else {
        setHasPriorityVisitingRestaurant(true);
        setRestaurantName(data.restaurantName);
        setDate(data.reservationDate + ' ' + data.reservationStartTime);
        setMemberCount(data.memberCnt);
      }

      console.log(data);
    };

    setPageName('예약 내역');
    setIsShowBackIcon(false);
    setIsShowLogo(false);
    setActiveIcons([]);

    fetchMyReservationList();
    fetchMyPriorityVisitingRestaurantList();
  }, []);

  const formatRemainingTime = () => {
    const splitArry = remainingTime.split(':');
    const day = removeZero(splitArry[0]) ?? '00';
    const hour = removeZero(splitArry[1]) ?? '00';
    const min = removeZero(splitArry[2]) ?? '00';
    console.log(day, hour, min);
    if (day !== '00' && day !== '0') {
      return day + '일 ' + hour + '시간';
    } else if (hour !== '00' && hour !== '0') {
      return hour + '시간 ' + min + '분';
    } else {
      return min + '분';
    }
  };

  const removeZero = (time) => {
    if (time?.length === 2 && time[0] === '0') {
      return time[1];
    }
    return time;
  };

  const handleRevisitButtonClick = (id) => {
    navigate('/customer/reservation/restaurant-detail/' + id);
  };

  const handleReservationDetailButtonClick = (id) => {
    navigate('/customer/reservation/detail/' + id);
  };

  return (
    <ReservationListContainer>
      {hasPriorityVisitingRestaurant && (
        <ReservationAlertWrapper>
          <ReservationDateWrapper>
            <ReservationAlertDate>
              {moment(date).format('YYYY년 MM월 DD일')}{' '}
              {moment(date).format('HH:mm')}
            </ReservationAlertDate>
            <ReservationAlertTime>
              <ReservationLastTime>{formatRemainingTime()}</ReservationLastTime>
              <ReservationTimeInfo>
                후에 {restaurantName}
                <br></br> {memberCount} 人 예약되어 있어요
              </ReservationTimeInfo>
            </ReservationAlertTime>
          </ReservationDateWrapper>
          <ReservationiInfoButtonWrapper>
            <ReservationInfoButton>더보기 ></ReservationInfoButton>
          </ReservationiInfoButtonWrapper>
        </ReservationAlertWrapper>
      )}

      {myReservationList.map((reservation) => (
        <ReservationItem key={reservation.reservationId}>
          <ReservationItemInfo>
            <ReservationItemImage src={reservation.restaurantImage} />
            <ReservationItemText>
              <ReservationItemTitle>
                {reservation.restaurantName}
              </ReservationItemTitle>
              <ReservationItemSubTitle>
                {reservation.memberCnt}명 |&nbsp;
                {moment(reservation.reservationDate).format('YYYY-MM-DD')}&nbsp;
                {reservation.reservationStartTime.split(':')[0] +
                  ':' +
                  reservation.reservationStartTime.split(':')[1]}
              </ReservationItemSubTitle>
            </ReservationItemText>
            <ReservationDetailButton
              onClick={() =>
                handleReservationDetailButtonClick(reservation.reservationId)
              }
            >
              예약상세
            </ReservationDetailButton>
          </ReservationItemInfo>
          <Button
            onClick={() => handleRevisitButtonClick(reservation.restaurantId)}
            size={'long'}
            outlined={true}
            height={'2.5rem'}
          >
            다시 방문하기
          </Button>
        </ReservationItem>
      ))}
    </ReservationListContainer>
  );
};
export default ListPage;
