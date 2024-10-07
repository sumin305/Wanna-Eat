import { useEffect, useState } from 'react';
import moment from 'moment';
import useCountDownTimer from 'utils/useCountDownTimer';
import useHeaderStore from '../../../../stores/common/useHeaderStore.js';
import {
  MainPageContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  ReservationDateWrapper,
  ReservationAlertDate,
  ReservationAlertTime,
  ReservationLastTime,
  ReservationTimeInfo,
  ReservationiInfoButtonWrapper,
  ReservationInfoButton,
  ReservationAlertWrapper,
  BannerWrapper,
  BannerImage,
  BannerRightWrapper,
  BannerTitle,
  BannerButton,
  CategoryWrapper,
  CategoryTitle,
  CategoryContainer,
  CategoryImage,
  CategoryName,
  RestaurantWrapper,
  RestaurantHeader,
  RestaurantInfoContainer,
  RestaurantTitle,
  RestaurantTitleButton,
  RestaurantInfoBox,
  RestaurantInfoImage,
  RestaurantInfoName,
  RestaurantDetailWrapper,
  RestaurantMyReservation,
  RestaurantInfoWrapper,
} from './MainPage.js';
import searchIcon from '../../../../assets/icons/common/search.svg';
import tableIcon from '../../../../assets/icons/common/table.svg';
import arrowRightIcon from '../../../../assets/icons/common/arrow-right.svg';
import blackArrowRightIcon from '../../../../assets/icons/common/black-arrow-right.svg';
import { useNavigate } from 'react-router-dom';
import useMapFilterStore from 'stores/map/useMapFilterStore.js';
import Logo from 'assets/icons/header/logo.png';
import {
  getMyReservation,
  getPriorityVisitingRestaurant,
  getTop5Reservations,
} from 'api/customer/reservation.js';
const MainPage = () => {
  const { setKeyword } = useMapFilterStore();
  const { setIsShowLogo, setActiveIcons, setPageName } = useHeaderStore();
  const navigate = useNavigate();
  const [restaurantCategories, setRestaurantCategories] = useState([]);
  const [recentlyReservedRestaurants, setRecentlyReservedRestaurants] =
    useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hasPriorityVisitingRestaurant, setHasPriorityVisitingRestaurant] =
    useState(false);

  const [date, setDate] = useState('2024-10-11 00:00:00');
  const { remainingTime } = useCountDownTimer(date);

  const [restaurantName, setRestaurantName] = useState('싸덱스 식당');
  const [memberCount, setMemberCount] = useState(3);
  const [reservationId, setReservationId] = useState(0);

  useEffect(() => {
    const fetchMyReservationList = async () => {
      const result = await getTop5Reservations();
      console.log(result);

      if (result.status === 200) {
        console.log('내 예약 정보 불러오기 성공');
        setRecentlyReservedRestaurants(result.data.data);
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
        setReservationId(data.reservationId);
      }

      console.log(data);
    };

    setPageName('');
    setIsShowLogo(true);
    setActiveIcons([0]);
    setRestaurantCategories(JSON.parse(localStorage.getItem('categories')));
    fetchMyReservationList();
    fetchMyPriorityVisitingRestaurantList();
  }, []);

  const formatRemainingTime = () => {
    const splitArry = remainingTime.split(':');
    const day = removeZero(splitArry[0]) ?? '00';
    const hour = removeZero(splitArry[1]) ?? '00';
    const min = removeZero(splitArry[2]) ?? '00';
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
  const CustomerMainBanner = () => {
    if (!hasPriorityVisitingRestaurant) {
      return (
        <BannerWrapper>
          <BannerImage src={tableIcon} />
          <BannerRightWrapper>
            <BannerTitle>
              예약을 통해
              <br />
              완벽한 식사 시간을
              <br />
              만들어보세요
            </BannerTitle>
            <BannerButton onClick={handleReservationButtonClick}>
              예약하러 가기
              <img src={arrowRightIcon} />
            </BannerButton>
          </BannerRightWrapper>
        </BannerWrapper>
      );
    } else {
      return (
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
            <ReservationInfoButton
              onClick={() => handleReservationDetailButtonClick()}
            >
              더보기 >
            </ReservationInfoButton>
          </ReservationiInfoButtonWrapper>
        </ReservationAlertWrapper>
      );
    }
  };
  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearchIconClick = () => {
    setKeyword(searchKeyword);
    navigate('/customer/reservation');
  };
  const handleClickCategoryItem = (category) => {
    setKeyword(category);
    navigate('/customer/reservation');
  };
  const handleReservationButtonClick = () => {
    navigate('/customer/reservation');
  };

  const handleReservationListButtonClick = () => {
    navigate('/customer/reservationlist');
  };

  const handleRestaurantClick = (id) => {
    navigate('/customer/reservation/detail/' + id);
  };

  const handleReservationDetailButtonClick = () => {
    navigate('/customer/reservationlist');
    navigate('/customer/reservation/detail/' + reservationId);
  };
  return (
    <MainPageContainer>
      <SearchWrapper>
        <SearchInput
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          placeholder="메뉴, 식당, 지역 검색"
        />
        <SearchIcon
          onClick={handleSearchIconClick}
          src={searchIcon}
        ></SearchIcon>
      </SearchWrapper>
      {CustomerMainBanner()}
      <CategoryWrapper>
        <CategoryTitle>무엇을 드시고 싶으세요?</CategoryTitle>
        <CategoryContainer>
          {restaurantCategories.map((category, index) => (
            <div
              key={index}
              onClick={() =>
                handleClickCategoryItem(category.restaurantCategoryName)
              }
            >
              <CategoryImage src={category.restaurantCategoryImage} />
              <CategoryName>{category.restaurantCategoryName}</CategoryName>
            </div>
          ))}
        </CategoryContainer>
      </CategoryWrapper>
      <RestaurantWrapper>
        <RestaurantHeader>
          <RestaurantTitle>최근 예약한 식당</RestaurantTitle>
          <RestaurantTitleButton onClick={handleReservationListButtonClick}>
            예약내역 보기
            <img src={blackArrowRightIcon} />
          </RestaurantTitleButton>
        </RestaurantHeader>
        <RestaurantInfoContainer>
          {recentlyReservedRestaurants.map((restaurant) => (
            <RestaurantInfoBox
              key={restaurant.reservationId}
              onClick={() => handleRestaurantClick(restaurant.reservationId)}
            >
              <RestaurantInfoImage
                src={
                  restaurant.restaurantImage ? restaurant.restaurantImage : Logo
                }
              />
              <RestaurantInfoWrapper>
                <RestaurantInfoName>
                  {restaurant.restaurantName}
                </RestaurantInfoName>
                <RestaurantDetailWrapper>
                  <RestaurantMyReservation>
                    {restaurant.restaurantVisitCount}명
                  </RestaurantMyReservation>
                  <RestaurantMyReservation>
                    {restaurant.restaurantCategory}
                  </RestaurantMyReservation>
                </RestaurantDetailWrapper>
              </RestaurantInfoWrapper>
            </RestaurantInfoBox>
          ))}
        </RestaurantInfoContainer>
      </RestaurantWrapper>
    </MainPageContainer>
  );
};

export default MainPage;
