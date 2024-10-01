import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenus: [],
  setAllMenus: (menus) => set(() => ({ allMenus: menus })),
}));

export default useOrderStore;
