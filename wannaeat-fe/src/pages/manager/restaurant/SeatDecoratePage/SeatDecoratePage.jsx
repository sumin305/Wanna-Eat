import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import GridCanvas from '../../../../component/manager/restaurant/SeatDecorate/GridCanvas/GridCanvas.jsx';
import ItemPalette from '../../../../component/manager/restaurant/SeatDecorate/ItemPalette/ItemPalette.jsx';
import useHeaderStore from '../../../../stores/common/header/useHeaderStore.js';
import { isMobile } from 'react-device-detect';
import { SeatDecoratePageStyled } from './SeatDecoreatePage.js';

const SeatDecoratePage = () => {
  const { setIsCarrot, setIsShowBackIcon, setActiveIcons, setPageName } =
    useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
    setPageName('매장 꾸미기');
  }, []);

  if (isMobile) {
    window.alert('모바일입니다.');
  } else {
    window.alert('PC입니다.');
  }

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      {/* <DndProvider backend={HTML5Backend}> */}
      {/* <DndProvider backend={TouchBackend}> */}
      <SeatDecoratePageStyled>
        <ItemPalette />
        <GridCanvas />
      </SeatDecoratePageStyled>
    </DndProvider>
  );
};

export default SeatDecoratePage;
