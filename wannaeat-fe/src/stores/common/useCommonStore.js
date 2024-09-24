import { create } from 'zustand';
export const ROLE = {
  CUSTOMER: 'customer',
  MANAGER: 'manager',
  GUEST: 'guest',
};
const useCommonStore = create((set) => ({
  role: ROLE.GUEST, //기본값은 customer
  categories: [], // 음식 카테고리

  setRole: (value) => set(() => ({ role: value })),
  setCategories: (categories) => set({ categories: categories }),
}));

export default useCommonStore;
