import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '@/src/components/Avatar';
import { useTheme } from '@/src/hooks/useTheme';
import { useChatStore } from '@/src/store/chatStore';
import { AvatarEmotion } from '@/src/types';

const emotions: { key: AvatarEmotion; label: string; description: string }[] = [
  { key: 'neutral', label: 'Neutral', description: 'Default relaxed state' },
  { key: 'happy', label: 'Happy', description: 'Excited and positive' },
  { key: 'thinking', label: 'Thinking', description: 'Processing information' },
  { key: 'speaking', label: 'Speaking', description: 'Providing response' },
  { key: 'listening', label: 'Listening', description: 'Receiving voice input' },
];

export default function AvatarScreen() {
  const { theme } = useTheme();
  const { avatarEmotion, setAvatarEmotion } = useChatStore();

  const styles = createStyles(theme);

  return (
    <LinearGradient
      colors={[theme.background, theme.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Avatar Emotions</Text>
          <Text style={styles.subtitle}>
            Watch how the AI avatar expresses different emotions and states
          </Text>

          <View style={styles.avatarContainer}>
            <Avatar emotion={avatarEmotion} />
            <Text style={styles.currentEmotion}>
              Current: {emotions.find(e => e.key === avatarEmotion)?.label}
            </Text>
          </View>

          <View style={styles.emotionsGrid}>
            {emotions.map((emotion) => (
              <TouchableOpacity
                key={emotion.key}
                style={[
                  styles.emotionButton,
                  avatarEmotion === emotion.key && styles.activeEmotionButton,
                ]}
                onPress={() => setAvatarEmotion(emotion.key)}
              >
                <Text style={[
                  styles.emotionLabel,
                  { color: avatarEmotion === emotion.key ? '#FFFFFF' : theme.text }
                ]}>
                  {emotion.label}
                </Text>
                <Text style={[
                  styles.emotionDescription,
                  { color: avatarEmotion === emotion.key ? 'rgba(255,255,255,0.8)' : theme.textSecondary }
                ]}>
                  {emotion.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Avatar Features</Text>
            <Text style={styles.infoText}>
              • Smooth emotional transitions{'\n'}
              • Visual feedback for voice interactions{'\n'}
              • Responsive to conversation context{'\n'}
              • Optimized animations for performance{'\n'}
              • Cross-platform compatibility
            </Text>
          </View>
        </ScrollView>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  currentEmotion: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.primary,
    marginTop: 16,
  },
  emotionsGrid: {
    gap: 12,
    marginBottom: 32,
  },
  emotionButton: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  activeEmotionButton: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  emotionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  emotionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.border,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: theme.textSecondary,
    lineHeight: 24,
  },
});