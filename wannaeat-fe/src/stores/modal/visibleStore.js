import  {create} from 'zustand'

const visibleStore = create(set => ({
    isVisible: false, 
    open: () => set(() => ({isVisible: true})),
    close: () => set(() => ({isVisible: false})),
}));

export default visibleStore;