import { create } from 'zustand';
import { ChatState, Message, AvatarEmotion } from '../types';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  isListening: false,
  currentTheme: 'light',
  avatarEmotion: 'neutral',

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  updateLastMessage: (text) => {
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage.isUser) {
          messages[messages.length - 1] = {
            ...lastMessage,
            text,
            isTyping: false,
          };
        }
      }
      return { messages };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  
  setListening: (listening) => set({ isListening: listening }),
  
  setTheme: (theme) => set({ currentTheme: theme }),
  
  setAvatarEmotion: (emotion) => set({ avatarEmotion: emotion }),
  
  clearMessages: () => set({ messages: [] }),
}));