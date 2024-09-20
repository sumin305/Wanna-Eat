import React, { useEffect, useState } from 'react';
import { MapView } from './Map';

const MapContainer = () => {
  const [lat, setLat] = useState(33.450701); // 위도값
  const [lon, setLon] = useState(126.570667); // 경도값

  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 현재 위치에 해당하는 위도, 경도값으로 변경
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    }
  }, [lat, lon]);

  return <MapView id="map"></MapView>;
};

export default MapContainer;
