import { create } from 'zustand';
const useMapFilterStore = create((set) => ({
  categoryId: -1,
  keyword: '',
  setCategoryId: (categoryId) => set({ categoryId: categoryId }),
  setKeyword: (keyword) => set({ keyword: keyword }),
  resetMapFilterStore: () =>
    set({
      categoryId: -1,
      keyword: '',
    }),
}));

export default useMapFilterStore;
