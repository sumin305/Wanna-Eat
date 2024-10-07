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
  },
  reservationDetails: [],
  restaurantId: window.localStorage.getItem('restaurantId') || '',
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
