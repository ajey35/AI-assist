import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { getTheme } from '../constants/themes';
import * as SecureStore from 'expo-secure-store';

const THEME_KEY = 'app_theme';

export const useTheme = () => {
  const { currentTheme, setTheme } = useChatStore();
  const theme = getTheme(currentTheme);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync(THEME_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setTheme(savedTheme as 'light' | 'dark' | 'system');
      }
    } catch (error) {
      console.error('Load theme error:', error);
    }
  };

  const updateTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    try {
      await SecureStore.setItemAsync(THEME_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Save theme error:', error);
      setTheme(newTheme); // Still update the theme even if saving fails
    }
  };

  return {
    theme,
    currentTheme,
    updateTheme,
  };
};