import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Send, Mic, MicOff } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { useChat } from '../hooks/useChat';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const { isRecording, startRecording, stopRecording, cancelRecording } = useVoiceRecording();
  const { sendVoiceMessage } = useChat();

  const micScale = useSharedValue(1);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleVoiceToggle = async () => {
    if (Platform.OS === 'web') {
      alert('Voice recording is not supported in web preview. This feature works on mobile devices.');
      return;
    }

    if (isRecording) {
      const audioUri = await stopRecording();
      if (audioUri) {
        await sendVoiceMessage(audioUri);
      }
    } else {
      await startRecording();
    }
  };

  const micAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: micScale.value }],
    };
  });

  React.useEffect(() => {
    micScale.value = withSpring(isRecording ? 1.2 : 1);
  }, [isRecording]);

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={theme.textSecondary}
          multiline
          maxLength={1000}
          editable={!disabled && !isRecording}
        />
        
        <Animated.View style={micAnimatedStyle}>
          <TouchableOpacity
            style={[
              styles.voiceButton,
              isRecording && styles.voiceButtonActive,
            ]}
            onPress={handleVoiceToggle}
            disabled={disabled}
          >
            {isRecording ? (
              <MicOff size={20} color="#FFFFFF" />
            ) : (
              <Mic size={20} color={theme.primary} />
            )}
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.sendButton,
            (!message.trim() || disabled) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim() || disabled || isRecording}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.background,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    maxHeight: 100,
    paddingVertical: 8,
  },
  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  voiceButtonActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: theme.textSecondary,
    opacity: 0.5,
  },
});