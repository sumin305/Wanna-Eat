import { create } from 'zustand';

const tabbarStore = create((set) => ({
  activeId: 0,
  handleTabClick: (index) => {
    set(() => ({ activeId: index }));
  },
}));

export default tabbarStore;
