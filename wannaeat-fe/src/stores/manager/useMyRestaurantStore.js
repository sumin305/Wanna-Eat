import { create } from 'zustand';

const useMyRestaurantStore = create((set) => ({
  managerFormData: {
    name: '',
    number: '',
    address: '',
    phone: '',
    restaurantName: '',
    businessType: -1,
    lat: 0,
    lng: 0,
    restaurantOpenTime: '',
    restaurantCloseTime: '',
    depositPerMember: '',
  },
  reservationDetails: [],
  restaurantId: null,
  restaurantSize: '',
  restaurantFloorCnt: -1,
  setRestaurantSize: (restaurantSize) =>
    set({ restaurantSize: restaurantSize }),
  setRestaurantFloorCnt: (restaurantFloorCnt) =>
    set({ restaurantFloorCnt: restaurantFloorCnt }),
  setManagerFormData: (field, value) =>
    set((state) => ({
      managerFormData: {
        ...state.managerFormData,
        [field]: value,
      },
    })),
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setRestaurantId: (id) => set({ restaurantId: id }),
}));

export default useMyRestaurantStore;
