import { create } from 'zustand';

const useTabbarStore = create((set) => ({
  isManager: true,
  activeId: 0,
  handleClickTab: (index) => {
    set(() => ({ activeId: index }));
  },
}));

export default useTabbarStore;
