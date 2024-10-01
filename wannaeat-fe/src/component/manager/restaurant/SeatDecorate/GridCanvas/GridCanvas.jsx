import { useState, useEffect, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { authClientInstance } from 'utils/http-client.js';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { paletteItems } from '../ItemPalette/ItemPalette';
import {
  GridWrapperStyled,
  ZoomableGridWrapperStyled,
  GridBackgroundStyled,
  GridCellStyled,
  GridItemStyled,
  CancelButtonStyled,
  SaveButtonStyled,
  ButtonWrapperStyled,
  GridCanvasModalStyled,
} from './GridCanvas';
import useModalStore from 'stores/common/useModalStore.js';

const useStore = create((set, get) => ({
  itemsByFloor: {},
  gridStatusByFloor: {},

  addItem: (floor, item) => {
    const itemId = uuid();
    console.log('추가된 아이템:', item);
    set((state) => ({
      itemsByFloor: {
        ...state.itemsByFloor,
        [floor]: [
          ...(state.itemsByFloor[floor] || []),
          { ...item, itemType: item.itemType, tableNumber: '', capacity: 0 },
        ],
      },
      gridStatusByFloor: {
        ...state.gridStatusByFloor,
        [floor]: {
          ...state.gridStatusByFloor[floor],
          [`${item.x},${item.y}`]: itemId,
        },
      },
    }));
  },

  updateItem: (floor, itemId, newData) => {
    set((state) => ({
      itemsByFloor: {
        ...state.itemsByFloor,
        [floor]: state.itemsByFloor[floor].map((item) =>
          item.itemId === itemId ? { ...item, ...newData } : item
        ),
      },
    }));
  },

  updateItemPosition: (floor, itemId, newX, newY) => {
    const { itemsByFloor, gridStatusByFloor } = get();
    const item = itemsByFloor[floor].find((item) => item.itemId === itemId);

    if (item) {
      delete gridStatusByFloor[floor][`${item.x},${item.y}`];
    }

    set((state) => ({
      itemsByFloor: {
        ...state.itemsByFloor,
        [floor]: state.itemsByFloor[floor].map((item) =>
          item.itemId === itemId ? { ...item, x: newX, y: newY } : item
        ),
      },
      gridStatusByFloor: {
        ...state.gridStatusByFloor,
        [floor]: {
          ...state.gridStatusByFloor[floor],
          [`${newX},${newY}`]: itemId,
        },
      },
    }));
  },
  setItemsByFloor: (floor, items) =>
    set((state) => ({
      itemsByFloor: {
        ...state.itemsByFloor,
        [floor]: items,
      },
    })),
  clearItemsByFloor: (floor) =>
    set((state) => ({
      itemsByFloor: {
        ...state.itemsByFloor,
        [floor]: [],
      },
    })),
  isCellOccupied: (floor, x, y) => {
    const gridStatus = get().gridStatusByFloor[floor];
    return !!gridStatus && !!gridStatus[`${x},${y}`];
  },
}));

const GridCanvas = ({ currentFloor }) => {
  const gridColumns = 10; // 가로
  const gridRows = 10; // 세로
  const [gridSize, setGridSize] = useState(50);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const {
    itemsByFloor,
    addItem,
    setItemsByFloor,
    updateItem,
    updateItemPosition,
  } = useStore();

  const {
    open,
    close,
    setModalType,
    setTitle,
    setChildren,
    setHandleButtonClick,
  } = useModalStore();
  const [selectedItem, setSelectedItem] = useState();

  const containerRef = useRef();

  const calculateGridSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

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
    const restaurantId = '일단임시식당ID';
    authClientInstance
      .get(`/api/restaurants/${restaurantId}/structure`)
      .then((response) => {
        setItemsByFloor(currentFloor, response.data);
      })
      .catch((error) => {
        console.error('꾸미기 정보 요청 오류:', error);
      });
  }, [setItemsByFloor, currentFloor]);

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

  const handleSubmit = () => {
    if (selectedItem && selectedItem.itemId) {
      const tableNumber = document.querySelector('#tableNumber').value;
      const capacity = document.querySelector('#capacity').value;

      console.log(
        `${tableNumber}번 테이블, 최대 수용 인원 ${capacity}명으로 제출되었습니다!`
      );

      console.log(selectedItem);

      updateItem(currentFloor, selectedItem.itemId, {
        tableNumber,
        capacity: parseInt(capacity, 10),
      });

      close();
    } else {
      console.error('selectedItem이 설정되지 않았습니다.');
    }
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

      if (useStore.getState().isCellOccupied(currentFloor, x, y)) {
        window.alert('중복 방지!!!!!!!!!!!!!!');
        return;
      }

      if (item.type === 'PALETTE_ITEM') {
        const selectedItem = paletteItems.find(
          (paletteItem) => paletteItem.itemId === item.itemId
        );

        if (selectedItem) {
          addItem(currentFloor, {
            itemId: item.itemId,
            itemType: item.itemType,
            x,
            y,
            icon: selectedItem.icon,
            label: selectedItem.label,
            rotation: 0,
          });

          if (
            selectedItem.itemType === 'square' ||
            selectedItem.itemType === 'rounded'
          ) {
            setSelectedItem({
              ...selectedItem,
              itemId: item.itemId,
              x,
              y,
            });
            setModalType('setting');
            setTitle(`${selectedItem.label} 설정`);

            setHandleButtonClick(handleSubmit);
            setChildren(
              <GridCanvasModalStyled>
                <label>
                  테이블 번호:
                  <input
                    id="tableNumber"
                    type="text"
                    placeholder="테이블 번호 입력"
                  />
                </label>
                <label>
                  최대 수용 인원:
                  <input
                    id="capacity"
                    type="number"
                    min="0"
                    placeholder="최대 수용 인원 입력"
                  />
                </label>
              </GridCanvasModalStyled>
            );
            open();
          }
        }
      } else if (item.type === 'GRID_ITEM') {
        updateItemPosition(currentFloor, item.itemId, x, y);
      }

      setIsDragging(false);
    },
  });

  const handleClick = (item) => {
    console.log('클릭된 아이템:', item);
    setSelectedItem(item);
    if (item.itemType === 'square' || item.itemType === 'rounded') {
      setModalType('setting');
      setTitle(`${item.label} 설정`);

      setHandleButtonClick(handleSubmit);
      setChildren(
        <GridCanvasModalStyled>
          <label>
            테이블 번호:
            <input
              id="tableNumber"
              type="text"
              placeholder="테이블 번호 입력"
              defaultValue={item.tableNumber}
            />
          </label>
          <label>
            최대 수용 인원:
            <input
              id="capacity"
              type="number"
              min="0"
              placeholder="최대 수용 인원 입력"
              defaultValue={item.capacity}
            />
          </label>
        </GridCanvasModalStyled>
      );
      open();
    }
  };

  const handleCanvasSave = () => {
    authClientInstance
      .post(
        '/api/restaurants/{restaurantId}structure',
        { itemsByFloor },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('꾸미기 저장 성공:', response);
      })
      .catch((error) => {
        console.error('꾸미기 저장 실패:', error);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
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
            {(itemsByFloor[currentFloor] || []).map((item) => (
              <GridItem
                key={item.itemId}
                item={item}
                gridSize={gridSize}
                setSelectedItem={setSelectedItem}
                onClick={handleClick}
              />
            ))}
          </GridBackgroundStyled>
        </ZoomableGridWrapperStyled>
        <ButtonWrapperStyled>
          <SaveButtonStyled onClick={handleCanvasSave}>저장</SaveButtonStyled>
          <CancelButtonStyled>취소</CancelButtonStyled>
        </ButtonWrapperStyled>
      </GridWrapperStyled>
    </div>
  );
};

const GridItem = ({ item, gridSize, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'GRID_ITEM',
    item: { itemId: item.itemId, type: 'GRID_ITEM' },
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
      onClick={() => onClick(item)}
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
