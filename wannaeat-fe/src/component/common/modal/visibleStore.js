import  {create} from 'zustand'

const visibleStore = create(set => ({
    isVisible: false, 
    open: () => set(isVisible => ({isVisible: true})),
    close: () => set(isVisible => ({isVisible: false})),
}));

export default visibleStore;