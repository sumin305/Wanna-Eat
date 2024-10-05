import { create } from 'zustand';

const useMyRestaurantStore = create((set) => ({
  reservationDetails: [],
  setReservationDetails: (details) => set({ reservationDetails: details }),
}));
export default useMyRestaurantStore;
