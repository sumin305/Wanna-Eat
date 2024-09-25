import { create } from 'zustand';

const useFooterStore = create((set) => ({
  activeId: 0,
  activePath: '/',
  handleClickTab: (index, path) => {
    set(() => ({ activeId: index, activePath: path }));
  },
}));

export default useFooterStore;
