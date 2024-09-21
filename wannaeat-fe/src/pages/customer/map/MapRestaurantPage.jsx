import MapContainer from '../../../component/customer/map/Map.jsx';
import useModalStore from '../../../stores/common/modal/useModalStore.js';
import { MapBox } from './MapRestaurantPage';

const MapRestaurantPage = () => {
  const { open, setModalType } = useModalStore();
  const handleFilterModalButtonClick = () => {
    setModalType('sheet');
    open();
  };

  return (
    <MapBox>
      <button onClick={handleFilterModalButtonClick}>필터링 모달 띄우기</button>
      <MapContainer />
    </MapBox>
  );
};

export default MapRestaurantPage;
