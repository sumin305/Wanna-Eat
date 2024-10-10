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
import RestaurantImg from 'assets/customer/restaurant.jpg';
import WETab from '../../../../../component/common/tab/WETab/WETab.jsx';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import Location from '../../../../../assets/icons/reservation/location.svg';
import Clock from '../../../../../assets/icons/reservation/clock-white.svg';
import Phone from '../../../../../assets/icons/reservation/phone.svg';
import MenuIcon from 'assets/icons/menu/basic-menu.svg';
import useRestaurantStore from 'stores/customer/useRestaurantStore';
import { addZzimRestaurant, removeZzimRestaurant } from 'api/customer/zzim.js';

const RestaurantDetailPage = () => {
  const params = useParams();
  const nav = useNavigate();
  const [activeMenus, setActiveMenus] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [restaurantImage, setRestaurantImage] = useState('');
  const handleReservationButtonClick = () => {
    nav('/customer/reservation/time-select');
  };

  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setActiveIcons,
    setIsShowBackIcon,
    setIconAction,
  } = useHeaderStore();

  const {
    restaurant,
    breakEndTime,
    breakStartTime,
    menus,
    restaurantAddress,
    restaurantCloseTime,
    restaurantDescription,
    restaurantName,
    restaurantOpenTime,
    restaurantPhone,
    setRestaurant,
    setRestaurantId,
    menuCategories,
    restaurantLike,
    setRestaurantLike,
  } = useRestaurantStore();

  useEffect(() => {
    console.log('restaurant: ', restaurant);

    const fetchRestaurant = async () => {
      const restaurantResult = await setRestaurant(params.id);
      await setRestaurantId(params.id);
      setRestaurantImage(
        restaurantResult.restaurantImageListResponseDto
          ? restaurantResult.restaurantImageListResponseDto.restaurantImages[0]
          : null
      );
    };

    setRestaurant(params.id);
    setIsCarrot(true);
    setPageName(restaurantName ? restaurantName : '맛있는 식당');
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    fetchRestaurant();
  }, []);

  useEffect(() => {
    setPageName(restaurantName ? restaurantName : '맛있는 식당');
    setActiveMenus(
      menuCategories.length === 0
        ? []
        : menus.filter(
            (menu) => menu.menuCategoryName === menuCategories[activeTab]
          )[0].menuDetailResponseDtos
    );
    setRestaurant(params.id);
  }, [restaurantName]);

  useEffect(() => {
    const addZzim = async () => {
      const result = await addZzimRestaurant(params.id);
      if (result.status === 201) {
        setRestaurantLike(true);
      }
    };
    const removeZzim = async () => {
      const result = await removeZzimRestaurant(params.id);
      if (result.status === 200) {
        setRestaurantLike(false);
      }
    };
    if (restaurantLike) {
      setActiveIcons([7]);
      setIconAction([removeZzim]);
    } else {
      setActiveIcons([6]);
      setIconAction([addZzim]);
    }
  }, [restaurantLike]);
  useEffect(() => {
    setActiveMenus(
      !menuCategories || menuCategories.length === 0
        ? []
        : menus.filter(
            (menu) => menu.menuCategoryName === menuCategories[activeTab]
          )[0].menuDetailResponseDtos
    );
  }, [activeTab]);

  return (
    <Box>
      <RestaurantImageBox
        src={restaurantImage ? restaurantImage : RestaurantImg}
      />
      <InformationContainer>
        <InformationText>
          &emsp;
          {restaurantDescription ? restaurantDescription : '맛있는 식당입니다.'}
        </InformationText>
        <InformationWrapper>
          <IconImg src={Location} alt="주소" />
          <InformationText>
            {restaurantAddress ? restaurantAddress : '정보없음'}
          </InformationText>
        </InformationWrapper>
        <InformationWrapper>
          <IconImg src={Clock} alt="영업시간" />
          <InformationText>
            {restaurantOpenTime ? restaurantOpenTime : '00:00'}~
            {restaurantCloseTime ? restaurantCloseTime : '00:00'}
            &nbsp;
            {breakStartTime && breakEndTime && (
              <>
                (브레이크타임 {breakStartTime}~{breakEndTime})
              </>
            )}
          </InformationText>
        </InformationWrapper>
        <InformationWrapper>
          <IconImg src={Phone} alt="전화번호" />
          <InformationText>
            {restaurantPhone ? restaurantPhone : '정보 없음'}
          </InformationText>
        </InformationWrapper>
      </InformationContainer>
      <WETabContainer>
        <WETab
          tabs={menuCategories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </WETabContainer>
      <MenuContainer>
        {activeMenus &&
          activeMenus.map((menu, index) => (
            <MenuBox key={index}>
              <ImageBox key={menu.menuId}>
                <MenuImg
                  src={menu.menuImage ? menu.menuImage : MenuIcon}
                  alt={menu.menuName}
                  width="100"
                />
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
