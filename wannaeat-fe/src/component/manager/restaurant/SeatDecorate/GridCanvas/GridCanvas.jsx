import { useState, useEffect, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { authClientInstance } from 'utils/http-client.js';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { paletteItems } from '../ItemPalette/ItemPalette';
import { useNavigate } from 'react-router-dom';
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
import useAlert from '../../../../../utils/alert';

const restaurantId = window.localStorage.getItem('restaurantId');

const useStore = create((set, get) => ({
  itemsByFloor: {},
  gridStatusByFloor: {},

  addItem: (floor, item) => {
    const isTableItem =
      item.itemType === 'SQUARE' || item.itemType === 'ROUNDED';

    set((state) => ({
      itemsByFloor: {
        ...state.itemsByFloor,
        [floor]: [
          ...(state.itemsByFloor[floor] || []),
          {
            ...item,
            itemType: item.itemType,
            ...(isTableItem && {
              tableId: item.tableId || '',
              assignedSeats: item.assignedSeats || 0,
            }),
          },
        ],
      },
      gridStatusByFloor: {
        ...state.gridStatusByFloor,
        [floor]: {
          ...state.gridStatusByFloor[floor],
          [`${item.x},${item.y}`]: item.itemId,
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

const GridCanvas = ({ currentFloor, gridColumns, gridRows, floorCnt }) => {
  const showAlert = useAlert();
  const [gridSize, setGridSize] = useState(50);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [selectedTableId, setSelectedTableId] = useState('');
  const [selectedTableAssignedSeats, setSelectedTableAssignedSeats] =
    useState(0);

  const navigate = useNavigate();

  const {
    itemsByFloor,
    addItem,
    setItemsByFloor,
    updateItem,
    updateItemPosition,
    // clearItemsByFloor,
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
    console.log('매꾸 restaurantId: ', restaurantId);
    authClientInstance
      .get(`/api/public/restaurants/${restaurantId}/structure`)
      .then((response) => {
        const { tableDetailResponseDtos = [], elementDetailResponseDtos = [] } =
          response.data.data;

        tableDetailResponseDtos.forEach((table) => {
          addItem(currentFloor, {
            itemId: table.itemId,
            itemType: table.itemType.toUpperCase(),
            x: table.x,
            y: table.y,
            tableId: table.tableId,
            assignedSeats: table.assignedSeats,
          });
        });

        elementDetailResponseDtos.forEach((element) => {
          addItem(currentFloor, {
            itemId: element.itemId,
            itemType: element.itemType.toUpperCase(),
            x: element.x,
            y: element.y,
          });
        });

        console.log('tableDetailResponseDtos: ', tableDetailResponseDtos);
        console.log('elementDetailResponseDtos: ', elementDetailResponseDtos);

        setItemsByFloor(currentFloor, itemsByFloor[currentFloor]);
        console.error('성공: ', response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          return;
        } else {
          console.error('꾸미기 정보 요청 오류:', error);
        }
        return;
      });
  }, [setItemsByFloor, currentFloor]);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    setModalType('setting');
    setTitle(`테이블 정보 설정`);

    setHandleButtonClick(handleSubmit);
    setChildren(
      <GridCanvasModalStyled>
        <label>
          테이블 번호:
          <input
            id="tableId"
            type="number"
            placeholder="테이블 번호 입력"
            value={selectedTableId}
            onChange={(e) => setSelectedTableId(e.target.value)}
          />
        </label>
        <label>
          최대 수용 인원:
          <input
            id="assignedSeats"
            type="number"
            min="0"
            placeholder="최대 수용 인원 입력"
            value={selectedTableAssignedSeats}
            onChange={(e) =>
              setSelectedTableAssignedSeats(Number(e.target.value))
            }
          />
        </label>
      </GridCanvasModalStyled>
    );
    open();
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem) {
      setChildren(
        <GridCanvasModalStyled>
          <label>
            테이블 번호:
            <input
              id="tableId"
              type="number"
              placeholder="테이블 번호 입력"
              value={selectedTableId}
              onChange={(e) => setSelectedTableId(e.target.value)}
            />
          </label>
          <label>
            최대 수용 인원:
            <input
              id="assignedSeats"
              type="number"
              min="0"
              placeholder="최대 수용 인원 입력"
              value={selectedTableAssignedSeats}
              onChange={(e) =>
                setSelectedTableAssignedSeats(parseInt(e.target.value, 10))
              }
            />
          </label>
        </GridCanvasModalStyled>
      );
    }
  }, [selectedTableId, selectedTableAssignedSeats]);

  useEffect(() => {
    if (selectedItem) {
      setSelectedTableId(selectedItem.tableId || '');
      setSelectedTableAssignedSeats(selectedItem.assignedSeats || 0);
    }
  }, [selectedItem]);

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
      const tableId = document.querySelector('#tableId').value;
      const assignedSeats = document.querySelector('#assignedSeats').value;

      updateItem(currentFloor, selectedItem.itemId, {
        tableId,
        assignedSeats: parseInt(assignedSeats, 10),
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
        showAlert('중복 방지!!!!!!!!!!!!!!');
        return;
      }

      if (item.type === 'PALETTE_ITEM') {
        const selectedItem = paletteItems.find(
          (paletteItem) => paletteItem.itemId === item.itemId
        );

        if (selectedItem) {
          const newItemId = uuid();
          addItem(currentFloor, {
            itemId: newItemId,
            itemType: item.itemType,
            x,
            y,
            icon: selectedItem.icon,
          });

          if (
            selectedItem.itemType === 'SQUARE' ||
            selectedItem.itemType === 'ROUNDED'
          ) {
            setSelectedItem({
              ...selectedItem,
              itemId: newItemId,
              x,
              y,
            });
          }
        }
      } else if (item.type === 'GRID_ITEM') {
        updateItemPosition(currentFloor, item.itemId, x, y);
      }

      setIsDragging(false);
    },
  });

  const handleClick = (item) => {
    setSelectedItem(item);
    if (item.itemType === 'SQUARE' || item.itemType === 'ROUNDED') {
      setSelectedTableId(item.tableId || '');
      setSelectedTableAssignedSeats(item.assignedSeats || 0);

      setModalType('setting');
      setTitle(`${item.itemType} 설정`);

      setHandleButtonClick(handleSubmit);
      setChildren(
        <GridCanvasModalStyled>
          <label>
            테이블 번호:
            <input
              id="tableId"
              type="number"
              placeholder="테이블 번호 입력"
              value={selectedTableId}
              onChange={(e) => setSelectedTableId(e.target.value)}
            />
          </label>
          <label>
            최대 수용 인원:
            <input
              id="assignedSeats"
              type="number"
              min="0"
              placeholder="최대 수용 인원 입력"
              value={selectedTableAssignedSeats}
              onChange={(e) =>
                setSelectedTableAssignedSeats(parseInt(Number(e.target.value)))
              }
            />
          </label>
        </GridCanvasModalStyled>
      );
      open();
    }
  };

  const handleGotoMain = () => {
    navigate('/manager');
  };

  const handleCanvasSave = () => {
    const size = (() => {
      switch (gridColumns) {
        case 5:
          return 'SMALL';
        case 10:
          return 'MEDIUM';
        case 15:
          return 'LARGE';
      }
    })();

    const tableRegisterRequestDtos = [];
    const elementRegisterRequestDtos = [];

    Object.keys(itemsByFloor).forEach((floor) => {
      itemsByFloor[floor].forEach((item) => {
        if (item.itemType === 'SQUARE' || item.itemType === 'ROUNDED') {
          tableRegisterRequestDtos.push({
            itemId: item.itemId,
            tableId: item.tableId,
            assignedSeats: item.assignedSeats,
            x: item.x,
            y: item.y,
            itemType: item.itemType,
            floor: parseInt(floor, 10),
          });
        } else {
          elementRegisterRequestDtos.push({
            itemId: item.itemId,
            itemType: item.itemType,
            x: item.x,
            y: item.y,
            floor: parseInt(floor, 10),
          });
        }
      });
    });

    authClientInstance
      .post(
        `/api/restaurants/structure`,
        {
          size,
          floorCnt,
          tableRegisterRequestDtos,
          elementRegisterRequestDtos,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          window.alert(
            '매장 구조 저장에 성공했습니다. 메인 페이지로 이동합니다.'
          );
          navigate('/manager');
        }
      })
      .catch((error) => {
        window.alert('꾸미기 저장 실패');
        console.log('꾸미기 저장 실패: ', error);
        return;
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

            {Array.isArray(itemsByFloor[currentFloor])
              ? itemsByFloor[currentFloor].map((item) => (
                  <GridItem
                    key={item.itemId}
                    item={item}
                    gridSize={gridSize}
                    setSelectedItem={setSelectedItem}
                    onClick={handleClick}
                  />
                ))
              : null}
          </GridBackgroundStyled>
        </ZoomableGridWrapperStyled>
        <ButtonWrapperStyled>
          <SaveButtonStyled onClick={handleCanvasSave}>저장</SaveButtonStyled>
          <CancelButtonStyled onClick={handleGotoMain}>취소</CancelButtonStyled>
        </ButtonWrapperStyled>
      </GridWrapperStyled>
    </div>
  );
};

const renderIcon = (itemType) => {
  const paletteItem = paletteItems.find((item) => item.itemType === itemType);

  if (!paletteItem || !paletteItem.icon) {
    return;
  }

  const IconComponent = paletteItem.icon;
  return (
    <IconComponent
      className="grid-item-icon"
      style={{ width: '100%', height: '100%' }}
    />
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
      onClick={() => onClick(item)}
    >
      {renderIcon(item.itemType)}
    </GridItemStyled>
  );
};

export default GridCanvas;
