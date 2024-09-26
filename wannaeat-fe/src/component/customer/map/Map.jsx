import React, { useEffect, useState } from 'react';
import { MapView, FindRestaurantButton } from './Map';
import PinkMarker from '../../../assets/icons/map/pink-maker.png';
import ArrowWhite from '../../../assets/icons/map/arrow-white.png';
import VertexWhite from '../../../assets/icons/map/vertex-white.png';
import useMapStore from '../../../stores/map/useMapStore';
import { useNavigate } from 'react-router-dom';

const MapContainer = () => {
  const { lat, lon, setLat, setLon, isInitialLoad, setIsInitialLoad } =
    useMapStore();
  const [centerLatLng, setCenterLatLng] = useState({ lat: lat, lon: lon });
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const navigate = useNavigate();

  // 현재 위치 근처의 레스토랑 찾는 함수
  const handleRestaurantFind = () => {
    setLat(centerLatLng.lat);
    setLon(centerLatLng.lon);
    setIsButtonVisible(false);
  };

  const handleMarkerClick = (id) => {
    console.log('click', id);
    navigate(`/customer/reservation/restaurant-detail/${id}`);
  };

  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 처음에 사용자의 현재 위치로 지도를 설정
    if (isInitialLoad && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;
        setLat(currentLat);
        setLon(currentLon);
        setCenterLatLng({ lat: currentLat, lon: currentLon });
        map.setCenter(new kakao.maps.LatLng(currentLat, currentLon));
        setIsInitialLoad(false);
      });
    }

    // 지도 드래그나 확대/축소로 중심 좌표가 변경될 때 이벤트 등록
    kakao.maps.event.addListener(map, 'center_changed', function () {
      const latlng = map.getCenter();
      setCenterLatLng({ lat: latlng.getLat(), lon: latlng.getLng() });
      setIsButtonVisible(true);
    });

    var positions = [
      {
        id: 1,
        title: '지역1',
        latlng: new kakao.maps.LatLng(lat + 0.000004, lon + 0.00001),
      },
      {
        id: 2,
        title: '지역2',
        latlng: new kakao.maps.LatLng(lat + 0.000235, lon + 0.00119),
      },
      {
        id: 3,
        title: '지역3',
        latlng: new kakao.maps.LatLng(lat + 0.000178, lon - 0.000727),
      },
      {
        id: 4,
        title: '지역4',
        latlng: new kakao.maps.LatLng(lat + 0.000692, lon + 0.000071),
      },
    ];

    var imageSrc = PinkMarker;

    positions.map((position) => {
      var imageSize = new kakao.maps.Size(35, 35),
        imageOption = { offset: new kakao.maps.Point(18, 50) }; // 마커이미지 옵션

      var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = position.latlng; // 마커가 표시될 위치

      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, 'click', () =>
        handleMarkerClick(position.id)
      );

      var content = `
       <div class="customoverlay">
         <span class="title">${position.title}</span>
       </div>
     `;
      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: markerPosition,
        content: content,
        yAnchor: 1,
      });

      const styleTag = document.createElement('style');
      styleTag.textContent = `
       .customoverlay {position:relative;bottom:60px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
       .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
       .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(${ArrowWhite}) no-repeat right 14px center;}
       .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
       .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url(${VertexWhite})}
     `;
      document.head.appendChild(styleTag);
    });
  }, [lat, lon]); // lat, lon이 변경될 때만 다시 실행됨

  return (
    <>
      {isButtonVisible && (
        <FindRestaurantButton onClick={handleRestaurantFind}>
          중심 위치로 주변 식당 찾기
        </FindRestaurantButton>
      )}
      <MapView id="map"></MapView>
    </>
  );
};

export default MapContainer;
