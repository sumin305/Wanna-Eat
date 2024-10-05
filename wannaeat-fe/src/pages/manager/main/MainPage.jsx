import { useEffect } from 'react';
import {
  MainPageStyled,
  GoToSeatDecorateStyled,
  GoToSeatDecorateButtonStyled,
} from './MainPage.js';
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

  return (
    <MainPageStyled>
      <GoToSeatDecorateStyled>
        <GoToSeatDecorateButtonStyled>매장 꾸미기</GoToSeatDecorateButtonStyled>
      </GoToSeatDecorateStyled>
    </MainPageStyled>
  );
};

export default MainPage;
