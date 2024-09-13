import { create } from 'zustand';

const tabbarStore = create((set) => ({
  activeId: 0,
  handleClickTab: (index) => {
    set(() => ({ activeId: index }));
  },
}));

export default tabbarStore;
