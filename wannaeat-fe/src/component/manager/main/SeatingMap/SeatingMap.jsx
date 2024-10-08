import { useState, useEffect } from 'react';
import {
  SeatingMapStyled,
  Items,
  MapStyled,
  ItemWrapperStyled,
  LabelStyled,
} from './SeatingMap.js';
import { authClientInstance } from 'utils/http-client.js';

import FloorSelector from 'component/manager/restaurant/SeatDecorate/FloorSelector/FloorSelector.jsx';
import { ReactComponent as LoadingIcon } from 'assets/icons/common/loading.svg';

import { ReactComponent as SquareTablePointedIcon } from 'assets/icons/manager/restaurant/table-square-pointed.svg';
import { ReactComponent as RoundTablePointedIcon } from 'assets/icons/manager/restaurant/table-rounded-pointed.svg';

const SeatingMap = ({ OccupiedList, on404Error }) => {
  const [floorData, setFloorData] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [floorCnt, setFloorCnt] = useState(1);

  const [currentFloor, setCurrentFloor] = useState(1);

  const [IconWidth, setIconWidth] = useState(100);
  const [IconHeight, setIconHeight] = useState(100);

  const restaurantId = window.localStorage.getItem('restaurantId');

  const reservedTable = OccupiedList;

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
      if (error.response && error.response.status === 404) {
        on404Error();
      }

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

  const renderIcon = (itemType, tableId, reservedTable) => {
    const isOccupied = reservedTable.some(
      (reserved) => reserved.tableId === tableId
    );

    const item = Items.find((item) => item.itemType === itemType);

    if (item) {
      const IconComponent =
        isOccupied && itemType === 'square'
          ? SquareTablePointedIcon
          : isOccupied && itemType === 'rounded'
            ? RoundTablePointedIcon
            : item.icon;

      return <IconComponent />;
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
    <SeatingMapStyled>
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
    </SeatingMapStyled>
  );
};

export default SeatingMap;
