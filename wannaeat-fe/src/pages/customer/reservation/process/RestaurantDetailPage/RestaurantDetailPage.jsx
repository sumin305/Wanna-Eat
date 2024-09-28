import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useHeaderStore from '../../../../../stores/common/useHeaderStore';
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
import useRestaurantStore from 'stores/customer/useRestaurantStore';
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

  const {
    restaurant,
    restaurantId,
    breakEndTime,
    breakStartTime,
    depositPerMember,
    latitude,
    longitude,
    maxMemberCount,
    minMemberCount,
    maxReservationTime,
    menus,
    restaurantAddress,
    restaurantBusinessNumber,
    restaurantCategoryName,
    restaurantCloseTime,
    restaurantDescription,
    restaurantName,
    restaurantOpenTime,
    restaurantOwnerName,
    restaurantPhone,
    restaurantImage
  } = useRestaurantStore();
  
  useEffect(() => {
    setIsCarrot(true);
    setPageName(restaurantName); // 나중에 가게이름
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
  }, []);

  const [activeTab, setActiveTab] = useState(0);


  const categories = Object.keys(menus);
  console.log(categories)
  const activeMenus =
  categories.length === 0 ? [] : menus[categories[activeTab]];

  return (
    <Box>
      {/* <div> {params.id}번 가게 상세페이지</div> */}
      <RestaurantImageBox src={RestaurantImg} />
      <InformationContainer>
        <InformationText>
          &emsp;{restaurantDescription}
        </InformationText>
        <InformationWrapper>
          <IconImg src={Location} alt="주소" />
          <InformationText>{restaurantAddress}</InformationText>
        </InformationWrapper>
        <InformationWrapper>
          <IconImg src={Clock} alt="영업시간" />
          <InformationText>
            {restaurantOpenTime}~{restaurantCloseTime}
            &nbsp;(브레이크타임 {breakStartTime}~
            {breakEndTime})
          </InformationText>
        </InformationWrapper>
        <InformationWrapper>
          <IconImg src={Phone} alt="전화번호" />
          <InformationText>{restaurantPhone}</InformationText>
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
