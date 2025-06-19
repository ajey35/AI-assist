import { Audio } from 'expo-av';
import { Platform } from 'react-native';

class AudioService {
  private recording: Audio.Recording | null = null;
  private isSupported: boolean;

  constructor() {
    this.isSupported = Platform.OS !== 'web';
    this.setupAudio();
  }

  private async setupAudio(): Promise<void> {
    if (!this.isSupported) return;

    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Audio setup error:', error);
    }
  }

  async startRecording(): Promise<void> {
    if (!this.isSupported) {
      throw new Error('Audio recording not supported on web platform');
    }

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        throw new Error('Audio recording permission denied');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await this.recording.startAsync();
    } catch (error) {
      console.error('Start recording error:', error);
      throw new Error('Failed to start audio recording');
    }
  }

  async stopRecording(): Promise<string | null> {
    if (!this.isSupported || !this.recording) {
      return null;
    }

    try {
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      return uri;
    } catch (error) {
      console.error('Stop recording error:', error);
      throw new Error('Failed to stop audio recording');
    }
  }

  async playAudio(uri: string): Promise<void> {
    if (!this.isSupported) return;

    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Play audio error:', error);
      throw new Error('Failed to play audio');
    }
  }

  isRecording(): boolean {
    return this.recording !== null;
  }
}

export const audioService = new AudioService();