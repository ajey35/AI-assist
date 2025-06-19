import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { VoiceConfig } from '../types';
import { DEFAULT_VOICE_CONFIG } from '../constants/config';

class VoiceService {
  private config: VoiceConfig = DEFAULT_VOICE_CONFIG;
  private isSupported: boolean;

  constructor() {
    this.isSupported = Platform.OS !== 'web';
  }

  async speak(text: string, options?: Partial<VoiceConfig>): Promise<void> {
    if (!this.isSupported) {
      console.warn('Speech synthesis not supported on web platform');
      return;
    }

    try {
      const speechOptions = {
        language: options?.language || this.config.language,
        pitch: options?.pitch || this.config.pitch,
        rate: options?.rate || this.config.rate,
        voice: options?.voice || this.config.voice,
      };

      await Speech.speak(text, speechOptions);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      throw new Error('Failed to synthesize speech');
    }
  }

  async stopSpeaking(): Promise<void> {
    if (!this.isSupported) return;

    try {
      await Speech.stop();
    } catch (error) {
      console.error('Stop speech error:', error);
    }
  }

  async getAvailableVoices(): Promise<Speech.Voice[]> {
    if (!this.isSupported) return [];

    try {
      return await Speech.getAvailableVoicesAsync();
    } catch (error) {
      console.error('Get voices error:', error);
      return [];
    }
  }

  updateConfig(config: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  isSpeaking(): boolean {
    if (!this.isSupported) return false;
    return Speech.isSpeakingAsync();
  }

  // Web fallback for speech synthesis
  private webSpeak(text: string): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.config.rate;
      utterance.pitch = this.config.pitch;
      utterance.lang = this.config.language;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const voiceService = new VoiceService();