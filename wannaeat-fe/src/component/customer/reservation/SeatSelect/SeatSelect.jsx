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
} from './SeatSelect.js';
import { authClientInstance } from 'utils/http-client.js';
import { useLocation } from 'react-router-dom';

import FloorSelector from 'component/manager/restaurant/SeatDecorate/FloorSelector/FloorSelector.jsx';
import { ReactComponent as LoadingIcon } from 'assets/icons/common/loading.svg';

import { ReactComponent as SquareTableDisabledIcon } from 'assets/icons/manager/restaurant/table-square-disabled.svg';
import { ReactComponent as RoundTableDisabledIcon } from 'assets/icons/manager/restaurant/table-rounded-disabled.svg';

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

  const { restaurantId } = useRestaurantStore();

  const {
    open,
    setTitle,
    setAlertText,
    setCancelText,
    setIsOneButton,
    setModalType,
    setChildren,
  } = useModalStore();

  const reservedTable = tableData;

  useEffect(() => {
    console.log('restaurantId: ' + restaurantId);
    if (restaurantId > 0) {
      fetchFloorData(restaurantId);
    }
  }, [restaurantId]);

  const fetchFloorData = async (restaurantId) => {
    console.log('restaurantId: ' + restaurantId + ' 으로 get요청 보냅니다!');
    try {
      const response = await authClientInstance.get(
        `/api/public/restaurants/${restaurantId}/structure`
      );
      const { data } = response.data;

      console.log('data: ', data);

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
    console.log('currentFloor: ', currentFloor);
    setCurrentFloor(selectedFloor);
    if (originalData) {
      mergeFloorData(originalData, selectedFloor);
    }
  };

  const handleIconClick = (item) => {
    const isReserved = reservedTable.some(
      (reserved) => reserved.tableId === item.tableId
    );

    if (item.itemType === 'square' || item.itemType === 'rounded') {
      console.log(`${item.tableId}번 테이블을 선택하였습니다.`);
      setChildren(
        <TableInfoWrapperStyled>
          <SeatLabelStyled>좌석 수 :</SeatLabelStyled>
          <SeatValueStyled>{item.assignedSeats}</SeatValueStyled>
        </TableInfoWrapperStyled>
      );
      if (!isReserved) {
        setModalType('setting');
        setTitle(`${item.tableId} 번 테이블`);
        setCancelText('닫기');
        setIsOneButton(true);
        open();
      } else {
        setTitle('예약 불가');
        setAlertText(`${item.tableId}번 테이블은 예약이 불가능합니다.`);
        setCancelText('닫기');
        setIsOneButton(true);

        open();
      }
    }
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
