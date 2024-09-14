import { create } from 'zustand';

const useDropdownStore = create((set) => ({
  selectedId: 0,
  items: [],
  setSelectId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
}));

export default useDropdownStore;
