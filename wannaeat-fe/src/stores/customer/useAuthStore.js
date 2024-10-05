import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isSupported: false,
  isPasskeyRegistered: false,
  setIsAuthenticated: (isAuthenticated) =>
    set(() => ({ isAuthenticated: isAuthenticated })),
  setIsSupported: (isSupported) => set(() => ({ isSupported: isSupported })),
  setIsPasskeyRegistered: (isPasskeyRegistered) =>
    set(() => ({ isPasskey: isPasskeyRegistered })),
}));

export default useAuthStore;
