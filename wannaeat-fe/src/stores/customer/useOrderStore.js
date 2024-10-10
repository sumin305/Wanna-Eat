import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  allSortedMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  allOrdersInfo: { orderListResponseDto: { orderDetailResponseDtos: [] } },
  allMenusData: { menuListByCategoryResponseDtos: [] },
  orders: [],
  content: {},
  reservationDate: '',
  reservationStartTime: '',
  reservationEndTime: '',
  restaurantId: 0,
  reservationId: 0,
  selectedCard: null,
  payPrice: 0,
  payOrders: [],
  isAllPaid: false,
  orderCounts: {},
  setOrders: (orders) => set(() => ({ orders: orders })),
  setOrderCounts: (counts) => set(() => ({ orderCounts: counts })),
  setPayOrders: (orders) => set(() => ({ payOrders: orders })),
  setAllMenusInfo: (menusInfo) => set(() => ({ allMenusInfo: menusInfo })),
  setAllMenusSortInfo: (sortedMenusInfo) =>
    set(() => ({ allSortedMenusInfo: sortedMenusInfo })),
  setAllOrdersInfo: (ordersInfo) => set(() => ({ allOrdersInfo: ordersInfo })),
  setAllMenusData: (menusData) => set(() => ({ allMenusData: menusData })),
  setContent: (content) => set(() => ({ content: content })),

  setPayPrice: (price) => set(() => ({ payPrice: price })),
  setSelectedCard: (card) => set(() => ({ selectedCard: card })),
  setReservationDate: (date) => set(() => ({ reservationDate: date })),
  setReservationStartTime: (time) =>
    set(() => ({ reservationStartTime: time })),
  setReservationEndTime: (time) => set(() => ({ reservationEndTime: time })),
  setRestaurantId: (id) => set(() => ({ restaurantId: id })),
  setReservationId: (id) => set(() => ({ reservationId: id })),
  setIsAllPaid: (isAllPaid) => set(() => ({ isAllPaid: isAllPaid })),
}));

export default useOrderStore;
