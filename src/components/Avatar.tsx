import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming 
} from 'react-native-reanimated';
import { Bot, Zap, Ear, MessageCircle, Smile } from 'lucide-react-native';
import { AvatarEmotion } from '../types';
import { useTheme } from '../hooks/useTheme';

interface AvatarProps {
  emotion: AvatarEmotion;
  isListening?: boolean;
  isSpeaking?: boolean;
}

const { width } = Dimensions.get('window');

export const Avatar: React.FC<AvatarProps> = ({ 
  emotion, 
  isListening = false, 
  isSpeaking = false 
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    switch (emotion) {
      case 'happy':
        scale.value = withSpring(1.1);
        break;
      case 'thinking':
        rotation.value = withSequence(
          withTiming(-5, { duration: 500 }),
          withTiming(5, { duration: 500 }),
          withTiming(0, { duration: 500 })
        );
        break;
      case 'speaking':
        scale.value = withSequence(
          withTiming(1.05, { duration: 200 }),
          withTiming(1, { duration: 200 })
        );
        break;
      case 'listening':
        glowOpacity.value = withSequence(
          withTiming(0.8, { duration: 600 }),
          withTiming(0.3, { duration: 600 })
        );
        break;
      default:
        scale.value = withSpring(1);
        rotation.value = withSpring(0);
        glowOpacity.value = withSpring(0.3);
    }
  }, [emotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const getEmotionIcon = () => {
    switch (emotion) {
      case 'happy':
        return <Smile size={40} color={theme.primary} />;
      case 'thinking':
        return <Zap size={40} color={theme.accent} />;
      case 'speaking':
        return <MessageCircle size={40} color={theme.secondary} />;
      case 'listening':
        return <Ear size={40} color={theme.success} />;
      default:
        return <Bot size={40} color={theme.primary} />;
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowContainer, glowStyle]}>
        <View style={styles.glow} />
      </Animated.View>
      
      <Animated.View style={[styles.avatarContainer, animatedStyle]}>
        <View style={styles.avatar}>
          {getEmotionIcon()}
        </View>
        
        {(isListening || isSpeaking) && (
          <View style={styles.statusIndicator}>
            <Animated.View 
              style={[
                styles.pulse,
                { backgroundColor: isListening ? theme.success : theme.secondary }
              ]} 
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginVertical: 20,
  },
  glowContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  glow: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 50,
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});