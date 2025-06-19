import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings as SettingsIcon, 
  Volume2, 
  Mic, 
  Palette, 
  Info,
  MessageSquare,
  Zap
} from 'lucide-react-native';
import { ThemeToggle } from '@/src/components/ThemeToggle';
import { useTheme } from '@/src/hooks/useTheme';
import { voiceService } from '@/src/services/voiceService';
import { Platform } from 'react-native';

export default function SettingsScreen() {
  const { theme } = useTheme();

  const handleTestVoice = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Voice Features',
        'Voice synthesis and recognition are not available in the web preview. These features work on mobile devices.'
      );
      return;
    }

    try {
      await voiceService.speak("Hello! This is a test of the voice synthesis feature.");
    } catch (error) {
      Alert.alert('Error', 'Failed to test voice synthesis');
    }
  };

  const handleAbout = () => {
    Alert.alert(
      'AI Chat Assistant',
      'Version 1.0.0\n\nA modern AI-powered chat assistant with voice capabilities, animated avatar, and beautiful themes.\n\nBuilt with Expo and React Native.',
      [{ text: 'OK' }]
    );
  };

  const styles = createStyles(theme);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress 
  }: { 
    icon: any; 
    title: string; 
    subtitle: string; 
    onPress?: () => void; 
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Icon size={24} color={theme.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[theme.background, theme.surface]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <SettingsIcon size={32} color={theme.primary} />
            <Text style={styles.title}>Settings</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.sectionContent}>
              <View style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Palette size={24} color={theme.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Theme</Text>
                  <Text style={styles.settingSubtitle}>Choose your preferred theme</Text>
                </View>
              </View>
              <ThemeToggle />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voice & Audio</Text>
            <View style={styles.sectionContent}>
              <SettingItem
                icon={Volume2}
                title="Test Voice Synthesis"
                subtitle="Test the text-to-speech functionality"
                onPress={handleTestVoice}
              />
              <SettingItem
                icon={Mic}
                title="Voice Input"
                subtitle={Platform.OS === 'web' ? 'Available on mobile devices' : 'Tap and hold to record voice messages'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.sectionContent}>
              <SettingItem
                icon={MessageSquare}
                title="Chat Features"
                subtitle="Real-time streaming, message history, pull to refresh"
              />
              <SettingItem
                icon={Zap}
                title="AI Integration"
                subtitle="Powered by Google Gemini AI with advanced capabilities"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.sectionContent}>
              <SettingItem
                icon={Info}
                title="App Information"
                subtitle="Version, credits, and technical details"
                onPress={handleAbout}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              AI Chat Assistant v1.0.0{'\n'}
              Built with ❤️ using Expo & React Native
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  footerText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});