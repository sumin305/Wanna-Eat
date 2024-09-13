import { create } from 'zustand';

const visibleStore = create((set) => ({
  isModalVisible: false,
  modalType: 'alert',
  open: () => set(() => ({ isModalVisible: true })),
  close: () => set(() => ({ isModalVisible: false })),
}));

export default visibleStore;
