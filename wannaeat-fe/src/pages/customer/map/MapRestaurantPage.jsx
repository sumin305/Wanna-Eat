import MapContainer from '../../../component/customer/map/Map.jsx';
import useModalStore from '../../../stores/common/useModalStore.js';
import { MapBox } from './MapRestaurantPage';
import MapFilterModalBox from '../../../component/customer/map/MapFilterModalBox.jsx';

const MapRestaurantPage = () => {
  const { open, setModalType, setTitle, setConfirmText, setChildren } =
    useModalStore();
  const handleFilterModalButtonClick = () => {
    setModalType('sheet');
    setTitle('식당 필터링');
    setConfirmText('필터링');
    setChildren(<MapFilterModalBox />);
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
