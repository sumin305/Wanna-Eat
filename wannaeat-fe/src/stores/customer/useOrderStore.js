import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  reservationId: '',
  allMenusData: { menuListByCategoryResponseDtos: [] },
  setAllMenusInfo: (menusInfo) => set(() => ({ allMenusInfo: menusInfo })),
  setReservationId: (reservationId) =>
    set(() => ({ reservationId: reservationId })),
  setAllMenusData: (menusData) => set(() => ({ allMenusData: menusData })),
}));

export default useOrderStore;
