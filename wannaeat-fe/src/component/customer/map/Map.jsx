import React, { useEffect, useState } from 'react';
import { MapView } from './Map';
import PinkMarker from '../../../assets/icons/map/pink-maker.png';
import ArrowWhite from '../../../assets/icons/map/arrow-white.png';
import VertexWhite from '../../../assets/icons/map/vertex-white.png';
import useMapStore from '../../../stores/map/useMapStore';
import { useNavigate } from 'react-router-dom';

const MapContainer = () => {
  const { lat, lon, setLat, setLon } = useMapStore();
  const [centerLatLng, setCenterLatLng] = useState({ lat: lat, lon: lon });
  const navigate = useNavigate();

  // 현재 위치 근처의 레스토랑 찾는 함수
  const handleRestaurantFind = () => {
    console.log(lat);
    console.log(lon);
    setLat(centerLatLng.lat);
    setLon(centerLatLng.lon);
    alert('현재위치 저장');
  };

  useEffect(() => {
    const handleMarkerClick = (e) => {
      console.log('click');
      navigate('/customer/reservation/time-select');
    };

    const { kakao } = window;
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // // 현재 위치에 해당하는 위도, 경도값으로 변경
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     setLat(position.coords.latitude);
    //     setLon(position.coords.longitude);
    //   });
    // }

    // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'center_changed', function () {
      // 지도의 중심좌표를 얻어옵니다
      const latlng = map.getCenter();
      setCenterLatLng({ lat: latlng.getLat(), lon: latlng.getLng() });
    });

    var positions = [
      {
        title: '지역1',
        latlng: new kakao.maps.LatLng(lat + 0.000004, lon + 0.00001),
      },
      {
        title: '지역2',
        latlng: new kakao.maps.LatLng(lat + 0.000235, lon + 0.00119),
      },
      {
        title: '지역3',
        latlng: new kakao.maps.LatLng(lat + 0.000178, lon - 0.000727),
      },
      {
        title: '지역4',
        latlng: new kakao.maps.LatLng(lat + 0.000692, lon + 0.000071),
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = PinkMarker;

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(35, 35),
        imageOption = { offset: new kakao.maps.Point(18, 50) }; // 마커이미지 옵션

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = positions[i].latlng; // 마커가 표시될 위치

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 마커에 클릭 이벤트를 추가합니다
      kakao.maps.event.addListener(marker, 'click', handleMarkerClick);

      // 커스텀 오버레이의 HTML 콘텐츠
      var content = `
       <div class="customoverlay">
         <span class="title">${positions[i].title}</span>
       </div>
     `;
      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: markerPosition,
        content: content,
        yAnchor: 1,
      });

      // 커스텀 스타일 추가
      const styleTag = document.createElement('style');
      styleTag.textContent = `
       .customoverlay {position:relative;bottom:60px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
       .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
       .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(${ArrowWhite}) no-repeat right 14px center;}
       .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
       .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url(${VertexWhite})}
     `;
      document.head.appendChild(styleTag);
    }
  }, [lat, lon]);

  return (
    <>
      <button onClick={handleRestaurantFind}>중심 위치로 주변 식당 찾기</button>
      <MapView id="map"></MapView>
    </>
  );
};

export default MapContainer;
