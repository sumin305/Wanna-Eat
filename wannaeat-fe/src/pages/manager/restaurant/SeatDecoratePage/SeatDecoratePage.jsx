import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { createTransition } from 'react-dnd-multi-backend';
import GridCanvas from '../../../../component/manager/restaurant/SeatDecorate/GridCanvas/GridCanvas.jsx';
import ItemPalette from '../../../../component/manager/restaurant/SeatDecorate/ItemPalette/ItemPalette.jsx';
import useHeaderStore from '../../../../stores/common/header/useHeaderStore.js';

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: createTransition('touchstart', (event) => {
        return event.pointerType === 'touch';
      }),
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
    },
  ],
};

const SeatDecoratePage = () => {
  const { setIsCarrot, setIsShowBackIcon, setActiveIcons, setPageName } =
    useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setIsShowBackIcon(true);
    setActiveIcons([5]);
    setPageName('매장 꾸미기');
  }, []);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div>
        <ItemPalette />
        <GridCanvas />
      </div>
    </DndProvider>
  );
};

export default SeatDecoratePage;
