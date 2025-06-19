import { VoiceConfig, GeminiConfig } from '../types';

export const DEFAULT_VOICE_CONFIG: VoiceConfig = {
  language: 'en-US',
  pitch: 1.0,
  rate: 0.8,
};

export const GEMINI_CONFIG: GeminiConfig = {
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
  model: 'gemini-1.5-flash-002',
  maxTokens: 1000,
  temperature: 0.7,
};

export const AVATAR_ANIMATIONS = {
  neutral: require('../../assets/animations/neutral.json'),
  happy: require('../../assets/animations/happy.json'),
  thinking: require('../../assets/animations/thinking.json'),
  speaking: require('../../assets/animations/speaking.json'),
  listening: require('../../assets/animations/listening.json'),
};

export const CHAT_CONFIG = {
  maxMessages: 100,
  typingDelay: 50,
  streamingDelay: 20,
  avatarTransitionDuration: 300,
};