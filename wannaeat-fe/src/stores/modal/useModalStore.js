import { create } from 'zustand';

const useModalStore = create((set) => ({
  isModalVisible: false,
  modalType: '',
  alertText: '취소하시겠습니까?',
  cancelText: '취소',
  confirmText: '확인',
  open: () => set({ isModalVisible: true }),
  close: () => set({ isModalVisible: false }),
  setModalType: (newModalType) => set({ modalType: newModalType }),
  setAlertText: (text) => set({ alertText: text }),
  setCancelText: (text) => set({ cancelText: text }),
  setConfirmText: (text) => set({ confirmText: text }),
}));

export default useModalStore;
