import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
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
  setItems: (items) => set({ items }),
  clearItems: () => set({ items: [] }),
}));

const GridCanvas = () => {
  const gridColumns = 10; // 가로
  const gridRows = 10; // 세로
  const [gridSize, setGridSize] = useState(50);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const { items, addItem, setItems } = useStore();

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
    fetch('/api/restaurants/{restaurantId}structure')
      .then((response) => response.json())
      .then((data) => setItems(data));
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
    accept: 'ITEM',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const containerRect = containerRef.current.getBoundingClientRect();

      const scrollLeft = containerRef.current.scrollLeft;
      const scrollTop = containerRef.current.scrollTop;

      const adjustedX = (offset.x - containerRect.left + scrollLeft) / scale;
      const adjustedY = (offset.y - containerRect.top + scrollTop) / scale;

      const x = Math.floor(adjustedX / gridSize) * gridSize;
      const y = Math.floor(adjustedY / gridSize) * gridSize;

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
    },
  });

  const handleSave = () => {
    fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
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
              <GridItemStyled
                key={item.id}
                gridSize={gridSize}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  transform: `rotate(${item.rotation}deg)`,
                }}
              >
                <item.icon
                  className="grid-item-icon"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </GridItemStyled>
            ))}
          </GridBackgroundStyled>
        </ZoomableGridWrapperStyled>
        <SaveButtonStyled onClick={handleSave}>저장</SaveButtonStyled>
        <CancelButtonStyled>취소</CancelButtonStyled>
      </GridWrapperStyled>
    </div>
  );
};

export default GridCanvas;
