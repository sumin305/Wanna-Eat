import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import { getMyReservation } from 'api/customer/reservation';
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
  const [date, setDate] = useState('2024-10-3 00:00:00');
  const [memberCount, setMemberCount] = useState(3);
  const [restaurantName, setRestaurantName] = useState('싸덱스 식당');
  const { remainingTime } = useCountDownTimer(date);
  useEffect(() => {
    const fetchMyReservationList = async () => {
      const result = await getMyReservation();
      console.log(result);

      if (result.status === 200) {
        console.log('내 예약 정보 불러오기 성공');
        // setMyReservationList(result.data.content);
      } else {
        console.log('내 예약 정보 불러오기 실패');
      }
    };
    setPageName('예약 내역');
    setIsShowBackIcon(false);
    setIsShowLogo(false);
    setIsShowBackIcon(false);
    setActiveIcons([]);

    fetchMyReservationList();

    // 데이터 생기면 삭제
    setMyReservationList([
      {
        restaurantId: 1,
        restaurantName: '그린브라우니 한밭대점',
        restaurantImage: '',
        memberCount: 3,
        reservationStartTime: new Date(),
      },
      {
        restaurantId: 2,
        restaurantName: '경곤식당',
        restaurantImage: '',
        memberCount: 2,
        reservationStartTime: new Date(),
      },
      {
        restaurantId: 3,
        restaurantName: '하나로식당',
        restaurantImage: '',
        memberCount: 1,
        reservationStartTime: new Date(),
      },
    ]);
  }, []);

  const formatRemainingTime = () => {
    console.log('remainingTime', remainingTime);
    const splitArry = remainingTime.split(':');
    console.log('splitArry', splitArry);
    const day = removeZero(splitArry[0]) ?? '00';
    const hour = removeZero(splitArry[1]) ?? '00';
    const min = removeZero(splitArry[2]) ?? '00';
    console.log(day, hour, min);
    if (day !== '00' && day !== '0') {
      return day + '일' + hour + '시간';
    } else if (hour !== '00' && hour !== '0') {
      return hour + ':' + min;
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
    navigate('/customer/reservation/detail' + id);
  };

  return (
    <ReservationListContainer>
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
      {myReservationList.map((reservation) => (
        <ReservationItem key={reservation.id}>
          <ReservationItemInfo>
            <ReservationItemImage />
            <ReservationItemText>
              <ReservationItemTitle>
                {reservation.restaurantName}
              </ReservationItemTitle>
              <ReservationItemSubTitle>
                {reservation.memberCount}명 |&nbsp;
                {moment(reservation.reservationStartTime).format(
                  'YYYY-MM-DD(ddd) HH:mm'
                )}
              </ReservationItemSubTitle>
            </ReservationItemText>
            <ReservationDetailButton
              onClick={() =>
                handleReservationDetailButtonClick(reservation.restaurantId)
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
