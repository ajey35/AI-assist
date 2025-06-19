import { ThemeColors } from '../types';

export const lightTheme: ThemeColors = {
  primary: '#3B82F6',
  primaryDark: '#1E40AF',
  secondary: '#14B8A6',
  accent: '#F97316',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  userMessage: '#3B82F6',
  aiMessage: '#F3F4F6',
};

export const darkTheme: ThemeColors = {
  primary: '#60A5FA',
  primaryDark: '#2563EB',
  secondary: '#20D9D2',
  accent: '#FB923C',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  userMessage: '#60A5FA',
  aiMessage: '#1E293B',
};

export const getTheme = (theme: 'light' | 'dark' | 'system'): ThemeColors => {
  if (theme === 'system') {
    // In a real app, you'd detect system theme
    return lightTheme;
  }
  return theme === 'dark' ? darkTheme : lightTheme;
};