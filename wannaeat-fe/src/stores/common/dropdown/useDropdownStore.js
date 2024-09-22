import { create } from 'zustand';

const useDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  placeholder: '카테고리를 선택하세요',
  selectedItem: null,
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setPlaceholder: (placeholder) => set({ placeholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

const useVisitTimeDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  visitTimePlaceholder: '방문시간',
  selectedItem: null,
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setVisitTimePlaceholder: (placeholder) =>
    set({ visitTimePlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

const useDurationDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  durationPlaceholder: '머물시간',
  selectedItem: null,
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setDurationPlaceholder: (placeholder) =>
    set({ durationPlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

export {
  useDropdownStore,
  useVisitTimeDropdownStore,
  useDurationDropdownStore,
};
