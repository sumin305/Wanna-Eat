import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import { getMyReservation } from 'api/customer/reservation';
import Button from 'component/common/button/WEButton/WEButton.jsx';
import moment from 'moment';
import {
  ReservationListContainer,
  ReservationItem,
  ReservationItemInfo,
  ReservationItemImage,
  ReservationItemText,
  ReservationItemTitle,
  ReservationItemSubTitle,
  ReservationDetailButton,
} from './ReservationListPage.js';

const ListPage = () => {
  const { setPageName, setIsShowBackIcon, setIsShowLogo, setActiveIcons } =
    useHeaderStore();
  const [myReservationList, setMyReservationList] = useState([]);

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
        id: 1,
        restaurantName: '그린브라우니 한밭대점',
        restaurantImage: '',
        memberCount: 3,
        reservationStartTime: new Date(),
      },
      {
        id: 2,
        restaurantName: '경곤식당',
        restaurantImage: '',
        memberCount: 2,
        reservationStartTime: new Date(),
      },
      {
        id: 3,
        restaurantName: '하나로식당',
        restaurantImage: '',
        memberCount: 1,
        reservationStartTime: new Date(),
      },
    ]);
  }, []);
  return (
    <ReservationListContainer>
      {/* <div>제목</div> */}
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
            <ReservationDetailButton>예약상세</ReservationDetailButton>
          </ReservationItemInfo>
          <Button size={'long'} outlined={true} height={'2.5rem'}>
            다시 방문하기
          </Button>
        </ReservationItem>
      ))}
    </ReservationListContainer>
  );
};
export default ListPage;
