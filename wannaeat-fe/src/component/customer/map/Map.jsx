import React, { useEffect } from 'react';
import { MapView } from './Map';

const MapContainer = () => {
  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 지도 컨테이너의 크기가 변경되었을 때 호출
    window.addEventListener('resize', () => {
      map.relayout();
    });
  }, []);

  return <MapView id="map"></MapView>;
};

export default MapContainer;
