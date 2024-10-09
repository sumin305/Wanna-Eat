import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authClientInstance } from 'utils/http-client.js';
import {
  MainPageStyled,
  GoToSeatDecorateStyled,
  GoToSeatDecorateButtonStyled,
  InfoFormStyled,
  LabelStyled,
  InputWrapperStyled,
  InputFloorWrapperStyled,
  InputFloorStyled,
  SettingModalContainer,
  ButtonWrapper,
  HrStyled,
  ModalTitleStyled,
  ModalContentWrapper,
  ModalOverlayStyled,
  ReservationCountStyled,
  RotatingIconWrapper,
  ManagerImgWrapperStyled,
  ManagerImgStyled,
  SuggestionMessageStyled,
} from './MainPage.js';

import SeatingMap from 'component/manager/main/SeatingMap/SeatingMap.jsx';

import Button from 'component/common/button/WEButton/WEButton.jsx';

import useHeaderStore from '../../../stores/common/useHeaderStore.js';
import { useDropdownStore } from 'stores/common/useDropdownStore.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore.js';

import WEDropdown from 'component/common/dropdown/WEDropdown.jsx';
import { ReactComponent as RefreshIcon } from 'assets/icons/manager/restaurant/refresh.svg';

const MainPage = () => {
  const {
    setPageName,
    setIsCarrot,
    setActiveIcons,
    setIsUnderLine,
    setIsShowLogo,
    setIconAction,
  } = useHeaderStore();

  const { restaurantSize, restaurantFloorCnt } = useMyRestaurantStore();

  useEffect(() => {
    setIsCarrot(true);
    setActiveIcons([3]);
    setIsUnderLine(false);
    setIsShowLogo(true);
    setPageName('');
    setIconAction([() => navigate('/manager/alarm')]);
  }, [
    setIsCarrot,
    setActiveIcons,
    setIsUnderLine,
    setIsShowLogo,
    setPageName,
    setIconAction,
  ]);

  const restaurantId = window.localStorage.getItem('restaurantId');
  const navigate = useNavigate();

  const [dropdownId, setDropdownId] = useState(1);
  const { setItems, setWidth, setSelectedId } = useDropdownStore();

  const [pastReservationCnt, setPastReservationCnt] = useState(-1);
  const [totalReservationCnt, setTotalReservationCnt] = useState(-1);

  const [isRotating, setIsRotating] = useState(false);

  const [occupiedList, setOccupiedList] = useState([]);

  const [isMyRestaurant, setIsMyRestaurant] = useState(true);

  // 매장 구조도 등록이 안 되어 있는 경우!!!!!
  const handle404Error = () => {
    setIsMyRestaurant(false);
  };

  // 매장이 없으면 매장등록페이지로 이동
  useEffect(() => {
    if (!restaurantId) {
      navigate(`/manager/restaurant-regist`);
    }
  });

  useEffect(() => {
    setItems(['소형 (50m² 이하)', '중형 (50m² ~ 150m²)', '대형 (150m² 이상)']);
    setWidth('10.375rem');
    setSelectedId(1);
    fetchMainData();
  }, [setItems, setWidth, setSelectedId]);

  useEffect(() => {
    setFloor(restaurantFloorCnt);
  }, [restaurantFloorCnt]);

  const handleDropdownOnSelect = (selectedValue) => {
    let mappedIndex;

    switch (selectedValue) {
      case '소형 (50m² 이하)':
        mappedIndex = 0;
        break;
      case '중형 (50m² ~ 150m²)':
        mappedIndex = 1;
        break;
      case '대형 (150m² 이상)':
        mappedIndex = 2;
        break;
      default:
        mappedIndex = 1;
        break;
    }

    setDropdownId(mappedIndex);
  };

  const handleSubmit = () => {
    if (floor === '') {
      window.alert('층을 입력해 주세요');
      return;
    }

    console.log(
      'dropdownId:' + dropdownId + ' floor:' + floor + ' 제출되었습니다.'
    );
    close();
    navigate('/manager/restaurant/seat-decorate', {
      state: { dropdownId, floor },
    });
  };

  const [floor, setFloor] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    if (isMyRestaurant) {
      let mappedIndex;
      switch (restaurantSize) {
        case 'SMALL':
          mappedIndex = 0;
          break;
        case 'MEDIUM':
          mappedIndex = 1;
          break;
        case 'LARGE':
          mappedIndex = 2;
          break;
        default:
          mappedIndex = 1;
          break;
      }

      navigate('/manager/restaurant/seat-decorate', {
        state: { mappedIndex, floor },
      });
    }

    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
  };

  const fetchMainData = async () => {
    setIsRotating(true);
    try {
      const response = await authClientInstance.get(`/api/users/restaurants`);

      const data = response.data.data;
      setPastReservationCnt(data.pastReservationCount);
      setTotalReservationCnt(data.totalReservationCount);

      setOccupiedList(data.currentReservedTables);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setIsMyRestaurant(false);
        } else {
          console.error('사업자 메인 데이터 요청 오류:', error);
        }
      }
      return;
    } finally {
      setTimeout(() => setIsRotating(false), 1000);
    }
  };

  return (
    <MainPageStyled>
      <GoToSeatDecorateStyled>
        <GoToSeatDecorateButtonStyled onClick={handleModalOpen}>
          매장 꾸미기
        </GoToSeatDecorateButtonStyled>
      </GoToSeatDecorateStyled>

      {isMyRestaurant && (
        <>
          <SeatingMap OccupiedList={occupiedList} on404Error={handle404Error} />
          {}
          {pastReservationCnt >= 0 && (
            <ReservationCountStyled>
              금일 예약 현황: {pastReservationCnt}/{totalReservationCnt} (건)
              <RotatingIconWrapper isRotating={isRotating}>
                <RefreshIcon onClick={fetchMainData} />
              </RotatingIconWrapper>
            </ReservationCountStyled>
          )}
        </>
      )}

      {!isMyRestaurant && (
        <>
          <SuggestionMessageStyled>
            매장 꾸미기를 해 주세요
          </SuggestionMessageStyled>
          <ManagerImgWrapperStyled>
            <ManagerImgStyled />
          </ManagerImgWrapperStyled>
        </>
      )}

      {isModalOpen && (
        <ModalOverlayStyled isModalOpen={isModalOpen} onClick={close}>
          <SettingModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalContentWrapper>
              <ModalTitleStyled>
                매장 크기와 층 수를 선택해 주세요
              </ModalTitleStyled>
              <HrStyled></HrStyled>
              <div>
                <InfoFormStyled>
                  <InputWrapperStyled>
                    <LabelStyled>크기</LabelStyled>
                    <div>
                      <WEDropdown
                        useDropdownStore={useDropdownStore}
                        onSelect={handleDropdownOnSelect}
                      />
                    </div>
                  </InputWrapperStyled>
                  <InputWrapperStyled>
                    <LabelStyled>층 수</LabelStyled>
                    <InputFloorWrapperStyled>
                      <InputFloorStyled
                        type="number"
                        min={1}
                        max={5}
                        value={floor || ''}
                        inputMode="numeric"
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value === '') {
                            setFloor('');
                          } else {
                            const numericValue = parseInt(value, 10);

                            if (numericValue >= 1 && numericValue <= 5) {
                              setFloor(numericValue);
                            } else if (numericValue < 1) {
                              setFloor(1);
                            } else if (numericValue > 5) {
                              setFloor(5);
                            }
                          }
                        }}
                      />
                      <div className="floor-label">층</div>
                    </InputFloorWrapperStyled>
                  </InputWrapperStyled>
                </InfoFormStyled>
              </div>
            </ModalContentWrapper>
            <ButtonWrapper>
              <Button size="long" onClick={handleSubmit}>
                확인
              </Button>
            </ButtonWrapper>
          </SettingModalContainer>
        </ModalOverlayStyled>
      )}
    </MainPageStyled>
  );
};

export default MainPage;
