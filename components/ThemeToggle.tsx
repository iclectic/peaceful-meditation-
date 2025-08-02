import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  useEffect as useReanimatedEffect
} from 'react-native-reanimated';
import { useTheme, Theme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, colors, isDark } = useTheme();
  const scale = useSharedValue(1);

  const handleThemeChange = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });

    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      case 'system':
        return 'phone-portrait-outline';
      default:
        return 'sunny-outline';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Light';
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handleThemeChange}
        className="flex-row items-center px-4 py-3 rounded-full"
        style={{ backgroundColor: colors.surface }}
      >
        <Ionicons 
          name={getThemeIcon() as any} 
          size={20} 
          color={colors.text} 
        />
        <Text 
          className="ml-2 font-medium"
          style={{ color: colors.text }}
        >
          {getThemeLabel()}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default ThemeToggle;
