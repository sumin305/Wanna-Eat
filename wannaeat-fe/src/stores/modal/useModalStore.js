import { create } from 'zustand';

const useModalStore = create((set) => ({
  isModalVisible: false,
  modalType: '',
  title: '',
  alertText: '취소하시겠습니까?',
  cancelText: '취소',
  confirmText: '확인',
  children: <div></div>,
  open: () => set({ isModalVisible: true }),
  close: () => set({ isModalVisible: false }),
  setTitle: (text) => set({ title: text }),
  setModalType: (newModalType) => set({ modalType: newModalType }),
  setAlertText: (text) => set({ alertText: text }),
  setCancelText: (text) => set({ cancelText: text }),
  setConfirmText: (text) => set({ confirmText: text }),
  setChildren: (children) => set({ children: children }),
}));

export default useModalStore;
