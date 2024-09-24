import { create } from 'zustand';

const useMapStore = create((set) => ({
  lat: 33.450701, // 위도값
  lon: 126.570667, // 경도값
  mapInstance: null, // 지도 인스턴스를 저장할 상태
  isInitialLoad: true,
  setLat: (lat) => set({ lat }),
  setLon: (lon) => set({ lon }),
  setMapInstance: (map) => set({ mapInstance: map }), // 지도 인스턴스를 설정하는 함수
  setIsInitialLoad: (isInitialLoad) => set({ isInitialLoad: isInitialLoad }),
}));

export default useMapStore;
