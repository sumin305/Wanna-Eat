import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartElements: [],
  setCartElements: (cartElements) =>
    set(() => ({ cartElements: cartElements })),
}));
export default useCartStore;
