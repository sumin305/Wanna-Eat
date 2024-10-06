import React, { useEffect } from 'react';

const ManagerMap = ({ setCenterLat, setCenterLng }) => {
  useEffect(() => {
    const { kakao } = window;

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(36.354946759143, 127.29980994578),
      level: 4,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerInitialPosition = new kakao.maps.LatLng(
      36.354946759143,
      127.29980994578
    );

    const marker = new kakao.maps.Marker({ position: markerInitialPosition });

    // 마커 지도에 추가
    marker.setMap(map);

    kakao.maps.event.addListener(map, 'center_changed', function () {
      const latlng = map.getCenter();

      // 마커 위치를 지도 중심으로 업데이트
      marker.setPosition(latlng);

      // 현재 중심 좌표를 부모 컴포넌트로 전달
      setCenterLat(latlng.getLat());
      setCenterLng(latlng.getLng());
    });
  }, [setCenterLat, setCenterLng]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default ManagerMap;
