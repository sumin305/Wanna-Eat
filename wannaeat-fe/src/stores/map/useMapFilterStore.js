import { create } from 'zustand';
const useMapFilterStore = create((set) => ({
  categoryId: -1,
  keyword: '',
  reservationDate: '',
  startTime: '',
  endTime:'',
  memberCount: -1,
  setCategoryId: (categoryId) => set({ categoryId: categoryId }),
  setKeyword: (keyword) => set({ keyword: keyword }),
  setReservationDate: (reservationDate) => set({ reservationDate: reservationDate }),
  setStartTime: (startTime) => set({ startTime: startTime }),
  setEndTime: (endTime) => set({ endTime: endTime }),
  setMemberCount: (memberCount) => set({ memberCount: memberCount }),
}));

export default useMapFilterStore;
