import React from 'react';
import GridCanvas from '../../../../component/manager/restaurant/SeatDecorate/GridCanvas/GridCanvas.jsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const SeatDecoratePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <GridCanvas />
      </div>
    </DndProvider>
  );
};

export default SeatDecoratePage;
