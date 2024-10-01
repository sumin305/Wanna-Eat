import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenus: [],
  setAllMenus: (menus) => set(() => ({ allMenus: menus })),
  setEmptyAllMenus: () => set(() => ({ allMenus: [] })),
}));

export default useOrderStore;
