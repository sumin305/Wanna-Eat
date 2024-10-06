import { create } from 'zustand';

const useMyRestaurantStore = create((set) => ({
  reservationDetails: [],
  restaurantId: -1,
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setRestaurantId: (id) => set({ restaurantId: id }),
}));
export default useMyRestaurantStore;
