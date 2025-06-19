export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
  audioUrl?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  currentTheme: 'light' | 'dark' | 'system';
  avatarEmotion: AvatarEmotion;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateLastMessage: (text: string) => void;
  setLoading: (loading: boolean) => void;
  setListening: (listening: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setAvatarEmotion: (emotion: AvatarEmotion) => void;
  clearMessages: () => void;
}

export type AvatarEmotion = 'neutral' | 'happy' | 'thinking' | 'speaking' | 'listening';

export interface VoiceConfig {
  language: string;
  pitch: number;
  rate: number;
  voice?: string;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  userMessage: string;
  aiMessage: string;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}