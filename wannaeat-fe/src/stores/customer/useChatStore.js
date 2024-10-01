import { create } from 'zustand';

const useChatStore = create((set) => ({
  chatMessages: [],
  isConnected: 'false',
  stompClient: null,
  chatPage: 0,
  chatSize: 10,
  setChatMessages: (messages) => set(() => ({ chatMessages: messages })),
  setChatPlusMessages: (newMessage) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, newMessage],
    })),
  setEmptyChatMessages: () => set(() => ({ chatMessages: [] })),
  setPrevChatPlusMessages: (prevMessages) =>
    set((state) => ({
      chatMessages: [...prevMessages, ...state.chatMessages],
    })),
  setIsConnected: (isConnected) => set(() => ({ isConnected: isConnected })),
  setStompClient: (client) => set(() => ({ stompClient: client })),
  setChatPage: (chatPage) => set(() => ({ chatPage: chatPage })),
}));

export default useChatStore;
