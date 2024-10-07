import React, { useEffect } from 'react';

const ManagerMap = ({ setCenterLat, setCenterLng, setAddress }) => {
  useEffect(() => {
    const { kakao } = window;
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(36.354946759143, 127.29980994578),
      level: 4,
    };
    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerInitialPosition = new kakao.maps.LatLng(
      36.354946759143,
      127.29980994578
    );

    const marker = new kakao.maps.Marker({ position: markerInitialPosition });

    // 마커 지도에 추가
    marker.setMap(map);

    // Geocoder 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    kakao.maps.event.addListener(map, 'center_changed', function () {
      const latlng = map.getCenter();

      // 마커 위치를 지도 중심으로 업데이트
      marker.setPosition(latlng);

      // 현재 중심 좌표를 부모 컴포넌트로 전달
      setCenterLat(latlng.getLat());
      setCenterLng(latlng.getLng());

      // 좌표를 주소로 변환하는 함수 호출
      geocoder.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name; // 변환된 한글 주소
            setAddress(address);
          }
        }
      );
    });
  }, [setCenterLat, setCenterLng, setAddress]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default ManagerMap;
