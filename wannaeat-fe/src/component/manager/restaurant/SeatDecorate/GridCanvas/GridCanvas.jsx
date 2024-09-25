import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDrop, useDrag } from 'react-dnd';
import { paletteItems } from '../ItemPalette/ItemPalette';
import {
  GridWrapperStyled,
  ZoomableGridWrapperStyled,
  GridBackgroundStyled,
  GridCellStyled,
  GridItemStyled,
  CancelButtonStyled,
  SaveButtonStyled,
} from './GridCanvas';
import { create } from 'zustand';

const useStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  updateItemPosition: (id, newX, newY) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, x: newX, y: newY } : item
      ),
    })),
  setItems: (items) => set({ items }),
  clearItems: () => set({ items: [] }),
}));

const GridCanvas = () => {
  const gridColumns = 15; // 가로
  const gridRows = 15; // 세로
  const [gridSize, setGridSize] = useState(50);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const { items, addItem, setItems, updateItemPosition } = useStore();

  const containerRef = useRef(null);

  const calculateGridSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight - 200;

    const maxGridWidth = Math.min(width, 480);
    const maxGridHeight = height;

    const sizeBasedOnWidth = maxGridWidth / gridColumns;
    const sizeBasedOnHeight = maxGridHeight / gridRows;
    const newSize = Math.min(sizeBasedOnWidth, sizeBasedOnHeight);

    setGridSize(newSize);
  };

  useEffect(() => {
    calculateGridSize();
    window.addEventListener('resize', calculateGridSize);
    return () => window.removeEventListener('resize', calculateGridSize);
  }, []);

  useEffect(() => {
    axios
      .get('/api/restaurants/{restaurantId}structure')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('꾸미기 정보 요청 오류:', error);
      });
  }, [setItems]);

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const newScale = Math.min(Math.max(scale - e.deltaY * 0.01, 1), 3);
      setScale(newScale);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setLastPos({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;

    const deltaX = currentX - lastPos.x;
    const deltaY = currentY - lastPos.y;

    if (containerRef.current) {
      containerRef.current.scrollLeft -= deltaX;
      containerRef.current.scrollTop -= deltaY;
    }

    setLastPos({ x: currentX, y: currentY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const [, dropRef] = useDrop({
    accept: ['PALETTE_ITEM', 'GRID_ITEM'],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const containerRect = containerRef.current.getBoundingClientRect();

      const scrollLeft = containerRef.current.scrollLeft;
      const scrollTop = containerRef.current.scrollTop;

      const adjustedX = (offset.x - containerRect.left + scrollLeft) / scale;
      const adjustedY = (offset.y - containerRect.top + scrollTop) / scale;

      const x = Math.floor(adjustedX / gridSize) * gridSize;
      const y = Math.floor(adjustedY / gridSize) * gridSize;

      if (item.type === 'PALETTE_ITEM') {
        const selectedItem = paletteItems.find(
          (paletteItem) => paletteItem.id === item.id
        );

        if (selectedItem) {
          addItem({
            id: item.id,
            x,
            y,
            icon: selectedItem.icon,
            label: selectedItem.label,
            rotation: 0,
          });
        }
      } else if (item.type === 'GRID_ITEM') {
        updateItemPosition(item.id, x, y);
      }

      setIsDragging(false);
    },
  });

  const handleSave = () => {
    axios
      .post('/api/save', items, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('꾸미기 저장 성공:', response);
      })
      .catch((error) => {
        console.error('꾸미기 저장 실패:', error);
      });
  };

  return (
    <div>
      <GridWrapperStyled
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        scale={scale}
      >
        <ZoomableGridWrapperStyled
          scale={scale}
          gridColumns={gridColumns}
          gridRows={gridRows}
          gridSize={gridSize}
        >
          <GridBackgroundStyled
            ref={dropRef}
            gridColumns={gridColumns}
            gridRows={gridRows}
            gridSize={gridSize}
          >
            {Array.from({ length: gridColumns * gridRows }).map((_, index) => (
              <GridCellStyled key={index} />
            ))}
            {items.map((item) => (
              <GridItem key={item.id} item={item} gridSize={gridSize} />
            ))}
          </GridBackgroundStyled>
        </ZoomableGridWrapperStyled>
        <SaveButtonStyled onClick={handleSave}>저장</SaveButtonStyled>
        <CancelButtonStyled>취소</CancelButtonStyled>
      </GridWrapperStyled>
    </div>
  );
};

const GridItem = ({ item, gridSize }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'GRID_ITEM',
    item: { id: item.id, type: 'GRID_ITEM' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <GridItemStyled
      ref={drag}
      gridSize={gridSize}
      isDragging={isDragging}
      x={item.x}
      y={item.y}
      rotation={item.rotation}
    >
      <item.icon
        className="grid-item-icon"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </GridItemStyled>
  );
};

export default GridCanvas;
