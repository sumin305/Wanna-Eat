import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import {
  MyZzimPageContainer,
  MyZzimItem,
  MyZzimItemImage,
  MyZzimInfoWrapper,
  MyZzimInfoTitle,
  MyZzimInfoText,
  MyZzimInconImage,
  MyZzimReservationWrapper,
  MyZzimReservationCount,
  MyZzimReservationButton,
} from './MyZzimPage';
import ZzimOff from 'assets/icons/header/zzim-off.svg';
import { getMyZzimRestaurants, removeZzimRestaurant } from 'api/customer/zzim';
import { useNavigate } from 'react-router-dom';
const MyZzimPage = () => {
  const { setPageName, setIsShowBackIcon, setActiveIcons } = useHeaderStore();
  const [zzimList, setZzimList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyZzim = async () => {
      const result = await getMyZzimRestaurants();
      console.log(result);
      if (result.status === 200) {
        console.log('찜 목록 불러오기 성공');
        setZzimList(result.data.data.userLikeDetailResponseDtos);
      } else {
        console.log('찜 목록 불러오기 실패');
      }
    };
    setPageName('내가 찜한 식당');
    setIsShowBackIcon(true);
    setActiveIcons([]);
    fetchMyZzim();
  }, []);

  const handleReservationButtonClick = (id) => {
    navigate('/customer/reservation/restaurant-detail/' + id);
  };
  return (
    <MyZzimPageContainer>
      {zzimList.length > 0 ? (
        zzimList.map((restaurant, index) => (
          <MyZzimItem key={index}>
            <MyZzimItemImage src={restaurant.restaurantImageUrl} />
            <MyZzimInfoWrapper>
              <MyZzimInfoTitle>
                {restaurant.restaurantName}
                <MyZzimInconImage src={ZzimOff} />
              </MyZzimInfoTitle>
              <MyZzimInfoText>
                {restaurant.restaurantDescription ?? '매장 상세 정보'}
              </MyZzimInfoText>
              <MyZzimReservationWrapper>
                <MyZzimReservationCount>
                  내 예약 {restaurant.userReservationCnt}회
                </MyZzimReservationCount>
                <MyZzimReservationButton
                  onClick={() =>
                    handleReservationButtonClick(restaurant.restaurantId)
                  }
                >
                  예약하러 가기 >
                </MyZzimReservationButton>
              </MyZzimReservationWrapper>
            </MyZzimInfoWrapper>
          </MyZzimItem>
        ))
      ) : (
        <p>내가 찜한 매장이 없습니다.</p>
      )}
    </MyZzimPageContainer>
  );
};
export default MyZzimPage;
