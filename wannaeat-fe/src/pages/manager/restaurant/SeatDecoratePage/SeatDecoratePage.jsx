import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import GridCanvas from '../../../../component/manager/restaurant/SeatDecorate/GridCanvas/GridCanvas.jsx';
import ItemPalette from '../../../../component/manager/restaurant/SeatDecorate/ItemPalette/ItemPalette.jsx';
import FloorSelector from 'component/manager/restaurant/SeatDecorate/FloorSelector/FloorSelector.jsx';
import useHeaderStore from '../../../../stores/common/useHeaderStore.js';
import { isMobile } from 'react-device-detect';
import { SeatDecoratePageStyled } from './SeatDecoreatePage.js';

const SeatDecoratePage = () => {
  const location = useLocation();
  const { dropdownId, floor } = location.state || {};

  const gridSizes = {
    0: 5,
    1: 10,
    2: 15,
  };

  const { setIsCarrot, setIsShowBackIcon, setActiveIcons, setPageName } =
    useHeaderStore();
  const [currentFloor, setCurrentFloor] = useState(1);

  const gridC = gridSizes[dropdownId] || 10;
  const gridR = gridSizes[dropdownId] || 10;
  const floors = Array.from({ length: floor }, (_, i) => i + 1);

  const touchbackendOptions = {
    enableMouseEvents: true,
  };

  useEffect(() => {
    setIsCarrot(true);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
    setPageName('매장 꾸미기');
  }, [setIsCarrot, setIsShowBackIcon, setActiveIcons, setPageName]);

  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={isMobile ? touchbackendOptions : {}}
    >
      <SeatDecoratePageStyled>
        <ItemPalette />
        <FloorSelector
          floors={floors}
          currentFloor={currentFloor}
          onFloorChange={setCurrentFloor}
        />
        <GridCanvas
          currentFloor={currentFloor}
          gridColumns={gridC}
          gridRows={gridR}
          floorCnt={floor}
        />
      </SeatDecoratePageStyled>
    </DndProvider>
  );
};

export default SeatDecoratePage;
