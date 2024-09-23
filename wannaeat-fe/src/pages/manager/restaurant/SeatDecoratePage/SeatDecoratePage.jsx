import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import GridCanvas from '../../../../component/manager/restaurant/SeatDecorate/GridCanvas/GridCanvas.jsx';
import ItemPalette from '../../../../component/manager/restaurant/SeatDecorate/ItemPalette/ItemPalette.jsx';

const SeatDecoratePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <ItemPalette/>
        <GridCanvas />
      </div>
    </DndProvider>
  );
};

export default SeatDecoratePage;
