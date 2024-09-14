import { create } from 'zustand';

const useModalStore = create((set) => ({
  isModalVisible: false,
  modalType: 'alert',
  open: () => set({isModalVisible: true}),
  close: () => set({isModalVisible: false}),
  setModalType: (newModalType) => set({modalType: newModalType})
}));

export default useModalStore;
