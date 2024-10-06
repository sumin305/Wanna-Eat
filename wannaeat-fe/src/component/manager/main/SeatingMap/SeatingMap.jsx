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
  const [loading, setLoading] = useState(true);

  const [currentFloor, setCurrentFloor] = useState(1);

  const { restaurantId } = useMyRestaurantStore();

  useEffect(() => {
    if (restaurantId) {
      fetchFloorData();
    }
  }, [restaurantId]);

  const testData = {
    floorCnt: 3,
    itemsByFloor: [
      {
        itemId: 'd6c927a6-756b-422f-81a9-bfe8019cf404',
        itemType: 'RESTROOM',
        label: '화장실',
        x: 192,
        y: 0,
      },
      {
        itemId: '280edf56-3a4e-488b-aca2-522f22de893b',
        itemType: 'ENTRANCE',
        label: '출입구',
        x: 192,
        y: 432,
      },
      {
        itemId: 'f070056c-0678-43fd-b55e-7fbf80119cc8',
        itemType: 'COUNTER',
        label: '계산대',
        x: 240,
        y: 432,
      },
      {
        itemId: 'fb47448c-ed9c-4fbc-b6bd-6eea38461f1e',
        itemType: 'SQUARE',
        label: '사각 테이블',
        tableId: '1',
        assignedSeats: 2,
        x: 96,
        y: 240,
      },
      {
        itemId: '69c7f645-66a5-4dc0-9395-be91eca5350a',
        itemType: 'ROUNDED',
        label: '원형 테이블',
        tableId: '2',
        assignedSeats: 4,
        x: 336,
        y: 240,
      },
    ],
  };

  const floors = Array.from({ length: testData.floorCnt }, (_, i) => i + 1);

  useEffect(() => {
    setFloorData(testData.itemsByFloor);
    setLoading(false);
  }, []);

  const fetchFloorData = async (restaurantId) => {
    try {
      const response = await authClientInstance.get(
        `/api/public/restaurants/${restaurantId}/structure`
      );
      setFloorData(response.data.itemsByFloor);
      setLoading(false);
    } catch (error) {
      console.error('배치 정보 요청 오류:', error);
    }
  };

  const handleFloorChange = (selectedFloor) => {
    setCurrentFloor(selectedFloor);
    setFloorData(testData.itemsByFloor[selectedFloor]);
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
        floors={floors}
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
