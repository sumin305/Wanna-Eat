import MapContainer from '../../../component/customer/map/Map.jsx';
import useModalStore from '../../../stores/common/useModalStore.js';
import {
  MapRestaurantBox,
  MapBox,
  HeaderContainer,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  FilterButton,
  ButtonContainer,
} from './MapRestaurantPage';
import MapFilterModalBox from '../../../component/customer/map/MapFilterModalBox.jsx';
import searchIcon from '../../../assets/icons/common/search.svg';
import useReservationStore from '../../../stores/customer/useReservationStore.js';
import useMapStore from '../../../stores/map/useMapStore.js';
import useChatStore from '../../../stores/customer/useChatStore.js';
import useMapFilterStore from '../../../stores/map/useMapFilterStore.js';

const MapRestaurantPage = () => {
  const {
    open,
    close,
    setModalType,
    setTitle,
    setConfirmText,
    setChildren,
    setHandleButtonClick,
  } = useModalStore();

  const { reservationDate, startTime, endTime, memberCount } =
    useReservationStore();
  const { categoryId, keyword, setKeyword } = useMapFilterStore();
  const {
    setIsInitialLoad,
    lat,
    lon,
    getRestaurantPositions,
    setMarkerPositions,
  } = useMapStore();

  const handleFilterModalButtonClick = () => {
    setIsInitialLoad(false);
    setModalType('sheet');
    setTitle('식당 필터링');
    setConfirmText('필터링');
    setHandleButtonClick(() => {
      setfilterRestaurantsMarker();
      close();
    });
    setChildren(<MapFilterModalBox />);
    open();
  };

  const setfilterRestaurantsMarker = async () => {
    await setMarkerPositions(
      getRestaurantPositions({
        latitude: lat,
        longitude: lon,
        ...(categoryId !== -1 && { categoryId: categoryId }),
        ...(keyword && { keyword: keyword }),
        ...(reservationDate && { reservationDate: reservationDate }),
        ...(startTime && startTime !== '00:00' && { startTime: startTime }),
        ...(endTime && endTime !== '00:00' && { endTime: endTime }),
        ...(memberCount && memberCount !== -1 && { memberCount: memberCount }),
      })
    );
  };

  const handleSearchInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchIconClick = () => {
    setfilterRestaurantsMarker();
  };

  const getRestaurantCategoryName = (categoryId) => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const categoryName =
      categories.filter((c) => c.restaurantCategoryId === categoryId)[0]
        ?.restaurantCategoryName || '';
    return categoryName;
  };

  // 버튼을 동적으로 생성하는 함수
  const renderFilterButtons = () => {
    const buttons = [];

    if (reservationDate) {
      buttons.push(
        <FilterButton
          onClick={handleFilterModalButtonClick}
          key="date"
          isEven={buttons.length % 2 === 0}
        >
          {reservationDate}
        </FilterButton>
      );
    }

    if (memberCount !== -1) {
      buttons.push(
        <FilterButton
          onClick={handleFilterModalButtonClick}
          key="headCount"
          isEven={buttons.length % 2 === 0}
        >
          {memberCount}명
        </FilterButton>
      );
    }

    if (categoryId !== -1) {
      buttons.push(
        <FilterButton
          onClick={handleFilterModalButtonClick}
          key="category"
          isEven={buttons.length % 2 === 0}
        >
          {getRestaurantCategoryName(categoryId)}
        </FilterButton>
      );
    }

    if (buttons.length === 0) {
      buttons.push(
        <FilterButton
          onClick={handleFilterModalButtonClick}
          key="default"
          isEven={true}
        >
          검색 조건 설정하기
        </FilterButton>
      );
    }

    return buttons;
  };

  const buttons = renderFilterButtons();

  return (
    <MapRestaurantBox>
      <HeaderContainer>
        <SearchWrapper>
          <SearchInput
            value={keyword}
            onChange={handleSearchInputChange}
            placeholder="메뉴, 식당, 지역 검색"
          />
          <SearchIcon
            onClick={handleSearchIconClick}
            src={searchIcon}
          ></SearchIcon>
        </SearchWrapper>
        <ButtonContainer>{buttons}</ButtonContainer>
      </HeaderContainer>
      <MapBox>
        <MapContainer />
      </MapBox>
    </MapRestaurantBox>
  );
};

export default MapRestaurantPage;
