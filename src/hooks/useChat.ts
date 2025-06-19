import { useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { geminiService } from '../services/geminiService';
import { voiceService } from '../services/voiceService';
import { Platform } from 'react-native';

export const useChat = () => {
  const {
    messages,
    isLoading,
    addMessage,
    updateLastMessage,
    setLoading,
    setAvatarEmotion,
  } = useChatStore();

  const sendMessage = useCallback(async (text: string, speakResponse = false) => {
    try {
      setLoading(true);
      setAvatarEmotion('thinking');

      // Add user message
      addMessage({ text, isUser: true });

      // Add placeholder AI message
      addMessage({ text: '', isUser: false, isTyping: true });

      // Generate AI response with streaming
      const fullResponse = await geminiService.generateResponse(text);
      updateLastMessage(fullResponse);

      setAvatarEmotion('neutral');

      // Speak the response if requested and supported
      if (speakResponse && Platform.OS !== 'web') {
        setAvatarEmotion('speaking');
        await voiceService.speak(fullResponse);
        setAvatarEmotion('neutral');
      }

    } catch (error) {
      console.error('Send message error:', error);
      updateLastMessage('Sorry, I encountered an error processing your request.');
      setAvatarEmotion('neutral');
    } finally {
      setLoading(false);
    }
  }, [addMessage, updateLastMessage, setLoading, setAvatarEmotion]);

  const sendVoiceMessage = useCallback(async (audioUri: string) => {
    try {
      // For demo purposes, we'll simulate voice-to-text
      // In a real app, you'd use a speech-to-text service
      const simulatedText = "This was a voice message";
      await sendMessage(simulatedText, true);
    } catch (error) {
      console.error('Voice message error:', error);
    }
  }, [sendMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    sendVoiceMessage,
  };
};