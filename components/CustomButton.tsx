import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CustomButton = ({ 
  onPress, 
  title, 
  textStyles = "", 
  containerStyles = "",
  variant = 'primary',
  disabled = false
}: CustomButtonProps) => {
  const { colors, isDark } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const getButtonStyle = () => {
    if (disabled) {
      return {
        backgroundColor: colors.border,
      };
    }
    
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        };
      default:
        return {
          backgroundColor: colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return {
        color: colors.textSecondary,
      };
    }
    
    switch (variant) {
      case 'outline':
        return {
          color: colors.primary,
        };
      default:
        return {
          color: '#FFFFFF',
        };
    }
  };

  return (
    <AnimatedTouchableOpacity 
      activeOpacity={0.9}
      className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
      style={[animatedStyle, getButtonStyle()]}
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Text 
        className={`font-semibold text-lg ${textStyles}`}
        style={getTextStyle()}
      >
        {title}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

export default CustomButton;
