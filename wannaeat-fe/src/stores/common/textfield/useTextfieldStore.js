import { create } from 'zustand';

const useTextfieldStore = create((set) => ({
  error: false,
  setError: (value) => set({ error: value }),
  clearError: () => set({ error: false }),
}));

export default useTextfieldStore;
