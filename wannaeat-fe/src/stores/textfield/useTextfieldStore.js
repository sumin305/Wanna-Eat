import { create } from 'zustand';

const useTextfieldStore = create((set) => ({
  errors: {},
  errorMessages: {},

  setError: (field, value, message = '') =>
    set((state) => ({
      errors: { ...state.errors, [field]: value },
      errorMessages: { ...state.errorMessages, [field]: message },
    })),

  clearError: (field) =>
    set((state) => ({
      errors: { ...state.errors, [field]: false },
      errorMessages: { ...state.errorMessages, [field]: '' },
    })),
}));

export default useTextfieldStore;
