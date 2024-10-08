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

import { ReactComponent as SquareTableDisabledIcon } from 'assets/icons/manager/restaurant/table-square-disabled.svg';
import { ReactComponent as RoundTableDisabledIcon } from 'assets/icons/manager/restaurant/table-rounded-disabled.svg';

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

  const { tableList, setTableList } = useReservationStore();
  const { restaurantId } = useRestaurantStore();

  const {
    open,
    close,
    setAlertText,
    setModalType,
    setConfirmText,
    setHandleButtonClick,
  } = useModalStore();

  const reservedTable = tableData;

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
    const isReserved = reservedTable.some(
      (reserved) => reserved.tableId === item.tableId
    );

    setHandleButtonClick(() => handleAddTable(item.tableId));

    if (
      !isReserved &&
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

  // useEffect(() => {
  //   console.log('현재 담긴 테이블: ', tableList);
  // }, [tableList]);

  const handleAddTable = (tableId) => {
    if (Array.isArray(tableList) && !tableList.includes(tableId)) {
      const newItems = [...tableList, tableId];
      setTableList(newItems);
    } else {
      window.alert('이미 선택된 테이블입니다.');
    }

    close();
  };

  const renderIcon = (itemType, tableId, reservedTable) => {
    const isOccupied = reservedTable.some(
      (reserved) => reserved.tableId === tableId
    );

    const item = Items.find((item) => item.itemType === itemType);

    if (item) {
      const IconComponent =
        isOccupied && itemType === 'square'
          ? SquareTableDisabledIcon
          : isOccupied && itemType === 'rounded'
            ? RoundTableDisabledIcon
            : item.icon;

      const iconStyle = isOccupied
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
            {renderIcon(item.itemType, item.tableId, reservedTable)}
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
