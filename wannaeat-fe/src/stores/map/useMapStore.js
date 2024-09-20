import { create } from 'zustand';

const useMapStore = create((set) => ({
  lat: 33.450701, // 위도값
  lon: 126.570667, // 경도값
  setLat: (lat) => set({ lat: lat }),
  setLon: (lon) => set({ lon: lon }),
}));

export default useMapStore;
