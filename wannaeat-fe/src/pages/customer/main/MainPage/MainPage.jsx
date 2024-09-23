import { useEffect } from 'react';
import useHeaderStore from '../../../../stores/common/header/useHeaderStore.js';
import {
  MainPageContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
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
  RestaurantTotalReservation,
} from './MainPage.js';
import searchIcon from '../../../../assets/icons/common/search.svg';
import tableIcon from '../../../../assets/icons/common/table.svg';
import arrowRightIcon from '../../../../assets/icons/common/arrow-right.svg';
import blackArrowRightIcon from '../../../../assets/icons/common/black-arrow-right.svg';
import bossamIcon from '../../../../assets/icons/food/bossam.svg';
import foodImage from '../../../../assets/icons/common/food.png';
import { getRestaurants } from '../../../../api/customer/restaurant.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const MainPage = () => {
  const { setIsShowLogo, setActiveIcons } = useHeaderStore();
  const navigate = useNavigate();
  const foodCategories = [
    { index: 1, category: '보쌈·족발', image: bossamIcon },
    { index: 2, category: '찜·탕·찌개', image: bossamIcon },
    { index: 3, category: '회·일식', image: bossamIcon },
    { index: 4, category: '돈까스', image: bossamIcon },
    { index: 5, category: '피자', image: bossamIcon },
    { index: 6, category: '치킨', image: bossamIcon },
    { index: 7, category: '고기', image: bossamIcon },
    { index: 8, category: '양식', image: bossamIcon },
    { index: 9, category: '중식', image: bossamIcon },
    { index: 10, category: '아시안', image: bossamIcon },
    { index: 11, category: '백반', image: bossamIcon },
    { index: 12, category: '혼밥', image: bossamIcon },
    { index: 13, category: '분식', image: bossamIcon },
    { index: 14, category: '디저트', image: bossamIcon },
    { index: 15, category: '패스트푸드', image: bossamIcon },
  ];

  const recentlyReservedRestaurants = [
    {
      index: 0,
      restaurantName: '싸덱스 식당1',
      restaurantImage: foodImage,
      myReservationCount: 5,
      totalReservationCount: 200,
    },
    {
      index: 1,
      restaurantName: '싸덱스 식당2',
      restaurantImage: foodImage,
      myReservationCount: 2,
      totalReservationCount: 45,
    },
    {
      index: 2,
      restaurantName: '싸덱스 식당3',
      restaurantImage: foodImage,
      myReservationCount: 4,
      totalReservationCount: 123,
    },
  ];

  const [menus, setMenus] = useState({});

  useEffect(() => {
    setIsShowLogo(true);
    setActiveIcons([3]);
    fetchData(); // 비동기 함수 호출
  }, []);

  const fetchData = async () => {
    const response = await getRestaurants(1); // API 호출
    setMenus(response.data.menusMap.주류[0]); // 데이터 상태 업데이트
  };

  const handleReservationButtonClick = (e) => {
    navigate('/customer/reservation');
  };

  const handleReservationListButtonClick = (e) => {
    navigate('/customer/reservationlist');
  };

  return (
    <MainPageContainer>
      <SearchWrapper>
        <SearchInput placeholder="메뉴, 식당, 지역 검색" />
        <SearchIcon src={searchIcon}></SearchIcon>
      </SearchWrapper>
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
      <CategoryWrapper>
        <CategoryTitle>무엇을 드시고 싶으세요?</CategoryTitle>
        <CategoryContainer>
          {foodCategories.map((category) => (
            <div key={category.index}>
              <CategoryImage src={category.image} />
              <CategoryName>{category.category}</CategoryName>
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
            <RestaurantInfoBox key={restaurant.index}>
              <RestaurantInfoImage src={restaurant.restaurantImage} />
              <RestaurantInfoName>
                {restaurant.restaurantName}
              </RestaurantInfoName>
              <RestaurantDetailWrapper>
                <RestaurantMyReservation>
                  내 예약 {restaurant.myReservationCount}회
                </RestaurantMyReservation>
                <RestaurantTotalReservation>
                  총 예약 {restaurant.totalReservationCount}회
                </RestaurantTotalReservation>
              </RestaurantDetailWrapper>
            </RestaurantInfoBox>
          ))}
        </RestaurantInfoContainer>
      </RestaurantWrapper>
    </MainPageContainer>
  );
};

export default MainPage;
