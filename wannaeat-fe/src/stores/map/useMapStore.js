import { create } from 'zustand';
import { getRestaurants } from 'api/customer/restaurant.js';
const { kakao } = window;

const useMapStore = create((set) => ({
  lat: 33.450701, // 위도값
  lon: 126.570667, // 경도값
  mapInstance: null, // 지도 인스턴스를 저장할 상태
  isInitialLoad: true,
  markerPositions: [],
  centerLatLng: {},
  setCenterLatLng: (centerLatLng) => set({ centerLatLng }), // 중심 좌표 설정하는 함수
  setLat: (lat) => set({ lat }),
  setLon: (lon) => set({ lon }),
  setMapInstance: (map) => set({ mapInstance: map }), // 지도 인스턴스를 설정하는 함수
  setIsInitialLoad: (isInitialLoad) => set({ isInitialLoad: isInitialLoad }),
  setMarkerPositions: (positions) => set({ markerPositions: positions }), // 마커 위치를 설정하는 함수
  getRestaurantPositions: async (searchCondition) => {
    const result = await getRestaurants(searchCondition);
    let restaurants = [];
    // 검색 성공 시 마커 위치들 세팅
    if (result.status === 200) {
      console.log('레스토랑 검색 성공', result);

      restaurants = result.data.restaurantMapDetailResponseDtos.map(
        (restaurant) => ({
          id: restaurant.restaurantId,
          title: restaurant.restaurantName,
          latlng: new kakao.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
          ),
        })
      );
    } else {
      console.log('근처 식당 정보 조회 실패', result);
    }
    console.log('restaurants: ', restaurants);
    return restaurants;
  },
}));

export default useMapStore;
