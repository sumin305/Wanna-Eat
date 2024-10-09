import { useState, useEffect } from 'react';

import {
  SeatSelectStyled,
  Items,
  MapStyled,
  ItemWrapperStyled,
  LabelStyled,
  TableInfoWrapperStyled,
  SeatLabelStyled,
  SeatValueStyled,
  ModalContainerStyled,
} from './SeatSelect.js';
import { authClientInstance } from 'utils/http-client.js';
import { useLocation } from 'react-router-dom';

import FloorSelector from 'component/manager/restaurant/SeatDecorate/FloorSelector/FloorSelector.jsx';
import { ReactComponent as LoadingIcon } from 'assets/icons/common/loading.svg';

import { ReactComponent as SquareTableIcon } from 'assets/icons/manager/restaurant/table-square-secondary.svg';
import { ReactComponent as RoundTableIcon } from 'assets/icons/manager/restaurant/table-rounded-secondary.svg';
import { ReactComponent as SelectedSquareTableIcon } from 'assets/icons/manager/restaurant/table-square.svg';
import { ReactComponent as SelectedRoundTableIcon } from 'assets/icons/manager/restaurant/table-rounded.svg';

import useReservationStore from 'stores/customer/useReservationStore.js';
import useRestaurantStore from 'stores/customer/useRestaurantStore.js';
import useModalStore from 'stores/common/useModalStore.js';

const SeatSelect = () => {
  const location = useLocation();
  const { tableData } = location.state || {};
  const [floorData, setFloorData] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [floorCnt, setFloorCnt] = useState(1);

  const [currentFloor, setCurrentFloor] = useState(1);

  const [IconWidth, setIconWidth] = useState(100);
  const [IconHeight, setIconHeight] = useState(100);

  const { tableList, setTableList, maxCapacity, setMaxCapacity, memberCount } =
    useReservationStore();
  const { restaurantId } = useRestaurantStore();

  const {
    open,
    close,
    setAlertText,
    setModalType,
    setConfirmText,
    setHandleButtonClick,
  } = useModalStore();

  const canReserveTable = tableData;

  useEffect(() => {
    if (restaurantId > 0) {
      fetchFloorData(restaurantId);
    }
  }, [restaurantId]);

  const fetchFloorData = async (restaurantId) => {
    try {
      const response = await authClientInstance.get(
        `/api/public/restaurants/${restaurantId}/structure`
      );
      const { data } = response.data;

      setFloorCnt(data.floorCnt);
      setOriginalData(data);
      mergeFloorData(data, currentFloor);
      setLoading(false);

      let tempValue;

      switch (data.size) {
        case 'SMALL':
          tempValue = 20;
          break;
        case 'MEDIUM':
          tempValue = 10;
          break;
        case 'LARGE':
          tempValue = 6.5;
          break;
        default:
          tempValue = 10;
          break;
      }

      setIconWidth(tempValue);
      setIconHeight(tempValue);
    } catch (error) {
      console.error('배치 정보 요청 오류:', error);
      setLoading(false);
      return;
    }
  };

  const mergeFloorData = (data, floor) => {
    const tableData = Array.isArray(data.tableDetailResponseDtos)
      ? data.tableDetailResponseDtos
      : [];
    const elementData = Array.isArray(data.elementDetailResponseDtos)
      ? data.elementDetailResponseDtos
      : [];

    const mergedData = [...tableData, ...elementData];
    const filteredData = mergedData.filter((item) => item.floor === floor);

    setFloorData(filteredData);
  };

  const handleFloorChange = (selectedFloor) => {
    setCurrentFloor(selectedFloor);
    if (originalData) {
      mergeFloorData(originalData, selectedFloor);
    }
  };

  const handleIconClick = (item) => {
    const canReserve = canReserveTable.some((id) => id === item.tableId);
    const isSelected = tableList.includes(item.tableId);

    if (!canReserve) {
      return;
    }

    if (isSelected) {
      const newArray = tableList.filter((table) => table !== item.tableId);
      setTableList(newArray);

      const result = maxCapacity - item.assignedSeats;
      setMaxCapacity(result);
      return;
    }

    setHandleButtonClick(() => handleAddTable(item));

    if (
      canReserve &&
      (item.itemType === 'square' || item.itemType === 'rounded')
    ) {
      setAlertText(
        <ModalContainerStyled>
          <TableInfoWrapperStyled>
            <SeatLabelStyled>{item.tableId} 번 테이블</SeatLabelStyled>
          </TableInfoWrapperStyled>
          <TableInfoWrapperStyled>
            <SeatLabelStyled>좌석 수 :</SeatLabelStyled>
            <SeatValueStyled>{item.assignedSeats}</SeatValueStyled>
          </TableInfoWrapperStyled>
        </ModalContainerStyled>
      );
      setModalType('alert');
      setConfirmText('선택');
      open();
    }
  };

  const handleAddTable = (item) => {
    if (maxCapacity >= memberCount) {
      window.alert('이미 충분한 수의 테이블이 선택되었습니다.');
      return;
    }
    if (Array.isArray(tableList) && !tableList.includes(item.tableId)) {
      const newItems = [...tableList, item.tableId];
      setTableList(newItems);

      const result = maxCapacity + item.assignedSeats;
      setMaxCapacity(result);

      window.alert(`${item.tableId} 번 테이블이 추가되었습니다.`);
    } else {
      window.alert('이미 선택된 테이블입니다.');
    }

    close();
    setHandleButtonClick(close());
  };

  const renderIcon = (itemType, tableId, canReserveTable) => {
    const isAvailable = canReserveTable.some((value) => value === tableId);
    const isSelected = tableList ? tableList.includes(tableId) : [];

    const item = Items.find((item) => item.itemType === itemType);

    if (item) {
      let IconComponent =
        isAvailable && isSelected && itemType === 'square'
          ? SelectedSquareTableIcon
          : isAvailable && isSelected && itemType === 'rounded'
            ? SelectedRoundTableIcon
            : isAvailable && itemType === 'square'
              ? SquareTableIcon
              : isAvailable && itemType === 'rounded'
                ? RoundTableIcon
                : item.icon;

      const iconStyle = !isAvailable
        ? { pointerEvents: 'none' }
        : itemType === 'square' || itemType === 'rounded'
          ? { cursor: 'pointer' }
          : {};

      return <IconComponent style={iconStyle} />;
    }

    return null;
  };

  if (loading) {
    return (
      <div>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <SeatSelectStyled>
      <FloorSelector
        floors={Array.from({ length: floorCnt }, (_, i) => i + 1)}
        currentFloor={currentFloor}
        onFloorChange={handleFloorChange}
      />

      <MapStyled>
        {floorData.map((item) => (
          <ItemWrapperStyled
            key={item.itemId}
            x={item.x}
            y={item.y}
            svgWidth={IconWidth}
            svgHeight={IconHeight}
            onClick={() => {
              handleIconClick(item);
            }}
          >
            {renderIcon(item.itemType, item.tableId, canReserveTable)}
            {item.itemType === 'SQUARE' || item.itemType === 'ROUNDED' ? (
              <LabelStyled>{item.tableId}번</LabelStyled>
            ) : (
              ''
            )}
          </ItemWrapperStyled>
        ))}
      </MapStyled>
    </SeatSelectStyled>
  );
};

export default SeatSelect;
