import { create } from 'zustand';

const useCardStore = create((set) => ({
  cardList: [],
  cardIssuerList: [],
  setCardList: (cardList) => set(() => ({ cardList })),
  setCardIssuerList: (cardIssuerList) => set(() => ({ cardIssuerList })),
}));

export default useCardStore;
