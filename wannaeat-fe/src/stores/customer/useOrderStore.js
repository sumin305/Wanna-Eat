import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  menuCounts: [], // 메뉴 수량을 관리하는 상태 추가
  allOrdersInfo: { orderListResponseDto: { orderDetailResponseDtos: [] } },
  reservationId: '',
  allMenusData: { menuListByCategoryResponseDtos: [] },
  content: {},
  setAllMenusInfo: (menusInfo) => set(() => ({ allMenusInfo: menusInfo })),
  setMenuCounts: (updatedMenuCounts) =>
    set(() => ({ menuCounts: updatedMenuCounts })),
  setAllOrdersInfo: (ordersInfo) => set(() => ({ allOrdersInfo: ordersInfo })),
  setReservationId: (reservationId) =>
    set(() => ({ reservationId: reservationId })),
  setAllMenusData: (menusData) => set(() => ({ allMenusData: menusData })),
  setContent: (content) => set(() => ({ content: content })),
}));

export default useOrderStore;
