import { create } from 'zustand';

const useAnimationStore = create((set) => ({
  beforeUrl: '',
  setBeforeUrl: (url) => set(() => ({ beforeUrl: url })),
}));

export default useAnimationStore;
