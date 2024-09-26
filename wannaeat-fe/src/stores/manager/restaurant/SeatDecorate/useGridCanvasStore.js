import { create } from 'zustand';

const useGridCanvasStore = create((set) => ({
  elements: [],
  currentFloor: 1,

  addItem: (item) =>
    set((state) => ({
      elements: [...state.elements, item],
    })),

  setFloor: (floor) =>
    set(() => ({
      currentFloor: floor,
    })),

  getElementsByFloor: (floor) =>
    set((state) => state.elements.filter((el) => el.floor === floor)),
}));

export default useGridCanvasStore;
