import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapView, FindRestaurantButton } from './Map';
import PinkMarker from '../../../assets/icons/map/pink-maker.png';
import useMapStore from '../../../stores/map/useMapStore';
import { useNavigate } from 'react-router-dom';
import useMapFilterStore from 'stores/map/useMapFilterStore';
import useReservationStore from '../../../stores/customer/useReservationStore';
import debounce from 'lodash.debounce';

const MapContainer = () => {
  const { kakao } = window;
  const {
    lat,
    lon,
    setLat,
    setLon,
    setMarkerPositions,
    centerLatLng,
    setCenterLatLng,
    getRestaurantPositions,
  } = useMapStore();

  const {
    reservationDate,
    startTime,
    endTime,
    memberCount,
    setReservationDate,
    setStartTime,
    setEndTime,
    setMemberCount,
  } = useReservationStore();

  const { categoryId, setCategoryId, keyword } = useMapFilterStore();

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const lastPositionRef = useRef({ lat, lon });

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 2,
      };
      mapRef.current = new kakao.maps.Map(container, options);

      kakao.maps.event.addListener(
        mapRef.current,
        'center_changed',
        debounce(handleCenterChange, 1500) // 1.5초로 debounce 시간 증가
      );

      fetchAndDisplayMarkers(latitude, longitude);
    };

    const fetchUserLocationAndInitializeMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLat = position.coords.latitude;
            const currentLon = position.coords.longitude;
            setLat(currentLat);
            setLon(currentLon);
            setCenterLatLng({ lat: currentLat, lon: currentLon });
            initializeMap(currentLat, currentLon);
          },
          () => {
            const defaultLat = 36.3504;
            const defaultLon = 127.3845;
            setLat(defaultLat);
            setLon(defaultLon);
            setCenterLatLng({ lat: defaultLat, lon: defaultLon });
            initializeMap(defaultLat, defaultLon);
          }
        );
      }
    };

    fetchUserLocationAndInitializeMap();
    return () => resetFilters();
  }, []);

  const resetFilters = () => {
    setReservationDate(null);
    setStartTime(null);
    setEndTime(null);
    setMemberCount(-1);
    setCategoryId(-1);
    setIsButtonVisible(false);
  };

  const fetchAndDisplayMarkers = useCallback(
    async (latitude, longitude) => {
      const params = {
        latitude,
        longitude,
        ...(categoryId !== -1 && { categoryId }),
        ...(keyword && { keyword }),
        ...(reservationDate && { reservationDate }),
        ...(startTime && startTime !== '00:00' && { startTime }),
        ...(endTime && endTime !== '00:00' && { endTime }),
        ...(memberCount && memberCount !== -1 && { memberCount }),
      };

      try {
        const restaurantMarkers = await getRestaurantPositions(params);
        setMarkerPositions(restaurantMarkers);
        updateMarkers(restaurantMarkers);
      } catch (error) {
        console.error('Failed to fetch restaurant markers', error);
      }
    },
    [
      categoryId,
      keyword,
      reservationDate,
      startTime,
      endTime,
      memberCount,
      getRestaurantPositions,
      setMarkerPositions,
    ]
  );

  const handleCenterChange = () => {
    const latlng = mapRef.current.getCenter();
    const newLat = latlng.getLat();
    const newLon = latlng.getLng();

    // 중심 위치가 500m 이상 변경된 경우에만 요청
    if (
      getDistance(
        lastPositionRef.current.lat,
        lastPositionRef.current.lon,
        newLat,
        newLon
      ) > 0.5
    ) {
      setCenterLatLng({ lat: newLat, lon: newLon });
      setIsButtonVisible(true);
      lastPositionRef.current = { lat: newLat, lon: newLon };
    }
  };

  const updateMarkers = (positions) => {
    const imageSize = new kakao.maps.Size(50, 50);
    const imageOption = { offset: new kakao.maps.Point(25, 50) };
    const markerImage = new kakao.maps.MarkerImage(
      PinkMarker,
      imageSize,
      imageOption
    );

    clearMarkers(); // 기존 마커 초기화

    positions.forEach((position) => {
      const marker = new kakao.maps.Marker({
        position: position.latlng,
        image: markerImage,
      });
      marker.setMap(mapRef.current);
      markersRef.current.push(marker);

      // 식당 이름 오버레이 생성
      const overlayContent = `
        <div style="
          padding:5px 10px; 
          background-color:white; 
          border:1px solid #ddd; 
          border-radius:5px; 
          box-shadow:0px 1px 2px rgba(0,0,0,0.3); 
          font-weight: bold;">
          ${position.title}
        </div>
      `;
      const customOverlay = new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: position.latlng,
        content: overlayContent,
        yAnchor: 2.7, // 마커 위에 위치하도록 설정
        clickable: true,
      });

      markersRef.current.push(customOverlay);
      kakao.maps.event.addListener(marker, 'click', () =>
        handleMarkerClick(position.id)
      );
    });
  };

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반경 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km 단위 거리 반환
  };

  const handleRestaurantFindButtonClick = () => {
    setIsButtonVisible(false);
    fetchAndDisplayMarkers(centerLatLng.lat, centerLatLng.lon);
  };

  const handleMarkerClick = (id) => {
    navigate(`/customer/reservation/restaurant-detail/${id}`);
  };

  return (
    <>
      {isButtonVisible && (
        <FindRestaurantButton onClick={handleRestaurantFindButtonClick}>
          중심 위치로 주변 식당 찾기
        </FindRestaurantButton>
      )}
      <MapView id="map"></MapView>
    </>
  );
};

export default MapContainer;
