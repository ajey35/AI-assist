import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { audioService } from '../services/audioService';
import { useChatStore } from '../store/chatStore';

export const useVoiceRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const { setListening, setAvatarEmotion } = useChatStore();

  const startRecording = useCallback(async () => {
    if (Platform.OS === 'web') {
      alert('Voice recording is not supported in web preview. This feature works on mobile devices.');
      return;
    }

    try {
      await audioService.startRecording();
      setIsRecording(true);
      setListening(true);
      setAvatarEmotion('listening');
      
      // Start duration timer
      const timer = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      // Store timer reference for cleanup
      (startRecording as any).timer = timer;
    } catch (error) {
      console.error('Start recording error:', error);
      alert('Failed to start recording. Please check microphone permissions.');
    }
  }, [setListening, setAvatarEmotion]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      const audioUri = await audioService.stopRecording();
      setIsRecording(false);
      setListening(false);
      setAvatarEmotion('neutral');
      setRecordingDuration(0);

      // Clear timer
      if ((startRecording as any).timer) {
        clearInterval((startRecording as any).timer);
      }

      return audioUri;
    } catch (error) {
      console.error('Stop recording error:', error);
      return null;
    }
  }, [setListening, setAvatarEmotion]);

  const cancelRecording = useCallback(async () => {
    try {
      await audioService.stopRecording();
      setIsRecording(false);
      setListening(false);
      setAvatarEmotion('neutral');
      setRecordingDuration(0);

      // Clear timer
      if ((startRecording as any).timer) {
        clearInterval((startRecording as any).timer);
      }
    } catch (error) {
      console.error('Cancel recording error:', error);
    }
  }, [setListening, setAvatarEmotion]);

  return {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
    cancelRecording,
  };
};