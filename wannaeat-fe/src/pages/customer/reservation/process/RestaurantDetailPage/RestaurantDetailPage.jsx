import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useHeaderStore from '../../../../../stores/common/header/useHeaderStore';
import {
  Box,
  RestaurantImageBox,
  InformationContainer,
  InformationWrapper,
  InformationText,
  IconImg,
  WETabContainer,
  MenuContainer,
  MenuBox,
  ImageBox,
  MenuImg,
  MenuContentContainer,
  MenuName,
  MenuPrice,
  MenuDescription,
  ButtonBox,
} from './RestaurantDetailPage';
import RestaurantImg from '../../../../../assets/customer/restaurant.jpeg';
import WETab from '../../../../../component/common/tab/WETab/WETab.jsx';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import FoodImg from '../../../../../assets/icons/common/food.png';
import Location from '../../../../../assets/icons/reservation/location.svg';
import Clock from '../../../../../assets/icons/reservation/clock.svg';
import Phone from '../../../../../assets/icons/reservation/phone.svg';

const RestaurantDetailPage = () => {
  const params = useParams();
  const nav = useNavigate();

  const handleReservationButtonClick = () => {
    nav('/customer/reservation/time-select');
  };

  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setActiveIcons,
    setIsShowBackIcon,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setPageName('서래갈매기 한밭대점'); // 나중에 가게이름
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const informations = {
    restaurantBusinessNumber: '수정-수정',
    restaurantOwnerName: '이경곤수정222',
    restaurantAddress: '포항',
    restaurantPhone: '01011112222',
    restaurantName: '경곤수정식당',
    restaurantCategoryName: '보쌈족발',
    restaurantOpenTime: '09:00',
    restaurantCloseTime: '23:59',
    breakStartTime: '12:00',
    breakEndTime: '13:30',
    maxReservationTime: 120,
    minMemberCount: 2,
    maxMemberCount: 5,
    depositPerMember: 10000,
    restaurantDescription: '음식 지림',
    latitude: 12.25,
    longitude: 35.0,
    menuListResponseDto: {
      menusMap: {
        고기: [
          {
            menuId: 1,
            menuName: '갈매기살',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 2,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음,뒤지게 맛있음',
          },
          {
            menuId: 3,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 4,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 5,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 6,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 7,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 8,
            menuName: '개매운족발',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
          {
            menuId: 9,
            menuName: 'ABC 초코',
            menuPrice: 10,
            menuImage: FoodImg,
            menuDescription: '많이달다',
          },
        ],
        주류: [
          {
            menuId: 2,
            menuName: '맥주',
            menuPrice: 10000,
            menuImage: FoodImg,
            menuDescription: '뒤지게 맛있음',
          },
        ],
      },
    },
  };

  // const categories = [
  //   { id: 1, Name: '메인메뉴' },
  //   { id: 2, Name: '사이드' },
  //   { id: 3, Name: '음료/주류' },
  // ];

  const categories = Object.keys(informations.menuListResponseDto.menusMap);
  const activeMenus =
    informations.menuListResponseDto.menusMap[categories[activeTab]];

  return (
    <Box>
      {/* <div> {params.id}번 가게 상세페이지</div> */}
      <RestaurantImageBox src={RestaurantImg} />
      <InformationContainer>
        <InformationText>
          &emsp;{informations.restaurantDescription}
        </InformationText>
        <InformationWrapper>
          <IconImg src={Location} alt="주소" />
          <InformationText>{informations.restaurantAddress}</InformationText>
        </InformationWrapper>
        <InformationWrapper>
          <IconImg src={Clock} alt="영업시간" />
          <InformationText>
            {informations.restaurantOpenTime}~{informations.restaurantCloseTime}
            &nbsp;(브레이크타임 {informations.breakStartTime}~
            {informations.breakEndTime})
          </InformationText>
        </InformationWrapper>
        <InformationWrapper>
          <IconImg src={Phone} alt="전화번호" />
          <InformationText>{informations.restaurantPhone}</InformationText>
        </InformationWrapper>
      </InformationContainer>
      <WETabContainer>
        <WETab
          tabs={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </WETabContainer>
      <MenuContainer>
        {activeMenus.map((menu) => (
          <MenuBox key={menu.menuId}>
            <ImageBox key={menu.menuId}>
              <MenuImg src={menu.menuImage} alt={menu.menuName} width="100" />
            </ImageBox>
            <MenuContentContainer>
              <MenuName>{menu.menuName}</MenuName>
              <MenuPrice>{menu.menuPrice}원</MenuPrice>
              <MenuDescription>{menu.menuDescription}</MenuDescription>
            </MenuContentContainer>
          </MenuBox>
        ))}
      </MenuContainer>
      <ButtonBox>
        <Button size={'long'} onClick={handleReservationButtonClick}>
          예약하기
        </Button>
      </ButtonBox>
    </Box>
  );
};

export default RestaurantDetailPage;
