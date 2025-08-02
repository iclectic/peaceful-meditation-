import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  interpolate,
  useSharedValue,
  useEffect as useReanimatedEffect
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  progress: number;
  isRunning: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  minutes, 
  seconds, 
  progress, 
  isRunning 
}) => {
  const { colors, isDark } = useTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useReanimatedEffect(() => {
    scale.value = withSpring(isRunning ? 1.05 : 1);
    rotation.value = withSpring(progress * 360);
  }, [isRunning, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <View className="items-center justify-center">
      {/* Outer Progress Ring */}
      <View className="relative w-64 h-64 items-center justify-center">
        {/* Background Circle */}
        <View 
          className="absolute w-64 h-64 rounded-full border-4"
          style={{ 
            borderColor: isDark ? colors.border : '#E5E7EB',
            backgroundColor: 'transparent'
          }}
        />
        
        {/* Progress Circle */}
        <Animated.View 
          className="absolute w-64 h-64 rounded-full border-4"
          style={[
            progressStyle,
            { 
              borderColor: colors.primary,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              backgroundColor: 'transparent'
            }
          ]}
        />

        {/* Inner Timer Display */}
        <Animated.View 
          className="w-48 h-48 rounded-full items-center justify-center"
          style={[
            animatedStyle,
            { backgroundColor: isDark ? colors.surface : colors.background }
          ]}
        >
          <LinearGradient
            colors={isDark ? ['#1F2937', '#374151'] : ['#F8FAFC', '#FFFFFF']}
            className="w-full h-full rounded-full items-center justify-center"
          >
            <Text 
              className="text-6xl font-bold mb-2"
              style={{ color: colors.text }}
            >
              {formatTime(minutes)}
            </Text>
            <Text 
              className="text-4xl font-light"
              style={{ color: colors.text }}
            >
              {formatTime(seconds)}
            </Text>
            <Text 
              className="text-sm font-medium mt-2"
              style={{ color: colors.textSecondary }}
            >
              {isRunning ? 'MEDITATING' : 'PAUSED'}
            </Text>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Progress Percentage */}
      <View className="mt-6 px-6 py-3 rounded-full" style={{ backgroundColor: colors.surface }}>
        <Text 
          className="text-lg font-semibold"
          style={{ color: colors.text }}
        >
          {Math.round(progress * 100)}% Complete
        </Text>
      </View>
    </View>
  );
};

export default TimerDisplay;
