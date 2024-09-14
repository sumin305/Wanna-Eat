import { create } from 'zustand';

const useTabbarStore = create((set) => ({
  activeId: 0,
  handleClickTab: (index) => {
    set(() => ({ activeId: index }));
  },
}));

export default useTabbarStore;
