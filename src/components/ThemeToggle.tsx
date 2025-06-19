import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Sun, Moon, Monitor } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, currentTheme, updateTheme } = useTheme();

  const themes = [
    { key: 'light' as const, icon: Sun, label: 'Light' },
    { key: 'dark' as const, icon: Moon, label: 'Dark' },
    { key: 'system' as const, icon: Monitor, label: 'System' },
  ];

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {themes.map(({ key, icon: Icon, label }) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.themeButton,
            currentTheme === key && styles.activeThemeButton,
          ]}
          onPress={() => updateTheme(key)}
        >
          <Icon 
            size={20} 
            color={currentTheme === key ? '#FFFFFF' : theme.text} 
          />
          <Text 
            style={[
              styles.themeButtonText,
              { color: currentTheme === key ? '#FFFFFF' : theme.text }
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 4,
    margin: 16,
  },
  themeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeThemeButton: {
    backgroundColor: theme.primary,
  },
  themeButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
});