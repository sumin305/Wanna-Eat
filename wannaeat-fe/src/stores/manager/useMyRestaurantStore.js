import { create } from 'zustand';

const useMyRestaurantStore = create((set) => ({
  restaurantFormData: {
    name: '',
    number: '',
    address: '',
    phone: '',
    restaurantName: '',
    businessType: -1,
    lat: 0,
    lng: 0,
  },
  reservationDetails: [],
  restaurantId: '',
  setRestaurantFormData: (field, value) =>
    set((state) => ({
      restaurantFormData: {
        ...state.restaurantFormData,
        [field]: value,
      },
    })),
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setRestaurantId: (id) => set({ restaurantId: id }),
}));
export default useMyRestaurantStore;
