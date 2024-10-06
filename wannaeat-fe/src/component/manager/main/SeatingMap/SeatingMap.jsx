import { useState, useEffect } from 'react';
import {
  SeatingMapStyled,
  Items,
  MapStyled,
  ItemWrapperStyled,
  LabelStyled,
} from './SeatingMap.js';
import { authClientInstance } from 'utils/http-client.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore.js';

import FloorSelector from 'component/manager/restaurant/SeatDecorate/FloorSelector/FloorSelector.jsx';
import { ReactComponent as LoadingIcon } from 'assets/icons/common/loading.svg';

const SeatingMap = () => {
  const [floorData, setFloorData] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [floorCnt, setFloorCnt] = useState(1);

  const [currentFloor, setCurrentFloor] = useState(1);

  const { restaurantId } = useMyRestaurantStore();

  useEffect(() => {
    console.log('restaurantId: ' + restaurantId);
    if (restaurantId > 0) {
      fetchFloorData(restaurantId);
    }
  }, [restaurantId]);

  //   const testData = {
  //     floorCnt: 3,
  //     tableDetailResponseDtos: [
  //       {
  //         itemId: 'table-uuid-1',
  //         itemType: 'SQUARE',
  //         x: 120.567,
  //         y: 250.0,
  //         floor: 3,
  //         tableId: 101,
  //         assignedSeats: 4,
  //       },
  //       {
  //         itemId: 'table-uuid-2',
  //         itemType: 'ROUNDED',
  //         x: 320.7,
  //         y: 150.5,
  //         floor: 1,
  //         tableId: 102,
  //         assignedSeats: 6,
  //       },
  //     ],
  //     elementDetailResponseDtos: [
  //       {
  //         itemId: 'element-uuid-1',
  //         itemType: 'RESTROOM',
  //         x: 192,
  //         y: 0,
  //         floor: 1,
  //       },
  //       {
  //         itemId: 'element-uuid-2',
  //         itemType: 'ENTRANCE',
  //         x: 192,
  //         y: 432,
  //         floor: 2,
  //       },
  //       {
  //         itemId: 'element-uuid-3',
  //         itemType: 'COUNTER',
  //         x: 240,
  //         y: 432,
  //         floor: 1,
  //       },
  //     ],
  //   };

  //   const floors = Array.from({ length: testData.floorCnt }, (_, i) => i + 1);

  //   useEffect(() => {
  //     mergeFloorData(testData);
  //     setLoading(false);
  //   }, []);

  const fetchFloorData = async (restaurantId) => {
    console.log('restaurantId: ' + restaurantId + ' 으로 get요청 보냅니다!');
    try {
      const response = await authClientInstance.get(
        `/api/public/restaurants/${restaurantId}/structure`
      );
      const { data } = response;
      console.log('받아온 데이터!: ', data);
      setFloorCnt(data.floorCnt);
      setOriginalData(data);
      mergeFloorData(data, currentFloor);
      setLoading(false);
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

  const renderIcon = (itemType) => {
    const item = Items.find((item) => item.itemType === itemType);
    if (item && item.icon) {
      const IconComponent = item.icon;
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
          <ItemWrapperStyled key={item.itemId} x={item.x} y={item.y}>
            {renderIcon(item.itemType)}
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
