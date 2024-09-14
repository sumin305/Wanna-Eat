import { create } from 'zustand';
const useDropdownStore = create((set, get) => ({
  selectedId: -1,
  items: [],
  isShowOption: false,
  getItems: () => get().items,
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

export default useDropdownStore;
