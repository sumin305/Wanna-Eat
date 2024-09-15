import { create } from 'zustand';
const useDropdownStore = create((set, get) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  placeholder: '메뉴를 선택하세요',
  getItems: () => get().items,
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setPlaceholder: (placeholder) => set({ placeholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

export default useDropdownStore;
