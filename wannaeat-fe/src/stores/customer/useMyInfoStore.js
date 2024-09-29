import { create } from 'zustand';

const useMyInfoStore = create((set) => ({
  nickname: '',
  email: '',
  phone: '',
  setNickname: (nickname) => set(() => ({ nickname: nickname })),
  setEmail: (email) => set(() => ({ email: email })),
  setPhone: (phone) => set(() => ({ phone: phone })),
}));

export default useMyInfoStore;
