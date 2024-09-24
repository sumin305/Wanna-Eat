import MapContainer from '../../../component/customer/map/Map.jsx';
import useModalStore from '../../../stores/common/modal/useModalStore.js';
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
import useReservationStore from '../../../stores/customer/reservation/useReservationStore.js';

const MapRestaurantPage = () => {
  const { open, setModalType, setTitle, setConfirmText, setChildren } =
    useModalStore();

  const { selectedDate, selectedHeadCount, selectedCategory } =
    useReservationStore();

  const handleFilterModalButtonClick = () => {
    setModalType('sheet');
    setTitle('식당 필터링');
    setConfirmText('필터링');
    setChildren(<MapFilterModalBox />);
    open();
  };

  // 버튼을 동적으로 생성하는 함수
  const renderFilterButtons = () => {
    const buttons = [];

    // selectedDate가 있을 때 버튼 생성
    if (selectedDate) {
      buttons.push(
        <FilterButton onClick={handleFilterModalButtonClick} key="date">
          {selectedDate}
        </FilterButton>
      );
    }

    if (selectedHeadCount) {
      buttons.push(
        <FilterButton onClick={handleFilterModalButtonClick} key="headCount">
          {selectedHeadCount}명
        </FilterButton>
      );
    }

    if (selectedCategory) {
      buttons.push(
        <FilterButton onClick={handleFilterModalButtonClick} key="category">
          {selectedCategory}
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
          <SearchInput placeholder="메뉴, 식당, 지역 검색" />
          <SearchIcon src={searchIcon}></SearchIcon>
        </SearchWrapper>
        <ButtonContainer>
          {buttons.length === 0 ? (
            <FilterButton onClick={handleFilterModalButtonClick}>
              검색 조건 설정하기
            </FilterButton>
          ) : (
            buttons
          )}
        </ButtonContainer>
      </HeaderContainer>
      <MapBox>
        <MapContainer />
      </MapBox>
    </MapRestaurantBox>
  );
};

export default MapRestaurantPage;
