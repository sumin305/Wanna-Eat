import { useEffect, useState } from 'react';
import useHeaderStore from '../../../../stores/common/useHeaderStore.js';
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
import { useNavigate } from 'react-router-dom';
import useMapFilterStore from 'stores/map/useMapFilterStore.js';
import useCommonStore, {
  ROLE,
} from '../../../../stores/common/useCommonStore.js';

const MainPage = () => {
  const { setKeyword } = useMapFilterStore();
  const { setIsShowLogo, setActiveIcons, setPageName } = useHeaderStore();
  const navigate = useNavigate();
  const [restaurantCategories, setRestaurantCategories] = useState([]);
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

  useEffect(() => {
    setPageName('');
    setIsShowLogo(true);
    setActiveIcons([0]);
    setRestaurantCategories(JSON.parse(localStorage.getItem('categories')));
  }, []);

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
          {restaurantCategories.map((category) => (
            <div
              key={category.restaurantCategoryId}
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
