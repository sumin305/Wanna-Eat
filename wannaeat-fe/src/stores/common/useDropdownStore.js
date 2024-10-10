import { create } from 'zustand';

const useDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowOption: false,
  placeholder: '카테고리를 선택하세요',
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setPlaceholder: (placeholder) => set({ placeholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

// 시작 시간
const useVisitTimeDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowVisitTimeOption: false,
  visitTimePlaceholder: '방문시간',
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setVisitTimePlaceholder: (placeholder) =>
    set({ visitTimePlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

// 머무는 시간
const useDurationDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowDurationOption: false,
  durationPlaceholder: '머물시간',
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setDurationPlaceholder: (placeholder) =>
    set({ durationPlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

// 끝나는 시간
const useEndTimeDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowEndTimeOption: false,
  EndTimePlaceholder: '끝나는시간',
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setDurationPlaceholder: (placeholder) =>
    set({ durationPlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

// 브레이크 시작시간
const useBreakStartTimeDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowEndTimeOption: false,
  EndTimePlaceholder: '시작시간',
  setWidth: (width) => set({ width: width }),
  setHeight: (height) => set({ height: height }),
  setDurationPlaceholder: (placeholder) =>
    set({ durationPlaceholder: placeholder }),
  setSelectedId: (idx) => set({ selectedId: idx }),
  setItems: (items) => set({ items: items }),
  setIsShowOption: (isShowOption) => set({ isShowOption: isShowOption }),
}));

// 브레이크 끝나는 시간
const useBreakEndTimeDropdownStore = create((set) => ({
  width: '93%',
  height: '30px',
  selectedId: -1,
  items: [],
  isShowEndTimeOption: false,
  EndTimePlaceholder: '끝나는시간',
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
  useEndTimeDropdownStore,
  useBreakStartTimeDropdownStore,
  useBreakEndTimeDropdownStore,
};
