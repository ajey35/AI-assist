import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Message } from '../types';
import { useTheme } from '../hooks/useTheme';
import { Volume2, User, Bot } from 'lucide-react-native';
import { voiceService } from '../services/voiceService';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  const { theme } = useTheme();

  const handleSpeak = async () => {
    try {
      await voiceService.speak(message.text);
    } catch (error) {
      console.error('Speak message error:', error);
    }
  };

  const styles = createStyles(theme);

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      layout={Layout.springify()}
      style={[
        styles.container,
        message.isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View style={[
        styles.messageContent,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}>
        <View style={styles.messageHeader}>
          <View style={styles.avatarContainer}>
            {message.isUser ? (
              <User size={16} color={message.isUser ? '#FFFFFF' : theme.text} />
            ) : (
              <Bot size={16} color={theme.text} />
            )}
          </View>
          <Text style={[
            styles.senderText,
            { color: message.isUser ? '#FFFFFF' : theme.textSecondary }
          ]}>
            {message.isUser ? 'You' : 'AI Assistant'}
          </Text>
          <Text style={[
            styles.timeText,
            { color: message.isUser ? 'rgba(255,255,255,0.7)' : theme.textSecondary }
          ]}>
            {format(message.timestamp, 'HH:mm')}
          </Text>
        </View>

        <Text style={[
          styles.messageText,
          { color: message.isUser ? '#FFFFFF' : theme.text },
          message.isTyping && styles.typingText,
        ]}>
          {message.text || (message.isTyping ? 'Thinking...' : '')}
        </Text>

        {!message.isUser && !message.isTyping && (
          <TouchableOpacity style={styles.speakButton} onPress={handleSpeak}>
            <Volume2 size={14} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  messageContent: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userMessage: {
    backgroundColor: theme.userMessage,
  },
  aiMessage: {
    backgroundColor: theme.aiMessage,
    borderWidth: 1,
    borderColor: theme.border,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  senderText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  timeText: {
    fontSize: 11,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  typingText: {
    fontStyle: 'italic',
    opacity: 0.7,
  },
  speakButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
    padding: 4,
  },
});