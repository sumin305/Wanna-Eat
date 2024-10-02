import { create } from 'zustand';

const useOrderStore = create((set) => ({
  allMenusInfo: { cartDetailResponseDto: { cartElements: [] } },
  setAllMenusInfo: (menusInfo) => set(() => ({ allMenusInfo: menusInfo })),
}));

export default useOrderStore;
