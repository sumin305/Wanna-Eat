import { create } from 'zustand';

const useTextfieldStore = create((set) => ({
  errors: {},
  errorMessages: {},

  setError: (name, type, message = '') =>
    set((state) => ({
      errors: { ...state.errors, [name]: type },
      errorMessages: { ...state.errorMessages, [name]: message },
    })),

  clearError: (name) =>
    set((state) => ({
      errors: { ...state.errors, [name]: null },
      errorMessages: { ...state.errorMessages, [name]: '' },
    })),
}));

export default useTextfieldStore;
