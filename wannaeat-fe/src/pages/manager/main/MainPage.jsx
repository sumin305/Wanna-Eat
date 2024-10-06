import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from './MainPage.js';

import Button from 'component/common/button/WEButton/WEButton.jsx';

import useHeaderStore from '../../../stores/common/useHeaderStore.js';
import { useDropdownStore } from 'stores/common/useDropdownStore.js';

import WEDropdown from 'component/common/dropdown/WEDropdown.jsx';

const MainPage = () => {
  const {
    setPageName,
    setIsCarrot,
    setActiveIcons,
    setIsUnderLine,
    setIsShowLogo,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setActiveIcons([3]);
    setIsUnderLine(false);
    setIsShowLogo(true);
    setPageName('');
  }, [setIsCarrot, setActiveIcons, setIsUnderLine, setIsShowLogo, setPageName]);

  const navigate = useNavigate();

  const [dropdownId, setDropdownId] = useState(1);
  const { setItems, setWidth, setSelectedId } = useDropdownStore();

  useEffect(() => {
    setItems(['소형 (50m² 이하)', '중형 (50m² ~ 150m²)', '대형 (150m² 이상)']);
    setWidth('10.375rem');
    setSelectedId(1);
  }, [setItems, setWidth, setSelectedId]);

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
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <MainPageStyled>
      <GoToSeatDecorateStyled>
        <GoToSeatDecorateButtonStyled onClick={handleModalOpen}>
          매장 꾸미기
        </GoToSeatDecorateButtonStyled>
      </GoToSeatDecorateStyled>

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
