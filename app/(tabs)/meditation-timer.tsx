import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useTimer } from '@/hooks/useTimer';
import AppGradient from '@/components/AppGradient';
import TimerDisplay from '@/components/TimerDisplay';
import CustomButton from '@/components/CustomButton';
import { MEDITATION_DATA } from '@/constants/meditationData';

const MeditationTimer: React.FC = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const meditation = MEDITATION_DATA.find(item => item.id.toString() === id);
  const timer = useTimer(5); // Default 5 minutes

  useEffect(() => {
    if (timer.isCompleted) {
      handleMeditationComplete();
    }
  }, [timer.isCompleted]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Audio functionality will be re-added in a future update
    Alert.alert('Audio Feature', 'Audio playback will be available in the next update!');
  };

  const handleMeditationComplete = () => {
    setIsPlaying(false);
    
    Alert.alert(
      'Meditation Complete! 🧘‍♀️',
      'Congratulations on completing your meditation session.',
      [
        {
          text: 'Continue',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleTimerControl = () => {
    if (timer.isRunning) {
      timer.pause();
      setIsPlaying(false);
    } else {
      timer.start();
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    timer.reset();
    setIsPlaying(false);
  };

  const addMinutes = (minutes: number) => {
    timer.addTime(minutes);
  };

  if (!meditation) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text style={{ color: colors.text }}>Meditation not found</Text>
        <CustomButton
          title="Go Back"
          onPress={() => router.back()}
          containerStyles="mt-4"
        />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <AppGradient colors={isDark ? ["#111827", "#1F2937", "#374151"] : ["#F8FAFC", "#E2E8F0", "#CBD5E1"]}>
        <SafeAreaView className="flex-1 px-4">
          {/* Header */}
          <View className="flex-row items-center justify-between py-4">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </Pressable>
            
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              {meditation.title}
            </Text>
            
            <Pressable
              onPress={togglePlayback}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons 
                name={isPlaying ? "volume-high" : "volume-mute"} 
                size={24} 
                color={colors.text} 
              />
            </Pressable>
          </View>

          {/* Timer Display */}
          <View className="flex-1 items-center justify-center">
            <TimerDisplay
              minutes={timer.minutes}
              seconds={timer.seconds}
              progress={timer.progress}
              isRunning={timer.isRunning}
            />
          </View>

          {/* Time Controls */}
          <View className="mb-6">
            <Text className="text-center text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Add Time
            </Text>
            <View className="flex-row justify-center space-x-4">
              <Pressable
                onPress={() => addMinutes(1)}
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: colors.surface }}
              >
                <Text className="font-medium" style={{ color: colors.text }}>+1 min</Text>
              </Pressable>
              <Pressable
                onPress={() => addMinutes(5)}
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: colors.surface }}
              >
                <Text className="font-medium" style={{ color: colors.text }}>+5 min</Text>
              </Pressable>
              <Pressable
                onPress={() => addMinutes(10)}
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: colors.surface }}
              >
                <Text className="font-medium" style={{ color: colors.text }}>+10 min</Text>
              </Pressable>
            </View>
          </View>

          {/* Control Buttons */}
          <View className="flex-row justify-center space-x-4 mb-8">
            <CustomButton
              title={timer.isRunning ? "Pause" : "Start"}
              onPress={handleTimerControl}
              variant="primary"
              containerStyles="flex-1 mx-2"
            />
            <CustomButton
              title="Reset"
              onPress={handleReset}
              variant="outline"
              containerStyles="flex-1 mx-2"
            />
          </View>
        </SafeAreaView>
      </AppGradient>
    </View>
  );
};

export default MeditationTimer;
