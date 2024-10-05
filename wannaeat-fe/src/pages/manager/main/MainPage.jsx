import { useEffect } from 'react';
import {
  MainPageStyled,
  GoToSeatDecorateStyled,
  GoToSeatDecorateButtonStyled,
} from './MainPage.js';

import { useNavigate } from 'react-router-dom';

import useHeaderStore from '../../../stores/common/useHeaderStore.js';

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
  }, []);

  const navigate = useNavigate();

  return (
    <MainPageStyled>
      <GoToSeatDecorateStyled>
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
