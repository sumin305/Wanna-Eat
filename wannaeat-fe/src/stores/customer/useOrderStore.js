import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenus: [],
  reservationTime: '',
  setAllMenus: (menus) => set(() => ({ allMenus: menus })),
}));

export default useOrderStore;
