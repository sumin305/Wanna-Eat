import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  allOrdersInfo: { orderListResponseDto: { orderDetailResponseDtos: [] } },
  reservationId: '',
  allMenusData: { menuListByCategoryResponseDtos: [] },
  content: {},
  setAllMenusInfo: (menusInfo) => set(() => ({ allMenusInfo: menusInfo })),
  setAllOrdersInfo: (ordersInfo) => set(() => ({ allOrdersInfo: ordersInfo })),
  setReservationId: (reservationId) =>
    set(() => ({ reservationId: reservationId })),
  setAllMenusData: (menusData) => set(() => ({ allMenusData: menusData })),
  setContent: (content) => set(() => ({ content: content })),
}));

export default useOrderStore;
