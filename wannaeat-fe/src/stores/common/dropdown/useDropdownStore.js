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

const useVisitTimeDropdownStore = create((set, get) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  visitTimePlaceholder: '방문시간',
  getItems: () => get().items,
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setVisitTimePlaceholder: (placeholder) =>
    set({ visitTimePlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

const useDurationDropdownStore = create((set, get) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  durationPlaceholder: '머물시간',
  getItems: () => get().items,
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setDurationPlaceholder: (placeholder) =>
    set({ durationPlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

export {
  useDropdownStore,
  useVisitTimeDropdownStore,
  useDurationDropdownStore,
};
