import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SeatingMapStyled,
  Items,
  MapStyled,
  ItemWrapperStyled,
  TableInfoWrapperStyled,
  SeatLabelStyled,
  SeatValueStyled,
  ModalContainerStyled,
} from './SeatingMap.js';
import { authClientInstance } from 'utils/http-client.js';

import FloorSelector from 'component/manager/restaurant/SeatDecorate/FloorSelector/FloorSelector.jsx';
import { ReactComponent as LoadingIcon } from 'assets/icons/common/loading.svg';

import { ReactComponent as SquareTablePointedIcon } from 'assets/icons/manager/restaurant/table-square.svg';
import { ReactComponent as RoundTablePointedIcon } from 'assets/icons/manager/restaurant/table-rounded.svg';

import useModalStore from 'stores/common/useModalStore.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore.js';

const SeatingMap = ({ OccupiedList, on404Error }) => {
  const [floorData, setFloorData] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [floorCnt, setFloorCnt] = useState(1);

  const [currentFloor, setCurrentFloor] = useState(1);

  const [IconWidth, setIconWidth] = useState(100);
  const [IconHeight, setIconHeight] = useState(100);

  const [reservationId, setReservationId] = useState(1);
  const [reservationStartTime, setReservationStartTime] = useState(null);
  const [reservationEndTime, setReservationEndTime] = useState(null);

  const [reservationInfo, setReservationInfo] = useState(null);

  const navigate = useNavigate();

  const restaurantId = window.localStorage.getItem('restaurantId');

  const reservedTable = OccupiedList;

  useEffect(() => {
    if (restaurantId > 0) {
      fetchFloorData(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (reservationInfo) {
      setReservationId(reservationInfo.reservationId);
      setReservationStartTime(reservationInfo.reservationStartTime);
      setReservationEndTime(reservationInfo.reservationEndTime);

      setAlertText(
        <ModalContainerStyled>
          <TableInfoWrapperStyled>
            <SeatLabelStyled>
              {reservationInfo.tableId} 번 테이블
            </SeatLabelStyled>
          </TableInfoWrapperStyled>
          <TableInfoWrapperStyled>
            <SeatLabelStyled>예약 시간 :</SeatLabelStyled>
            <SeatValueStyled>
              {reservationInfo.reservationEndTime} ~{' '}
              {reservationInfo.reservationStartTime}
            </SeatValueStyled>
          </TableInfoWrapperStyled>
        </ModalContainerStyled>
      );
      setModalType('alert');
      setConfirmText('예약 상세');
      open();
    }
  }, [reservationInfo]);

  const { setRestaurantSize, setRestaurantFloorCnt } = useMyRestaurantStore();

  const fetchFloorData = async (restaurantId) => {
    try {
      const response = await authClientInstance.get(
        `/api/public/restaurants/${restaurantId}/structure`
      );
      const { data } = response.data;
      console.log(data);

      setRestaurantSize(data.size);
      setRestaurantFloorCnt(data.floorCnt);
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
    setCurrentFloor(selectedFloor);
    if (originalData) {
      mergeFloorData(originalData, selectedFloor);
    }
  };

  const {
    open,
    close,
    setAlertText,
    setModalType,
    setConfirmText,
    setHandleButtonClick,
  } = useModalStore();

  const handleGotoReservationDetail = () => {
    close();
    setHandleButtonClick(close());
    navigate(`/manager/reservation/reservation-detail/${reservationId}`);
  };

  const handleIconClick = (item) => {
    const isOccupied = reservedTable.some(
      (table) => table.tableId === item.tableId
    );

    if (!isOccupied) {
      return;
    }

    const reservationDetails = reservedTable.find(
      (reserved) => reserved.tableId === item.tableId
    );

    setReservationInfo(reservationDetails);

    if (reservationDetails) {
      setReservationId(reservationDetails.reservationId);
      setReservationStartTime(reservationDetails.reservationStartTime);
      setReservationEndTime(reservationDetails.reservationEndTime);
    }

    setHandleButtonClick(() => handleGotoReservationDetail(item));

    if (
      isOccupied &&
      (item.itemType === 'square' || item.itemType === 'rounded')
    ) {
      setAlertText(
        <ModalContainerStyled>
          <TableInfoWrapperStyled>
            <SeatLabelStyled>{item.tableId} 번 테이블</SeatLabelStyled>
          </TableInfoWrapperStyled>
          <TableInfoWrapperStyled>
            <SeatLabelStyled>예약 시간 :</SeatLabelStyled>
            <SeatValueStyled>
              {reservationEndTime} ~ {reservationStartTime}
            </SeatValueStyled>
          </TableInfoWrapperStyled>
          {/* <TableInfoWrapperStyled>
            <SeatLabelStyled>좌석 수 :</SeatLabelStyled>
            <SeatValueStyled>{item.assignedSeats}</SeatValueStyled>
          </TableInfoWrapperStyled> */}
        </ModalContainerStyled>
      );
      setModalType('alert');
      setConfirmText('예약 상세');
      open();
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

      const iconStyle = !isOccupied
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
            onClick={() => {
              handleIconClick(item);
            }}
          >
            {renderIcon(item.itemType, item.tableId, reservedTable)}
          </ItemWrapperStyled>
        ))}
      </MapStyled>
    </SeatingMapStyled>
  );
};

export default SeatingMap;
