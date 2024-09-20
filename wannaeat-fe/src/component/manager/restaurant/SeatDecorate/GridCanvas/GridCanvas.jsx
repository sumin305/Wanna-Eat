import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import useGridCanvasStore from '../../../../../stores/manager/restaurant/SeatDecorate/useGridCanvasStore.js'; // zustand 상태 관리 import
import { GridBackground, GridItem } from './GridCanvas.js'; // 스타일링 import

const GridCanvas = ({ size = 'medium', floor = 1 }) => {
  const [gridSize, setGridSize] = useState(50);
  const [gridColumns, setGridColumns] = useState(12); // 기본 그리드 크기 설정
  const addItem = useGridCanvasStore((state) => state.addItem); // zustand 상태 관리에서 요소 추가
  const setFloor = useGridCanvasStore((state) => state.setFloor); // 층 변경 함수 가져오기
  const layout = useGridCanvasStore((state) =>
    state.elements.filter((el) => el.floor === floor)
  );

  // 가게 크기에 따라 그리드 크기 설정
  useEffect(() => {
    switch (size) {
      case 'small':
        setGridColumns(8);
        setGridSize(40);
        break;
      case 'small-medium':
        setGridColumns(10);
        setGridSize(45);
        break;
      case 'medium':
        setGridColumns(12);
        setGridSize(50);
        break;
      case 'large-medium':
        setGridColumns(15);
        setGridSize(55);
        break;
      case 'large':
        setGridColumns(20);
        setGridSize(60);
        break;
      default:
        setGridColumns(10);
        setGridSize(50);
    }

    // 'floor' 값을 zustand의 상태로 설정
    setFloor(floor);
  }, [size, floor, setFloor]);

  const [, dropRef] = useDrop({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const x = Math.round(offset.x / gridSize) * gridSize;
      const y = Math.round(offset.y / gridSize) * gridSize;
      addItem({ ...item, x, y, floor });
    },
  });

  return (
    <GridBackground ref={dropRef} gridColumns={gridColumns}>
      {layout.map((el) => (
        <GridItem key={el.id} x={el.x} y={el.y}>
          <img src={`/path/to/${el.id}.png`} alt={el.label} />
        </GridItem>
      ))}
    </GridBackground>
  );
};

export default GridCanvas;
