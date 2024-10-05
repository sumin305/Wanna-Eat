import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  allSortedMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  allOrdersInfo: { orderListResponseDto: { orderDetailResponseDtos: [] } },
  reservationId: '',
  allMenusData: { menuListByCategoryResponseDtos: [] },
  content: {},
  setAllMenusInfo: (menusInfo) => set(() => ({ allMenusInfo: menusInfo })),
  setAllMenusSortInfo: (sortedMenusInfo) =>
    set(() => ({ allSortedMenusInfo: sortedMenusInfo })),
  setAllOrdersInfo: (ordersInfo) => set(() => ({ allOrdersInfo: ordersInfo })),
  setReservationId: (reservationId) =>
    set(() => ({ reservationId: reservationId })),
  setAllMenusData: (menusData) => set(() => ({ allMenusData: menusData })),
  setContent: (content) => set(() => ({ content: content })),
}));

export default useOrderStore;
