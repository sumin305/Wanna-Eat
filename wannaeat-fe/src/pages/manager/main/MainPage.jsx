import { useEffect } from 'react';
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
} from './MainPage.js';

import useHeaderStore from '../../../stores/common/useHeaderStore.js';
import useModalStore from 'stores/common/useModalStore.js';
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

  const { setItems, setWidth, setSelectedId } = useDropdownStore();

  useEffect(() => {
    setItems(['소형 (50m² 이하)', '중형 (50m² ~ 150m²)', '대형 (150m² 이상)']);
    setWidth('10.375rem');
    setSelectedId(1);
  }, [setItems, setWidth, setSelectedId]);

  const {
    open,
    // close,
    setModalType,
    setTitle,
    setChildren,
    // setHandleButtonClick,
  } = useModalStore();

  const handleModalOpen = () => {
    setModalType('setting');
    setTitle('매장 크기와 층 수를 선택해 주세요');

    setChildren(
      <InfoFormStyled>
        <InputWrapperStyled>
          <LabelStyled>크기</LabelStyled>
          <div>
            <WEDropdown useDropdownStore={useDropdownStore} />
          </div>
        </InputWrapperStyled>
        <InputWrapperStyled>
          <LabelStyled>층 수</LabelStyled>
          <InputFloorWrapperStyled>
            <InputFloorStyled
              type="number"
              min={1}
              max={5}
              defaultValue={1}
              inputMode="numeric"
              onInput={(e) => {
                const value = e.target.value;
                if (value < 1) {
                  e.target.value = 1;
                } else if (value > 5) {
                  e.target.value = 5;
                }
              }}
            />
            <div className="floor-label">층</div>
          </InputFloorWrapperStyled>
        </InputWrapperStyled>
      </InfoFormStyled>
    );
    open();
  };

  return (
    <MainPageStyled>
      <GoToSeatDecorateStyled onClick={handleModalOpen}>
        <GoToSeatDecorateButtonStyled
          onClick={() => navigate('/manager/restaurant/seat-decorate')}
        >
          매장 꾸미기
        </GoToSeatDecorateButtonStyled>
      </GoToSeatDecorateStyled>
    </MainPageStyled>
  );
};

export default MainPage;
