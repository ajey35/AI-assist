import React, { useRef, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trash2 } from 'lucide-react-native';
import { ChatMessage } from '@/src/components/ChatMessage';
import { ChatInput } from '@/src/components/ChatInput';
import { Avatar } from '@/src/components/Avatar';
import { useChat } from '@/src/hooks/useChat';
import { useTheme } from '@/src/hooks/useTheme';
import { useChatStore } from '@/src/store/chatStore';

export default function ChatScreen() {
  const { theme } = useTheme();
  const { messages, isLoading, sendMessage } = useChat();
  const { avatarEmotion, clearMessages } = useChatStore();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSendMessage = async (text: string) => {
    await sendMessage(text, true); // Enable voice response
  };

  const handleRefresh = () => {
    // In a real app, you might reload chat history from a server
  };

  const handleClearChat = () => {
    clearMessages();
  };

  const styles = createStyles(theme);

  const renderMessage = ({ item, index }: { item: any; index: number }) => (
    <ChatMessage message={item} index={index} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Avatar emotion={avatarEmotion} />
      <Text style={styles.emptyTitle}>Welcome to AI Chat Assistant</Text>
      <Text style={styles.emptySubtitle}>
        Start a conversation by typing a message or using voice input
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        {messages.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
            <Trash2 size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[theme.background, theme.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={isLoading}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  clearButton: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
});