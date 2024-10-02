import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isSupported: false,
  isPasskeyRegistered: false,
  selectedCard: null,
  setIsAuthenticated: (isAuthenticated) =>
    set(() => ({ isAuthenticated: isAuthenticated })),
  setIsSupported: (isSupported) => set(() => ({ isSupported: isSupported })),
  setIsPasskeyRegistered: (isPasskeyRegistered) =>
    set(() => ({ isPasskey: isPasskeyRegistered })),
  setSelectedCard: (card) => set(() => ({ selectedCard: card })),
}));

export default useAuthStore;
